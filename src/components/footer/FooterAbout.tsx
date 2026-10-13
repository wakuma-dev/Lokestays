import { Link } from "@tanstack/react-router"
export default function FooterAbout(){
    return(
    <div className="w-full lg:w-1/3 flex flex-col items-start gap-2">
        <Link to="/" 
              className="text-[#222222] font-medium text-base leading-6">
                Lokestays
        </Link>
        <p className="font-normal text-[#222222] text-sm leading-5">Lokestays is an Ethiopian accommodation platform that connects travelers with property hosts, making it easier to discover and book places to stay. Our mission is to make finding accommodation simpler, more transparent, and more convenient while helping property owners reach more guests.</p>
    </div>
    )
}