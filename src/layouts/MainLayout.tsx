import { Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/footer";
export default function MainLayout(){
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