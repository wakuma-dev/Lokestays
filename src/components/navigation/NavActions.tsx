import BecomeHostButton from "./BecomeHostButton";
import { ProfileAvatar } from "@/feature/profile";
import UserMenu from "./UserMenu";
import { useProfileQuery } from "@/feature/profile";
import { useAuthStore } from "@/feature/auth";
export default function NavActions(){
    const user = useAuthStore((state) => state.user);
    const {data: profile} = useProfileQuery(user?.uid ?? "");
    const fullName = profile?.fullName ?? user?.displayName ?? "";
    return(
        <div className="flex items-center justify-end gap-5 shrink-0">
             <BecomeHostButton />
             <ProfileAvatar fullName={fullName} userId={user?.uid} />
             <UserMenu />
        </div>
    )
}