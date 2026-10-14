import { Link } from "@tanstack/react-router"
interface LegalLink {
    readonly path: "/privacy" | "/terms" | "/cookie";
    readonly label: string;
}
const LEGAL_LINKS = [
    {
     path: "/privacy",
     label: "Privacy"
    },
    {
    path: "/terms",
    label: "Terms"
    },
    {
    path: "/cookie",
    label: "Cookie"
    }
] satisfies readonly LegalLink[];
export default function FooterLegal(){
    return(
        <section 
          aria-labelledby="footer-legal-heading"
          className="flex flex-col items-start gap-2">
        <h2 id="footer-legal-heading"
            className="font-medium text-[#222222] text-[15px] leading-[20px] tracking-normal md:tracking-tight">
                Legal
            </h2>
         <nav aria-label="Legal information">
            <ul className="space-y-1">
              {LEGAL_LINKS.map(({path, label}) => (
                <li key={path}>
                    <Link to={path}
                          target="_blank"
                          className="
                          font-normal text-[15px] leading-[20px] tracking-normal text-[#222222]
                          transition-all duration-150 underline-offset-4
                          hover:underline focus-visible:outline-2
                           focus-visible:outline-offset-2 
                           focus-visible:outline-[#222222]
                           focus-visible:rounded-md
                           motion-reduce:transition-none">
                          {label}
                          </Link>
                 </li>
              ))}
            </ul>
         </nav>
        </section>
    )
}