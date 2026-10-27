// src/feature/auth/services/auth.service.ts
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

import type { AccountMode, UserProfile } from "../types/auth.types";
import { db } from "@/lib/firebase/firestore";

type UserNames = Pick<RegisterDataType, "fullName">;

const syncUserProfile = async (
  user: User,
  names?: UserNames,
  initialRole: AccountMode = "guest",
): Promise<void> => {
  if (!user.email) {
    throw new Error(
      "An email address is required to create a user profile.",
    );
  }

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  const existingProfile = snapshot.data();

  const existingFullName =
    typeof existingProfile?.fullName === "string"
      ? existingProfile.fullName.trim()
      : "";

  const requestedFullName = names?.fullName?.trim() ?? "";
  const providerFullName = user.displayName?.trim() ?? "";

  const fullName =
    existingFullName || requestedFullName || providerFullName;

  const existingRoles = Array.isArray(existingProfile?.roles)
    ? (existingProfile.roles as AccountMode[])
    : [];

  const roles =
    existingRoles.length > 0
      ? Array.from(new Set([...existingRoles, initialRole]))
      : [initialRole];

  const profile: UserProfile = {
    uid: user.uid,
    email: user.email,
    ...(fullName ? { fullName } : {}),
    roles,
  };

  await setDoc(userRef, profile, { merge: true });
};

export const signup = async (
  data: RegisterDataType,
): Promise<void> => {
  const { fullName, email, password, initialRole } = data;

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
    console.error("Failed to synchronize the user profile:", error);
    throw error;
  }

  try {
    await signOut(auth);
  } catch (error: unknown) {
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
  defaultRole: AccountMode = "guest",
): Promise<User> => {
  const userCredential = await signInWithPopup(auth, provider);

  await syncUserProfile(userCredential.user, undefined, defaultRole);

  return userCredential.user;
};

export const loginWithGoogle = async (): Promise<User> => {
  return loginWithProvider(googleProvider, "guest");
};

export const loginWithFacebook = async (): Promise<User> => {
  return loginWithProvider(facebookProvider, "guest");
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

  await syncUserProfile(result.user, undefined, "guest");

  return result.user;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};