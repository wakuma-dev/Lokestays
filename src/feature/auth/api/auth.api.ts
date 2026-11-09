import {
    doc,
    serverTimestamp,
    runTransaction,
} from "firebase/firestore";

import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    getRedirectResult,
    signInWithRedirect,
    type AuthProvider,
    type User,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import {
    auth,
    googleProvider,
    facebookProvider,
} from "@/lib/firebase/auth";

import type {
    LoginDataType,
    RegisterDataType,
} from "@/feature/auth";

import { userStatusSchema } from "../schema/userProfileSchema";

import type {
    AccountMode,
    UserProfile,
} from "../types/auth.types";

import { db } from "@/lib/firebase/firestore";

type UserNames = Pick<RegisterDataType, "fullName">;

const SELF_SERVICE_ROLES = ["guest", "host"] as const;

const isSelfServiceRole = (
    role: AccountMode,
): boolean => {
    return SELF_SERVICE_ROLES.some(
        (allowedRole) => allowedRole === role,
    );
};

const isAccountMode = (
    role: unknown,
): role is AccountMode => {
    return (
        role === "guest" ||
        role === "host"
    );
};

/**
 * Synchronizes Firebase Authentication user data
 * with the corresponding Firestore user profile.
 *
 * Transaction guarantees:
 * - Preserves existing fullName.
 * - Preserves existing roles.
 * - Prevents duplicate roles.
 * - Initializes createdAt only once.
 *
 * The transaction may retry automatically when concurrent
 * modifications occur.
 */
const syncUserProfile = async (
    user: User,
    names?: UserNames,
    initialRole: AccountMode = "guest",
): Promise<void> => {

    const email = user.email;

    if (!email) {
        throw new Error(
            "An email address is required to create a user profile.",
        );
    }

    if (!isSelfServiceRole(initialRole)) {
        throw new Error("Invalid account role.");
    }

    const userRef = doc(db, "users", user.uid);

    await runTransaction(db, async (transaction) => {

        const snapshot = await transaction.get(userRef);

        const existingProfile = snapshot.data();

        const parsedStatus = userStatusSchema.safeParse(
            existingProfile?.status ?? "active"
        );

        if (!parsedStatus.success) {
            throw new Error(
                `Invalid account status for user ${user.uid}`
            );
        }

        const existingFullName =
            typeof existingProfile?.fullName === "string"
                ? existingProfile.fullName.trim()
                : "";

        const requestedFullName =
            names?.fullName?.trim() ?? "";

        const providerFullName =
            user.displayName?.trim() ?? "";

        const fullName =
            existingFullName ||
            requestedFullName ||
            providerFullName;

        const existingRoles: AccountMode[] =
            Array.isArray(existingProfile?.roles)
                ? existingProfile.roles.filter(isAccountMode)
                : [];

        const roles = Array.from(
            new Set([
                ...existingRoles,
                initialRole,
            ]),
        );

        const profile: UserProfile = {
            uid: user.uid,
            email,
            ...(fullName ? { fullName } : {}),
            roles,
            status: parsedStatus.data,
            suspension: existingProfile?.suspension ?? null,
        };

        transaction.set(
            userRef,
            {
                ...profile,

                // Preserve the original registration timestamp.
                // Create it only for new profiles or legacy
                // profiles that don't have createdAt.
                ...(
                    existingProfile?.createdAt
                        ? {}
                        : {
                            createdAt: serverTimestamp(),
                        }
                ),
            },
            {
                merge: true,
            },
        );
    });
};

/**
 * Validates the account status after authentication.
 *
 * Suspended and deactivated accounts cannot access
 * the application.
 */
const validateAccountStatus = async (
    user: User,
): Promise<void> => {

    const userRef = doc(db, "users", user.uid);

    const { getDoc } = await import("firebase/firestore");

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        throw new Error(
            "User profile does not exist.",
        );
    }

    const parsedStatus = userStatusSchema.safeParse(
        snapshot.data().status
    );

    if (!parsedStatus.success) {
        throw new Error(
            "Invalid account status.",
        );
    }

    if (
        parsedStatus.data === "suspended" ||
        parsedStatus.data === "deactivated"
    ) {
        await signOut(auth);

        throw new Error(
            parsedStatus.data === "suspended"
                ? "Your account has been suspended."
                : "Your account has been deactivated.",
        );
    }
};

/**
 * Email/password registration.
 */
export const signup = async (
    data: RegisterDataType,
): Promise<void> => {

    const {
        fullName,
        email,
        password,
        initialRole,
    } = data;

    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
    );

    try {

        await syncUserProfile(
            userCredential.user,
            { fullName },
            initialRole,
        );

    } catch (error: unknown) {

        console.error(
            "Failed to synchronize the user profile:",
            error,
        );

        throw error;
    }

    try {

        await signOut(auth);

    } catch (error: unknown) {

        console.error(
            "Failed to sign out after registration:",
            error,
        );
    }
};

/**
 * Email/password login.
 */
export const login = async (
    data: LoginDataType,
): Promise<User> => {

    const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password,
    );

    try {

        // Synchronize the existing profile before validation.
        await syncUserProfile(
            userCredential.user,
        );

        await validateAccountStatus(
            userCredential.user,
        );

        return userCredential.user;

    } catch (error: unknown) {

        if (auth.currentUser) {
            await signOut(auth);
        }

        throw error;
    }
};

/**
 * Generic OAuth popup authentication.
 */
export const loginWithProvider = async (
    provider: AuthProvider,
    defaultRole: AccountMode = "guest",
): Promise<User> => {

    const userCredential = await signInWithPopup(
        auth,
        provider,
    );

    try {

        await syncUserProfile(
            userCredential.user,
            undefined,
            defaultRole,
        );

        await validateAccountStatus(
            userCredential.user,
        );

        return userCredential.user;

    } catch (error: unknown) {

        if (auth.currentUser) {
            await signOut(auth);
        }

        throw error;
    }
};

/**
 * Google popup login.
 */
export const loginWithGoogle = async (): Promise<User> => {
    return loginWithProvider(
        googleProvider,
        "guest",
    );
};

/**
 * Facebook popup login.
 */
export const loginWithFacebook = async (): Promise<User> => {
    return loginWithProvider(
        facebookProvider,
        "guest",
    );
};

/**
 * Google redirect login.
 */
export const loginWithGoogleRedirect = async (): Promise<void> => {
    await signInWithRedirect(
        auth,
        googleProvider,
    );
};

/**
 * Facebook redirect login.
 */
export const loginWithFacebookRedirect = async (): Promise<void> => {
    await signInWithRedirect(
        auth,
        facebookProvider,
    );
};

/**
 * Processes OAuth redirect authentication results.
 */
export const handleAuthRedirectResult = async (): Promise<User | null> => {

    const result = await getRedirectResult(auth);

    if (!result) {
        return null;
    }

    try {

        await syncUserProfile(
            result.user,
            undefined,
            "guest",
        );

        await validateAccountStatus(
            result.user,
        );

        return result.user;

    } catch (error: unknown) {

        if (auth.currentUser) {
            await signOut(auth);
        }

        throw error;
    }
};

/**
 * Signs out the current Firebase user.
 */
export const logout = async (): Promise<void> => {
    await signOut(auth);
};