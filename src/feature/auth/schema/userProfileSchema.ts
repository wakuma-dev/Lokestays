import { z } from "zod";
import { USER_STATUSES } from "../types/auth.types";
import { Timestamp } from "firebase/firestore";

export const accountModeSchema = z.enum(["guest", "host"]);
export const userStatusSchema = z.enum(USER_STATUSES);

export const userSuspensionSchema = z.object({
    reason: z.string().trim().min(1),
    suspendedAt: z.instanceof(Timestamp),
    suspendedBy: z.string().trim().min(1),
});

export const userProfileSchema = z.object({
    uid: z.string().min(1),
    fullName: z.string().min(1).optional(),
    email: z.string().email(),
    roles: z.array(accountModeSchema).min(1).refine(
        (roles) => new Set(roles).size === roles.length,
        {
            message: "Duplicate account roles are not allowed.",
        }
    ),
    status: userStatusSchema,
    suspension: userSuspensionSchema.nullable(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;