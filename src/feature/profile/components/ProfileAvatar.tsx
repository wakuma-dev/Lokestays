import { useCallback, useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getProfileAvatarBackgroundColor } from "./profileAvatarColor";
import { UserRound } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/feature/auth";
import { Button } from "@/components/ui/button";
const GUEST_AVATAR_BG = "#EBEBEB";
const GUEST_AVATAR_TEXT = "#000000";
const INITIALS_AVATAR_TEXT = "#FFFFFF";

interface ProfileAvatarProps {
  fullName: string;
  userId?: string;
}

interface AvatarVisualState {
  initials: string;
  hasInitials: boolean;
  backgroundColor: string;
  textColor: string;
}

/**
 * Extracts up to two uppercase initials from a trimmed name string.
 * Time: O(n) in length of `fullName` (bounded by token scan) | Space: O(k) where k <= 2.
 * Trade-off: Uses `charAt(0)` rather than `Array.from` / grapheme segmentation; avoids regex
 * overhead on short names, though surrogate-pair emoji/scripts would take the high surrogate.
 */
function extractInitials(trimmedName: string): string {
  if (!trimmedName) {
    return "";
  }
  return trimmedName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/**
 * Renders a circular profile avatar button that navigates to `/profile` when authenticated
 * or `/login` otherwise. Displays initials on a deterministic color when available, or a
 * `UserRound` icon on a `#EBEBEB` background with black (`#000000`) foreground when absent.
 */
export default function ProfileAvatar({
  fullName,
  userId,
}: ProfileAvatarProps) {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);

  // Guard navigation while auth state is resolving to prevent premature redirect to `/login`.
  const handleClick = useCallback(() => {
    if (authLoading) {
      return;
    }
    const targetRoute = authUser ? "/profile" : "/login";
    void navigate({ to: targetRoute });
  }, [authLoading, authUser, navigate]);

  // Memoize visual tokens so parent re-renders with unchanged identity props do not recompute.
  const visualState = useMemo<AvatarVisualState>(() => {
    const cleanName = fullName.trim();
    const cleanUserId = userId?.trim();
    const initials = extractInitials(cleanName);
    const hasInitials = initials.length > 0;

    if (!hasInitials) {
      return {
        initials: "",
        hasInitials: false,
        backgroundColor: GUEST_AVATAR_BG,
        textColor: GUEST_AVATAR_TEXT,
      };
    }

    const seed = cleanUserId || cleanName;
    return {
      initials,
      hasInitials: true,
      backgroundColor: getProfileAvatarBackgroundColor(seed),
      textColor: INITIALS_AVATAR_TEXT,
    };
  }, [fullName, userId]);

  const ariaLabel = fullName.trim()
    ? `Go to ${fullName.trim()}'s profile`
    : "Go to profile";

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleClick}
      disabled={authLoading}
      aria-busy={authLoading}
      aria-label={ariaLabel}
      className="group relative inline-flex size-10 shrink-0 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-70"
    >
      <Avatar className="size-8.5">
        <AvatarFallback
          style={{
            backgroundColor: visualState.backgroundColor,
            color: visualState.textColor,
          }}
          className="select-none text-[14px] leading-[18px] font-medium"
        >
          {visualState.hasInitials ? (
            visualState.initials
          ) : (
            <UserRound className="size-5" aria-hidden="true" />
          )}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}