import FooterBottom from "./FooterBottom"
import FooterAbout from "./FooterAbout"
import FooterLegal from "./FooterLegal"
import QuickLinks from "./QuickLinks";

export default function Footer(){
    return(
       <footer
       aria-label="Footer"
       className="bg-[#FBFBFB] w-full h-auto flex flex-col py-4">
        <div aria-hidden="true" className="w-full border-t-border-t-gray-200" />
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 
        lg:px-0 flex flex-col md:flex-row justify-between
          py-3 md:py-5 gap-6 md:gap-8 lg:gap-x-12">
            <FooterAbout/>
            <FooterLegal />
            <QuickLinks />
        </div>
        <div 
        aria-hidden="true"
        className="w-full border-t pb-3 border-t-gray-200" />
        <FooterBottom />
       </footer>  
    );
}