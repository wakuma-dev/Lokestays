import { z } from "zod";
const accountModeSchema = z.enum(["guest", "host"]);
export const userProfileSchema = z.object({
    uid: z.string().min(1),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.string().email(),
    roles: z.array(accountModeSchema).min(1).refine((roles) => new Set(roles).size === roles.length, {
        message: "Duplicate account roles are not allowed."
    })

});
export type UserProfile = z.infer<typeof userProfileSchema>;