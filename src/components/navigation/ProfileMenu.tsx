import { useNavigate } from "@tanstack/react-router";
import { CircleUserRound } from "lucide-react";
import Avatar from "react-avatar";

import { useAuthStore } from "@/feature/auth";
import { Button } from "../ui/button";

export default function ProfileMenu() {
  const authUser = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);

  const navigate = useNavigate();

  const handleClick = () => {
    if (authLoading) return;

    if (!authUser) {
      void navigate({ to: "/login" });
      return;
    }

    void navigate({ to: "/profile" });
  };

  const avatarIdentifier =
    authUser?.displayName?.trim() ||
    authUser?.email?.trim() ||
    "";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={authLoading}
      className="size-10 shrink-0 cursor-pointer rounded-full"
      aria-label="Personal information"
    >
      {authLoading ? (
        <span
          aria-hidden="true"
          className="size-9 animate-pulse rounded-full bg-muted"
        />
      ) : avatarIdentifier ? (
        <Avatar
          name={avatarIdentifier}
          size="36"
          round
          textSizeRatio={2.5}
          className="size-full object-cover"
        />
      ) : (
        <CircleUserRound
          aria-hidden="true"
          className="size-5"
        />
      )}
    </Button>
  );
}
