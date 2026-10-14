import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"
import { Button } from "../ui/button"
export default function ScrollToTopButton(){
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const handleScroll = ():void => {
            const scrollPosition = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const maxScroll = documentHeight - viewportHeight;
            const halfwayPoint = maxScroll / 2;
            setIsVisible(maxScroll > 0 && scrollPosition >= halfwayPoint)
        }
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, {
        passive: true
    });
    return () => {
        window.removeEventListener("scroll", handleScroll);
    }
    }, []);
    if(!isVisible) return null;
    const handleScrollToTop = (): void => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    }
    return(
    <Button 
     variant="secondary"
     onClick={handleScrollToTop}
     aria-label="Scroll to top"
     className="fixed right-4 md:right-6 md:px-4 md:py-3 bottom-4 z-20 cursor-pointer md:bottom-6 flex items-center justify-center gap-1.5 rounded-full">
      <ArrowUp aria-hidden="true" /> <span className="hidden md:block font-medium text-[15px] leading-[20px]">Back to top</span>
     </Button>
    );
}