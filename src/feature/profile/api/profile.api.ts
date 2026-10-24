import { updateDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { 
  userSchema, 
  updateUserSchema, 
  type UserProfile, 
  type UpdateUserProfile 
} from "@/feature/profile";

export const getUserProfile = async (uid: string): Promise<UserProfile> => {
  const normalizedUid = uid.trim();
  if (!normalizedUid) {
    throw new Error("User Id is required");
  }

  const userRef = doc(db, "users", normalizedUid);
  const snapshot = await getDoc(userRef);
  
  if (!snapshot.exists()) {
    throw new Error("User Profile not found");
  }

  const data: unknown = snapshot.data();
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid user profile data");
  }

  const profileResult = userSchema.safeParse({
    ...data,
    uid: normalizedUid,
    phoneNumber:
      "phoneNumber" in data && typeof data.phoneNumber === "string"
        ? data.phoneNumber
        : "",
  });

  if (!profileResult.success) {
    console.error(
      "Invalid user profile:",
      profileResult.error.flatten(),
    );

    throw new Error(
      "Your profile data is incomplete or invalid. Please contact support.",
    );
  }

  return profileResult.data;
};

export const updateUserProfile = async (uid: string, data: UpdateUserProfile): Promise<void> => {
  const normalizedUid = uid.trim();
  if (!normalizedUid) {
    throw new Error("User Id is required");
  }

  const validatedData = updateUserSchema.parse(data);
  const userRef = doc(db, "users", normalizedUid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    throw new Error("User Profile not found");
  }

  await updateDoc(userRef, {
    ...validatedData,
   updatedAt: serverTimestamp()
  });
};