import { setDoc, getDoc, doc } from "firebase/firestore"
import { auth } from "@/lib/firebase/auth";
import { createUserWithEmailAndPassword, type User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import type { LoginDataType, RegisterDataType } from "@/feature/auth";
import { db } from "@/lib/firebase/firestore";
const syncUserProfile = async (user: User, names?: Pick<RegisterDataType, "firstName" | "lastName">) => {
  if(!user.email){
    throw new Error("An email address is required to create a user profile");
  }
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  const existingProfile = snapshot.data();
  const displayNameParts = user.displayName?.trim().split(/\s+/) ?? [];
   const existingFirstName =
        typeof existingProfile?.firstName === "string"
            ? existingProfile.firstName.trim()
            : "";
    const existingLastName =
        typeof existingProfile?.lastName === "string"
            ? existingProfile.lastName.trim()
            : "";
    
    await setDoc(
        userRef,
        {
            uid: user.uid,
            firstName:
                existingFirstName || names?.firstName || displayNameParts[0] || "New",
            lastName:
                existingLastName ||
                names?.lastName ||
                displayNameParts.slice(1).join(" ") ||
                "User",
            email: user.email,
        },
        { merge: true },
    );
}
export const signup = async (data: RegisterDataType) => {
    const { firstName, lastName, email, password } = data;
    const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    try {
        await syncUserProfile(userCredential.user, {firstName, lastName})
    }catch(error: unknown){
        console.error("Failed to synchronize the user profile:", error);
        throw error
    }
    await signOut(auth);
}
export const login = async (data: LoginDataType) => {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    return userCredential.user;
}