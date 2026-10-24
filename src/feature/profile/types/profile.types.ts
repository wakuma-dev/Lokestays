import { z } from "zod";
import { userSchema, updateUserSchema } from "../schema/profileSchema";
export type UserProfile = z.infer<typeof userSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserSchema>;