import { setDoc, getDoc, doc } from "firebase/firestore";
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

import { db } from "@/lib/firebase/firestore";

type UserNames = Pick<RegisterDataType, "firstName" | "lastName">;

type UserProfile = {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

const extractUserNames = (
  displayName: string | null,
): Partial<UserNames> => {
  const normalizedName = displayName?.trim();

  if (!normalizedName) {
    return {};
  }

  const nameParts = normalizedName.split(/\s+/);

  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(" "),
  };
};

const syncUserProfile = async (
  user: User,
  names?: UserNames,
): Promise<void> => {
  if (!user.email) {
    throw new Error(
      "An email address is required to create a user profile.",
    );
  }

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  const existingProfile = snapshot.data();

  const providerNames = extractUserNames(user.displayName);

  const existingFirstName =
    typeof existingProfile?.firstName === "string"
      ? existingProfile.firstName.trim()
      : "";

  const existingLastName =
    typeof existingProfile?.lastName === "string"
      ? existingProfile.lastName.trim()
      : "";

  const requestedFirstName = names?.firstName?.trim() ?? "";
  const requestedLastName = names?.lastName?.trim() ?? "";

  const providerFirstName = providerNames.firstName ?? "";
  const providerLastName = providerNames.lastName ?? "";

  const firstName =
    existingFirstName || requestedFirstName || providerFirstName;

  const lastName =
    existingLastName || requestedLastName || providerLastName;

  const profile: UserProfile = {
    uid: user.uid,
    email: user.email,
    ...(firstName ? { firstName } : {}),
    ...(lastName ? { lastName } : {}),
  };

  await setDoc(userRef, profile, { merge: true });
};

export const signup = async (
  data: RegisterDataType,
): Promise<void> => {
  const { firstName, lastName, email, password } = data;

  // Firebase authentication errors propagate to the registration UI.
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );

  try {
    await syncUserProfile(userCredential.user, {
      firstName,
      lastName,
    });
  } catch (error: unknown) {
    console.error("Failed to synchronize the user profile:", error);

    // Do not hide the original Firestore error.
    throw error;
  }

  try {
    await signOut(auth);
  } catch (error: unknown) {
    // Account creation and profile synchronization already succeeded.
    // Do not report registration as failed just because sign-out failed.
    console.error("Failed to sign out after registration:", error);
  }
};

export const login = async (
  data: LoginDataType,
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email.trim(),
    data.password,
  );

  return userCredential.user;
};

export const loginWithProvider = async (
  provider: AuthProvider,
): Promise<User> => {
  const userCredential = await signInWithPopup(auth, provider);

  await syncUserProfile(userCredential.user);

  return userCredential.user;
};

export const loginWithGoogle = async (): Promise<User> => {
  return loginWithProvider(googleProvider);
};

export const loginWithFacebook = async (): Promise<User> => {
  return loginWithProvider(facebookProvider);
};

export const loginWithGoogleRedirect = async (): Promise<void> => {
  await signInWithRedirect(auth, googleProvider);
};

export const loginWithFacebookRedirect = async (): Promise<void> => {
  await signInWithRedirect(auth, facebookProvider);
};

export const handleAuthRedirectResult = async (): Promise<User | null> => {
  const result = await getRedirectResult(auth);

  if (!result) {
    return null;
  }

  await syncUserProfile(result.user);

  return result.user;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};