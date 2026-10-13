import { Link } from "@tanstack/react-router";
export default function NotFound(){
  
    return(
    <main
     aria-labelledby="not-found-title"
     className="flex flex-col items-center justify-center gap-3 min-h-screen">
     <h1 id="not-found-title" 
     className="font-extrabold text-[140px] leading-[160px] text-[#484848]">OOPS!</h1>
     <h2 className="text-[#484848] text-[32px] leading-[35px] font-normal">We can't seem to find the page you're looking for.</h2>
     <p className="text-[#484848] text-[14px] leading-[15px] font-semibold">Error code: 404</p>
     <Link to="/"
       className="text-[#008489] cursor-pointer text-[14px] leading-[20px] font-normal">
        Home
     </Link>
     </main>
    )
}