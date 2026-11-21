import { z } from "zod";
import { profileSchema, updateProfileSchema } from "../schema/profileSchema";
export type Profile = z.infer<typeof profileSchema>;
export type ProfileUpdate = z.infer<typeof updateProfileSchema>;