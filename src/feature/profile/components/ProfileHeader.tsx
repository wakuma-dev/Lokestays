import {
  BadgeCheck,
  Mail,
  Pencil,
  UserRound,
} from "lucide-react";
import { useAuthStore } from "@/feature/auth";
import { Button } from "@/components/ui/button";

type ProfileHeaderProps = {
  onEditProfile: () => void;
};

export default function ProfileHeader({
  onEditProfile,
}: ProfileHeaderProps) {
  const user = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);

  if (authLoading) {
    return (
      <section
        aria-labelledby="profile-header-loading"
        aria-busy="true"
        className="rounded-2xl border border-border bg-card p-5 sm:p-7"
      >
        <h2 id="profile-header-loading" className="sr-only">
          Loading profile
        </h2>

        <div className="flex animate-pulse items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted">
            <UserRound
              aria-hidden="true"
              className="size-7 text-muted-foreground"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-5 w-40 rounded bg-muted" />
            <div className="h-4 w-52 max-w-full rounded bg-muted" />
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section
        aria-labelledby="profile-header-unavailable"
        className="rounded-2xl border border-border bg-card p-5 sm:p-7"
      >
        <h2
          id="profile-header-unavailable"
          className="text-lg font-semibold"
        >
          Profile unavailable
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to view your profile information.
        </p>
      </section>
    );
  }

  const email = user.email?.trim() || "No email provided";

  const firstName = user.email
    ?.split("@")[0]
    ?.split(/[._-]/)[0]
    ?.trim();

  const displayName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1)
    : "User";

  return (
    <section
      aria-labelledby="profile-header-title"
      className="rounded-2xl border border-border bg-card p-5 sm:p-7"
    >
      <div className="flex max-w-[300px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex  items-center gap-4">
          <div
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted"
          >
            <UserRound className="size-7 text-muted-foreground" />
          </div>

          <div className="min-w-0 space-y-2">
            <h1
              id="profile-header-title"
              className="break-words text-xl font-semibold tracking-tight sm:text-2xl"
            >
              {displayName}
            </h1>

            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <Mail
                aria-hidden="true"
                className="size-4 shrink-0"
              />

              <span className="break-all">{email}</span>
            </div>

            {user.emailVerified && (
              <p className="flex items-center gap-1.5 text-sm text-emerald-700">
                <BadgeCheck
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />
                <span>Email verified</span>
              </p>
            )}
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onEditProfile}
          className="w-full shrink-0 sm:w-auto"
          aria-label="Edit your profile information"
        >
          <Pencil aria-hidden="true" className="mr-2 size-4" />
          Edit profile
        </Button>
      </div>
    </section>
  );
}