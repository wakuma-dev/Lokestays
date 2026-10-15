import { Phone, Mail, MapPin, type LucideIcon } from "lucide-react"
interface ContactProps {
  icon: LucideIcon,
  label: string;
  href: string;
}
const contacts: ContactProps[] = [
  {
    icon: Phone,
    label: "+251911123456",
    href: "tel:+251911123456"
  },
  {
    icon: Mail,
    label: "info@lokestays.ca",
    href: "mailto:info@lokestays.ca"
  },
  {
    icon: MapPin,
    label: "Bole, Addis Ababa, Ethiopia",
    href: "https://www.google.com/maps/search/?api=1&query=Bole%2C+Addis+Ababa%2C+Ethiopia"
  }
]

export default function Contacts(){
  return(
    <section aria-labelledby="core-contacts"
             className="flex flex-col items-start gap-3">
             <h2 id="core-contacts" className="text-[15px] leading-[20px] tracking-normal
              md:tracking-tight font-medium text-[#222222]">
                Core Contacts
              </h2>
              <nav aria-label="Contact information">
             <ul className="space-y-1">
               {contacts.map(({icon:Icon, label, href}) => (
                <li key={label}>
                  <a href={href}
                     className="inline-flex items-center gap-2 text-[#222222]">
                      <Icon aria-hidden="true" focusable="false" size={16} />
                      <span className="underline-offset-4 transition-all duration-150 text-[15px] leading-[20px] hover:underline
                       focus-visible:offset-[#222222]
                       focus-visible:rounded-md
                       focus-visible:outline-offset-2
                       motion-reduce:transition-none">
                        {label}
                      </span>
                     </a>
                </li>
               ))}
             </ul>
             </nav>
      </section>
  )
}