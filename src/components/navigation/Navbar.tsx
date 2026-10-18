import { SearchBar } from "../../feature/search";
import Logo from "./Logo";
import NavActions from "./NavActions";
export default function Navbar(){
    return(
        <header 
         className="fixed inset-x-0 z-50 backdrop-blur-xl bg-[#fbfbfb]
          w-full flex flex-col gap-4 md:pt-5">
         <nav 
         aria-label="Main navigation"
         className="hidden md:flex items-center justify-between w-full 
         max-w-[1400px] mx-auto px-4 md:px-6 lg:px-0">
            <Logo />
            <NavActions />
         </nav>
         <SearchBar />
         <div 
         aria-hidden="true"
         className="hidden md:block w-full border-t border-t-gray-200" />
         </header>
    );
}