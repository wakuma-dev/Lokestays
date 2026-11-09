import type { Timestamp } from "firebase/firestore";
export const ACCOUNT_MODES = ["guest", "host"] as const;
export type AccountMode = (typeof ACCOUNT_MODES)[number];
export const USER_STATUSES = [
  "pending",
  "active",
  "suspended",
  "deactivated"
] as const;
export type UserStatus = (typeof USER_STATUSES)[number];
export interface UserSuspension {
    reason: string;
    suspendedAt: Timestamp;
    suspendedBy: string;

}
export interface UserProfile {
    uid: string;
    fullName?: string;
    email: string;
    roles: AccountMode[];
    status: UserStatus;
    suspension: UserSuspension | null

}

export interface AuthUser extends UserProfile {
    activeMode: AccountMode;
}