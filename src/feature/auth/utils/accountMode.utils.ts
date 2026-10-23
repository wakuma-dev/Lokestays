import type { AccountMode, UserProfile } from "../types/auth.types";
export function canAccessMode(
  profile: UserProfile,
  mode: AccountMode,
): boolean {
  return profile.roles.includes(mode);
}