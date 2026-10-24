import { House, Search, CircleUser, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { TabBarItem } from "./TabBar.types";

const tabItems: readonly TabBarItem[] = [
  {
    icon: House,
    label: "Home",
    path: "/",
  },
  {
    icon: Search,
    label: "Explore",
    path: "/explore",
  },
  {
    icon: Heart,
    label: "Wishlists",
    path: "/wishlist",
  },
  {
    icon: CircleUser,
    label: "Profile",
    path: "/profile",
  },
];

export default function TabBar() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200
                 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md
                 md:hidden"
    >
      <ul className="mx-auto flex w-full max-w-screen-sm items-stretch">
        {tabItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.path} className="flex min-w-0 flex-1">
              <Link
                to={item.path}
                activeOptions={{ exact: item.path === "/" }}
                activeProps={{
                  className: "text-[#0f766e]",
                  "aria-current": "page",
                }}
                inactiveProps={{
                  className: "text-[#222222]",
                }}
                className="flex min-h-16 w-full flex-col items-center
                           justify-center gap-1 px-1 py-2
                           transition-colors duration-200
                           focus-visible:z-10 focus-visible:outline-2
                           focus-visible:outline-offset-[-3px]
                           focus-visible:outline-[#145A6B]"
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span className="truncate text-xs font-medium leading-4">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
