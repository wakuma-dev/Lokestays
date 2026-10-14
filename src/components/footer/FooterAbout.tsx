import { Link } from "@tanstack/react-router"
export default function FooterAbout(){
    return(
    <div className="w-full flex flex-col items-start gap-2">
        <Link to="/" 
              className="text-[#222222] font-medium text-[15px] leading-[22px] md:text-[30px]
               md:leading-[36px] tracking-normal md:tracking-tight md:tracking-tighter">
                Lokestays
        </Link>
        <p className="font-normal text-[#222222] text-[15px] leading-[22px] tracking-normal md:tracking-tight">
            Lokestays is an Ethiopian accommodation platform that connects travelers with property hosts, making it easier to discover and book places to stay. Our mission is to make finding accommodation simpler, more transparent, and more convenient while helping property owners reach more guests.</p>
    </div>
    )
}