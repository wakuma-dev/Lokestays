import { DesktopSearchBar, MobileSearchBar} from "@/feature/search";
import { useSearchSubmit } from "@/feature/search/hooks/useSearchSubmit";
import Logo from "./Logo";
import NavActions from "./NavActions";
export default function Navbar(){
    const { handleSubmit } = useSearchSubmit();
    return(
        <header 
         className="fixed inset-x-0 z-50 backdrop-blur-xl bg-white md:bg-[#fbfbfb]
          w-full flex flex-col gap-4 md:pt-5">
         <nav 
         aria-label="Main navigation"
         className="hidden md:flex items-center justify-between w-full 
         max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
            <Logo />
            <NavActions />
         </nav>
         <DesktopSearchBar onSearch={handleSubmit}/>
         <MobileSearchBar onSearch={handleSubmit}/>
        <div 
         aria-hidden="true"
         className="hidden md:block w-full border-t border-t-gray-200" />
         </header>
    );
}