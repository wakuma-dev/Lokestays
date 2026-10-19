import ProfileMenu from "./ProfileMenu"
export default function LegalNavbar(){
    return(
        <header 
             className="fixed inset-x-0 z-50 
             backdrop-blur-xl flex flex-col pt-4 md:pt-8 w-full gap-4
               bg-white text-[#222222]">
        <nav aria-label="Legal navigation"
              className="w-full max-w-[1400px] flex items-start px-4 md:px-6
               lg:px-0 justify-between mx-auto">
            <span className="font-semibold text-[17px]
             leading-[24px] capitalize text-[#222222]">Help Center</span>
             <ProfileMenu />
        </nav>
        <div aria-hidden="true"
             className="w-full border-b border-b-gray-200"
             />
        </header>
    )
}