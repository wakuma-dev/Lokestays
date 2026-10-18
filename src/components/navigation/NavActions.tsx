import BecomeHostButton from "./BecomeHostButton"
import ProfileMenu from "./ProfileMenu"
import UserMenu from "./UserMenu"
export default function NavActions(){
    return(
        <div className="flex items-center justify-end gap-5 shrink-0">
             <BecomeHostButton />
             <ProfileMenu />
             <UserMenu />
        </div>
    )
}