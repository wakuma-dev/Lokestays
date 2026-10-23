import FooterBottom from "./FooterBottom"
import FooterAbout from "./FooterAbout"
import FooterLegal from "./FooterLegal"
import Contacts from "./Contacts";

export default function Footer(){
    return(
       <footer
       aria-label="Footer"
       className="bg-[#FBFBFB] w-full h-auto flex flex-col  pb-24 md:pb-0 py-6">
        <div aria-hidden="true" className="w-full border-t-border-t-gray-200" />
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 
        lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 justify-end-safe
          py-3 md:py-5 gap-6 md:gap-8 lg:gap-x-12">
            <FooterAbout/>
            <FooterLegal />
            <Contacts />
        </div>
        <div 
        aria-hidden="true"
        className="w-full border-t pb-3 border-t-gray-200" />
        <FooterBottom />
       </footer>  
    );
}