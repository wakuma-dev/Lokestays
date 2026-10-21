import { Navbar } from "@/components/navigation";
import { Outlet, useLocation } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
export default function ProtectedLayout(){
    const location = useLocation();
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