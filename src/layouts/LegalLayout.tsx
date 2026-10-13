import { Outlet } from "@tanstack/react-router"
import { LegalNavbar } from "@/components/navigation"
import { Footer } from "@/components/footer"
export default function LegalLayout(){
    return(
     <>
     <LegalNavbar />
     <Outlet />
     <Footer />
     </>
    )
}