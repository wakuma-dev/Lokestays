import { useState, memo, useMemo, useEffect} from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "@tanstack/react-router"
import ScrollToTopButton from "@/components/common/ScrollToTopButton"
interface CookieSection {
    id: string;
    title: string;
    content: string[];
}

const LAST_UPDATED = "October 13 2026";
const LAST_UPDATED_ISO = "2026-10-13"

const COOKIE_SECTIONS: CookieSection[] = [
    {
        id: "introduction",
        title: "1. Introduction",
        content: [ "This Cookie Policy explains how Lokestays uses cookies and similar technologies when you visit or use our website.", "These technologies may support essential website functionality, account authentication, security, user preferences, and other features that are actually implemented on our platform.", "This policy should be read alongside our Privacy Policy, which explains how personal information is handled.", ]
    },
    {
        id: "what-are-cookies",
        title: "2. What Are Cookies",
        content: [ "Cookies are small pieces of information that websites can store in your browser or on your device. They may help a website remember information between requests or visits.", "Some cookies are temporary and expire when your browsing session ends. Others remain on your device for a defined period or until you delete them.", "Similar technologies, including browser storage and certain scripts, can also store information or support website functionality without using traditional cookies.", ]
    },
    {
        id: "how-we-use-cookies",
        title: "3. How Lokestays Uses Cookies",
        content: [ "Depending on the features enabled on Lokestays, cookies and similar technologies may be used to support account access, maintain application functionality, protect the platform, and remember user preferences.", "We aim to use these technologies only for purposes consistent with our services and applicable legal requirements.", "The technologies used on the platform may change as features are introduced, updated, or removed.", ]
    },
    {
        id: "essential-cookies",
        title: "4. Essential Website Functionality",
        content: [ "Some technologies may be necessary for core website functions, including secure navigation, account access, session management, and protection against unauthorized activity.", "Where a technology is strictly necessary to provide a service requested by the user, it may be treated differently from optional technologies under applicable cookie and privacy laws.", "Disabling certain essential technologies may prevent parts of Lokestays from working correctly.", ]
    },
    {
        id: "authentication-security",
        title: "5. Authentication and Security",
        content: [ "Lokestays uses Firebase services for certain application functions. Depending on the authentication method and configuration, these services may use cookies, browser storage, or other mechanisms to maintain authentication state and support security.", "The specific storage mechanisms and their lifetimes depend on the services and configuration actually used by the application.", "Users should keep their account credentials confidential and avoid using shared devices for sensitive account activities unless they can securely end their sessions.", ]
    },
    {
        id: "browser-storage",
        title: "6. Local Storage and  Session Storage",
        content: [ "Web applications may use browser storage mechanisms, including local storage and session storage, to retain information on a user's device.", "Depending on the implementation, Lokestays may use browser storage for application preferences, interface state, or other functionality.", "Browser storage is different from traditional cookies. Its behavior, lifetime, and access rules depend on the storage mechanism and the application's implementation.", "Clearing browser storage may remove saved preferences or affect certain application features.", ]
    },
    {
        id: "third-party-services",
        title: "7. Third-Party Services",
        content: [ "Lokestays relies on third-party services for certain application functions, which may include authentication, hosting, data storage, or other services enabled on the platform.", "Depending on the configuration, these providers may use cookies or similar technologies to deliver their services, maintain security, or support functionality.", "Third-party technologies are subject to the relevant providers' documentation and applicable privacy practices. We will update this policy when material changes to our use of these technologies require an update.", ]
    },
    {
        id: "preferences-and-consent",
        title: "8. Cookie Preferences and Consent",
        content: [ "Where applicable law requires consent before certain cookies or similar technologies are used, Lokestays should obtain that consent before activating the relevant technologies.", "Where a preference-management feature is available, users can use it to review or change their choices for applicable optional technologies.", "The availability of a preference control depends on the features implemented on the website. This policy does not imply that a cookie consent banner or preference-management tool is currently available.", "Where required by law, users should be able to withdraw consent as easily as they provided it, without affecting processing that occurred lawfully before withdrawal.", ]
    },
    {
        id: "manages-cookies",
        title: "9. Managing Cookies in Your Browser",
        content: [ "Most modern browsers provide settings that allow users to view, block, or delete cookies and manage certain site data.", "The available controls vary by browser and device. Consult your browser's official help documentation for instructions.", "Blocking or deleting cookies and other site data may sign you out, remove saved preferences, or affect functionality that depends on that data.", "Browser controls may not manage every type of browser storage or every technology used by a website.", ]
    },
    {
        id: "retention",
        title: "10. Storage Duration and Retention",
        content: [ "The duration of cookies and similar technologies depends on their purpose, configuration, and the service that creates them.", "Session-based technologies may be removed when a browsing session ends, while persistent cookies or other stored information may remain for a defined period.", "We aim to avoid retaining information through these technologies for longer than reasonably necessary for their intended purpose, subject to applicable legal and security requirements.", ]
    },
    {
        id: "policy-changes",
        title: "11. Changes to This Cookie Policy",
        content: [ "We may update this Cookie Policy to reflect changes in our website, technology, service providers, legal obligations, or data practices.", "When we make changes, we will update the revision date displayed on this page. Where required by law, we will provide additional notice or obtain consent before implementing relevant changes.", "We encourage users to review this page periodically to understand how cookies and similar technologies are used on Lokestays.", ],
    },
    {
        id: "contact",
        title: "12. Contact Us",
        content: [ "If you have questions about this Cookie Policy or how Lokestays uses cookies and similar technologies, please contact the Lokestays team through our official support channel.", "Before publishing this page, provide a genuine contact email address or another reliable contact method that you actively monitor.", ]
    }
] as const;
const Breadcrumb = memo(() => (
    <nav aria-label="Bread crumb" className="mt-4">
        <ul className="flex items-center gap-2">
            <li>
            <Link to="/"
                  className="font-normal 
                  text-[12px] transition-all duration-150 
                  underline-offset-4 hover:underline 
                  focus-visible:outline-offset-2 
                  focus-visible:rounded-md
                  focus-visible:offset-[#222222]
                  motion-reduce:transition-none
                 text-[#222222] leading-[16px] capitalize">
                    Home
                  </Link>
             </li>
             <li aria-hidden="true" className="text-[#222222]">
              /
             </li>
             <li aria-current="page" 
                 className="font-normal text-[12px]
                 hover:underline
                 underline-offset-4
                 cursor-pointer
                 focus-visible:outline-offset-2
                 focus-visible:offset-[#222222]
                 focus-visible:rounded-md
                 motion-reduce:transition-none
                 text-[#222222] leading-[16px] capitalize">
                    Cookie Policy
                 </li>
        </ul>
    </nav>
));
Breadcrumb.displayName = "Breadcrumb";
interface TableOfContentsProps {
   sections: readonly CookieSection[];
   activeId: string;
}
const TableOfContents = memo(({sections, activeId}: TableOfContentsProps) => (
<aside 
 role="complementary"
 aria-label="Cookie table of contents"
 className="hidden lg:block border border-gray-200 rounded-xl h-fit p-5 lg:sticky lg:top-24">
    <h2 className="text-[#6c6c6c] font-semibold tracking-wide text-[16px] leading-[24px] uppercase mb-3">
        on this page
    </h2>
    <nav aria-label="Cookie policy section">
        <ol className="space-y-2.5">
            {sections.map((section) => {
                const isActive = section.id === activeId;
                return(
                    <li key={section.id}>
                        <a href={`#${section.id}`}
                           aria-current={isActive ? "location" : undefined}
                             className={`block text-[14px] leading-[19px] transition-color hover:text-[#222222]
                      ${isActive} ? "font-semibold text-[#222222]" : "text-gray-500"}`}
                           >
                           {section.title}
                        </a>
                    </li>
                )
            })}
        </ol>
    </nav>
 </aside>
));
TableOfContents.displayName = "TableOfContents";
const CookieSectionBlock = memo(({section}: {section: CookieSection}) => (
    <section 
      key={section.id}
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
       className="scroll-mt-28 print:break-inside-avoid border-b
        border-gray-200 pb-8 last:border-b-0">
          <h2 id={`${section.id}-heading`}
              className="mb-4 font-bold tracking-tight text-xl sm:text-2xl">
            {section.title}
              </h2>
              <div className="space-y-3">
            {section.content.map((paragraph, index) => (
                <p key={`${section.id}-${index}`}
                   className="text-[14px] md:text-[15px] leading-[19px] md:leading-[20px] text-gray-600 sm:text-base">
                    {paragraph}
                </p>
            ))}
        </div>
        </section>
))
CookieSectionBlock.displayName="CookieSectionBlock";
function BuildJsonLd(){
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Webpage",
                 name: "Lokestays Terms of Service",
                 description: "Read the Lokestays Terms of Service to understand the terms and conditions for using our accommodation platform.",
                 dataModified: LAST_UPDATED_ISO,
                 isPartOf: {"@type": "Website", name: "Lokestays"}
            },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Terms of Services" },
            ]
        }
        ]
    }
}
function useActiveSection(ids: readonly string[]){
    const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
    useEffect(() => {
        if(ids.length === 0 || typeof IntersectionObserver === "undefined") return;
        const observer = new IntersectionObserver((entries) => {
            for(const entry of entries){
            if(entry.isIntersecting) setActiveId(entry.target.id);

            }
        },{ rootMargin: "-25% 0px -70% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if(el) observer.observe(el);
    })
    return () => observer.disconnect();
    }, [ids]);
    return activeId;
}
export default function Cookie(){
      const jsonLd = useMemo(BuildJsonLd, []);
        const sectionIds = useMemo(() => COOKIE_SECTIONS.map((s) => s.id), []);
        const activeId = useActiveSection(sectionIds);
    return(
        <main className="w-full px-4 pt-12 md:pt-20 h-auto min-h-screen bg-white text-[#222222]">
            <Helmet>
                <title>Cookies - Lokestays Help Center</title>
                <meta 
                name="description"
                />
                <link rel="canonical" href="/cookie" />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
                
            </Helmet>
           <div className="w-full max-w-5xl mx-auto">
            <Breadcrumb />
            <header className="my-4 flex flex-col items-start gap-1.5">
                  <p className="text-[#6c6c6c] text-[15px] leading-[20px]
                   font-medium">Legal terms</p>
                    <h1 className="text-[24px] leading-[29px] md:text-[32px]
                     md:leading-[36px] font-semibold text-[#222222] tracking-normal md:tracking-tight">
                        Learn how Lokestays uses cookies and similar technologies on our website.</h1>
                     <p className="mt-1 font-normal tracking-normal text-[12px] leading-[16px] text-[#6c6c6c]">
            Last updated:{" "}
            <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
          </p>
            </header>
              <div className="grid gird-cols-1 lg:grid-cols-[240px_1fr] py-4 gap-10">
                    <TableOfContents sections={COOKIE_SECTIONS} activeId={activeId} />
                    <article className="min-w-0">
                        <div className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
                            <h2 className="mb-2 text-[15px] leading-[20px] font-semibold">
                                Please read these terms</h2>
                            <p className="text-[15px] leading-[20px] text-gray-600 tracking-normal md:tracking-tight">These Terms apply to the use of Lokestays by visitors, registered users, and property hosts. Additional conditions may apply to specific features when clearly communicated to users.</p>
                        </div>
                          <div className="space-y-10">
                            {COOKIE_SECTIONS.map((section) => (
                                <CookieSectionBlock key={section.id} section={section} />
                            ))}
                          </div>
                    </article>
                </div>
           </div>
           <ScrollToTopButton />
        </main>
    )
}