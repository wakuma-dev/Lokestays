import { Navbar } from "@/components/navigation";
import { Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
export default function ProtectedLayout(){
   
    return(
        <>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />
        </>
    )
}