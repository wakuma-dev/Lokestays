export const ACCOUNT_MODES = ["guest", "host"] as const;
export type AccountMode = (typeof ACCOUNT_MODES)[number];

export interface UserProfile {
    uid: string;
    fullName?: string;
    email: string;
    roles: AccountMode[]
}

export interface AuthUser extends UserProfile {
    activeMode: AccountMode;
}