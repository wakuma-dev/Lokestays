import { Link } from "@tanstack/react-router";
import Logo1 from "../../assets/logo1.png"
export default function Logo(){
    return(
        <Link to="/"
          aria-label="Lokestays home"
          className="inline-flex shrink-0 items-start -ml-3">
        <picture>
            <img 
              src={Logo1}
              alt="lokestays logo"
              className="w-[160px] h-auto hidden md:block" 
              />
            
        </picture>
        </Link>
    )
}