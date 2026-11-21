import { ProfileCard, BecomeHost, ProfileSkeleton, PROFILE_INFORMATION_SECTION_ID, ProfileInformation, useProfileQuery } from "@/feature/profile";
import { Button } from "@/components/ui/button";
import { AlertCircle,RefreshCw } from "lucide-react";
import { useAuthStore } from "@/feature/auth";
import { Helmet } from "react-helmet-async";
export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const { data: profile, 
            isPending, 
            isError,
            error, 
            refetch, 
            isFetching } = useProfileQuery(user?.uid ?? "");
    if(isPending){
      return <ProfileSkeleton />
    }
  return (
    <main className="w-full px-4 py-8 md:pt-36 max-w-4xl mx-auto h-auto min-h-screen bg-white">
     <Helmet>
    <title>My Profile | Lokestays</title>
     <meta
    name="description"
    content="Manage your Lokestays guest profile, update your personal information, and manage your account settings."
    />
   </Helmet>
      {isError ? (
           <section className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
            <AlertCircle className="size-10 text-destructive" />

            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-[18px] leading-[24px] font-medium">
                Unable to load property
              </h2>

              <p className="text-[14px] leading-[20px] text-muted-foreground">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong while loading this property."}
              </p>
            </div>

            <Button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Try Again
            </Button>
          </section>
      ) : (
      <div className="flex flex-col gap-4">
        <ProfileCard
          fullName={profile?.fullName ?? user?.displayName ?? "User"}
          userId={user?.uid ?? profile?.uid ?? ""}
        />
        <BecomeHost />
        <section id={PROFILE_INFORMATION_SECTION_ID} className="lg:py-2">
        <ProfileInformation
          uid={user?.uid ?? ""}
          fullName={profile?.fullName ?? user?.displayName ?? "User"}
          email={profile?.email ?? user?.email ?? ""}
          phoneNumber=""
          />
          </section>
      </div>
      )}
    </main>
  );
}