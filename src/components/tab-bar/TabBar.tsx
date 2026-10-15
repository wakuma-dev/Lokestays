import { House, Search, CircleUser, Heart } from "lucide-react";
import type { TabBarItem } from "./TabBar.types";
import { Link } from "@tanstack/react-router"
const tabItems: readonly TabBarItem[] = [
    {
        icon: House,
        label: "Home",
        path: "/"
    },
    {
        icon: Search,
        label: "Explore",
        path: "/explore"
    },
    {
        icon: Heart,
        label: "Favorites",
        path: "/favorites"
    },
    {
        icon: CircleUser,
        label: "Profile",
        path: "/profile"
    }
]
export default function TabBar(){
  return(
        <nav aria-label="Main navigation" 
             className="fixed w-full inset-x-0 bottom-0 border-t
                   border-gray-200 z-50 bg-white backdrop-blur-md">
        <ul className="md:hidden flex items-stretch justify-around p-4">
                {tabItems.map((item) => {
                    const Icon = item.icon;
                    return(
                    <li key={item.path} className="flex-1">
                    <Link to={item.path}
                        activeOptions={{exact: item.path === "/"}}
                        activeProps={{className: "text-[#145A6B]"}}
                        inactiveProps={{className: "text-[#222222]"}}
                        className="flex flex-col items-center justify-center gap-1">
                        <Icon size={22} strokeWidth={1.8} aria-hidden="true" focusable="false" />
                        <span className="text-[12px] leading-[16px]">
                            {item.label}
                        </span>
                    </Link>
                    </li>
                    )
                })}
            </ul>
         
        </nav>
    )
}