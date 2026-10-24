import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { Link, useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "@/feature/auth"
import { logout } from "@/feature/auth"
export default function UserMenu(){
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const handleLogout = async () => {
try {
    await logout();
   await navigate({to: "/"})
    }
catch(error: unknown){
    console.error("Failed to log out:", error);
}}
  return(
    <Popover>
      <PopoverTrigger
  render={
    <Button
      variant="ghost"
      size="icon"
      type="button"
      className="flex size-10 shrink-0
       cursor-pointer items-center justify-center rounded-full"
      aria-label="Open user menu"
    >
      <Menu aria-hidden="true" className="size-5" />
    </Button>
  }
/>
      <PopoverContent align="end" sideOffset={8} className="w-54">
        <div className="flex flex-col -space-y-0.5">
         <Link to="/wishlist" className="text-[15px] font-normal transition-colors duration-150 
         p-1.5 rounded-md hover:bg-[#ebebeb]  text-[#222222] font-normal">
         Wishlist
         </Link>
         <div className="flex flex-col items-start w-full -space-y-0.5 p-1.5 transition-colors duration-150
         hover:bg-[#ebebeb] text-[#222222] rounded-md">
        <a href="https://wakuma-dev.github.io/Lokestays-host-dashboard"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="Become a host on Lokestays"
       className="text-[15px] leading-[20px] font-normal tracking-normal cursor-pointer">
        Become a host
        </a>
        <span className="text-[12px] text-[#6c6c6c] leading-[16px] tracking-normal">it's easy to starting hosting and earn extra income</span>
         </div>
         <div className="w-full border-t my-1.5 border-t-[#222222]" />
         {authUser ? (
          <button type="button"
                   onClick={handleLogout}
                   className="text-[15px] cursor-pointer text-left rounded-md font-normal 
                   transition-colors p-1.5 outline-none duration-150 hover:bg-[#ebebeb] 
                   text-[#222222]">
          Log out
          </button>
         ) : (
         <Link to="/login" className="text-[15px] font-normal
          transition-colors p-1.5 duration-150  rounded-md
          hover:bg-[#ebebeb]  text-[#222222]">
         Log in or sign up</Link>
          )}
         </div>
      </PopoverContent>
    </Popover>
  )
}