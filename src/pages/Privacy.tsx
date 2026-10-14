import { useEffect, useMemo, useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "@tanstack/react-router";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
const LAST_UPDATED = "October 11, 2026";
const LAST_UPDATED_ISO = "2026-10-11";



interface PrivacySection {
  id: string;
  title: string;
  content: string[];
}


const PRIVACY_SECTIONS: readonly PrivacySection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: [
      "Welcome to Lokestays. We respect your privacy and are committed to handling your personal information responsibly.",
      "This Privacy Policy explains how Lokestays collects, uses, stores, shares, and protects information when you visit our website, create an account, submit a property, or use our services.",
      "By using Lokestays, you acknowledge that you have had the opportunity to read this policy. Where applicable law requires consent or another legal basis for processing, we will handle your information accordingly.",
    ],
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: [
      "Account information: When you register, we may collect your first name, last name, email address, account identifier, and information needed to manage your account.",
      "Property information: When you submit a property, we may collect its title, description, property type, city, location coordinates, price, number of bedrooms, amenities, and photographs.",
      "Communications: If you contact us for support, we may retain the information you provide and our correspondence with you.",
      "Technical information: Depending on our infrastructure and configuration, our service providers may process technical logs, device information, IP addresses, and diagnostic information for security and service operation.",
      "We aim to collect only information that is reasonably necessary for the purposes described in this policy.",
    ],
  },
  {
    id: "collection-methods",
    title: "3. How We Collect Information",
    content: [
      "We collect information that you provide directly when registering, signing in, updating your profile, submitting a property, or contacting us.",
      "We may also receive information generated through your use of the platform, including authentication records and technical logs maintained by our service providers.",
      "The information collected depends on the features you use and the services currently integrated into Lokestays.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "4. How We Use Your Information",
    content: [
      "We may use personal information to create and manage accounts, authenticate users, enable host functionality, process property submissions, and operate the platform.",
      "We may use submitted property information to review listings, publish approved properties, display search results, and help visitors discover available accommodation.",
      "We may also use relevant information to maintain security, investigate suspected abuse, respond to support requests, comply with legal obligations, and improve the reliability of our services.",
      "We do not promise to use information for a purpose that is inconsistent with this policy or applicable law.",
    ],
  },
  {
    id: "accounts",
    title: "5. User Accounts and Host Access",
    content: [
      "Users can create accounts to access features available to registered users. Depending on the platform's functionality, an existing user may also apply to become a host without creating a separate account.",
      "We use account identifiers and authorization controls to associate users with their permitted activities. Hosts should only be able to manage properties they are authorized to manage.",
      "You are responsible for keeping your account credentials confidential and notifying us if you suspect unauthorized access to your account.",
      "We may restrict access or take other appropriate action when necessary to protect users, the platform, or comply with applicable law.",
    ],
  },
  {
    id: "property-information",
    title: "6. Host Information and Public Listings",
    content: [
      "Hosts may submit property descriptions, photographs, prices, amenities, and location information for review and publication.",
      "Property submissions may be reviewed by authorized administrators before they are published. Pending or rejected listings should not be publicly displayed as approved properties.",
      "Information displayed on public listings may be visible to visitors and may be copied, captured, or shared by other people.",
      "Hosts should not submit personal information, photographs, or other materials that they do not have permission to provide.",
      "Please consider carefully whether to include an exact property address or precise coordinates in publicly accessible listing information.",
    ],
  },
  {
    id: "information-sharing",
    title: "7. How We Share Information",
    content: [
      "We may share information when necessary to operate Lokestays, including with service providers that support authentication, hosting, data storage, image delivery, or other implemented platform functions.",
      "Information included in published property listings may be available to visitors. Information that is not intended to be public should be protected by appropriate access controls.",
      "We may disclose information where required by applicable law, a valid legal process, or a lawful request from an authorized public authority.",
      "We may also use or disclose information when reasonably necessary to investigate fraud, address security incidents, enforce applicable terms, or protect the rights and safety of users and others, subject to applicable law.",
      "We do not represent that personal information is never shared. Sharing depends on the services used, the circumstances, and applicable legal requirements.",
    ],
  },
  {
    id: "third-party-services",
    title: "8. Firebase and Third-Party Services",
    content: [
      "Lokestays uses Firebase services for certain application functions, which may include authentication, database storage, and website hosting, depending on our current configuration.",
      "These services may process information necessary to provide their functionality. Their processing is also subject to the relevant service terms, privacy documentation, and applicable law.",
      "If we integrate additional providers for image storage, analytics, payments, communications, or other features, information may be shared with those providers as necessary to deliver the relevant service.",
      "We will update this policy when material changes to our data processing practices require an update.",
    ],
  },
  {
    id: "cookies",
    title: "9. Cookies and Local Storage",
    content: [
      "Lokestays and its service providers may use cookies, browser storage, or similar technologies where necessary for authentication, security, user preferences, and website functionality.",
      "The technologies used depend on the application's implementation and the services enabled.",
      "You may be able to manage cookies through your browser settings. Disabling certain technologies may affect some website features.",
      "Where required by law, we will provide appropriate information and obtain consent before using technologies that require it.",
    ],
  },
  {
    id: "security",
    title: "10. Data Security",
    content: [
      "We take reasonable technical and organizational measures designed to protect personal information against unauthorized access, disclosure, alteration, and destruction.",
      "Depending on the feature, these measures may include authentication, access restrictions, database security rules, input validation, and restricted administrative permissions.",
      "No website, database, or internet transmission can be guaranteed to be completely secure. We therefore cannot promise absolute security.",
      "Users should protect their account credentials and promptly report suspected security incidents.",
    ],
  },
  {
    id: "retention",
    title: "11. Data Retention and Deletion",
    content: [
      "We retain personal information for as long as reasonably necessary for the purposes described in this policy, including providing the service, maintaining security, resolving disputes, and meeting applicable legal obligations.",
      "Retention periods may differ depending on the type of information and why it was collected.",
      "You may contact us to request deletion of your account or personal information. We will review requests in accordance with applicable law and explain any relevant limitations where appropriate.",
      "Some information may need to be retained when required by law or when necessary for legitimate security, dispute-resolution, or recordkeeping purposes.",
    ],
  },
  {
    id: "privacy-rights",
    title: "12. Your Privacy Rights",
    content: [
      "Depending on applicable law and the circumstances, you may have rights to request access to your personal information, correct inaccurate information, request deletion, or obtain information about how your data is processed.",
      "You may also have the right to object to certain processing or withdraw consent where consent is the applicable legal basis.",
      "To exercise an applicable right, contact us using the contact details provided below. We may need to verify your identity before acting on a request.",
      "We will respond to requests in accordance with applicable legal requirements.",
    ],
  },
  {
    id: "children",
    title: "13. Children's Privacy",
    content: [
      "Lokestays is not intended to collect personal information from children in circumstances where doing so would violate applicable law.",
      "We do not knowingly collect children's personal information where prohibited by law. If you believe a child has provided personal information improperly, please contact us so we can review the matter and take appropriate action.",
      "Any age requirements for registering, hosting, or booking must comply with applicable law and the platform's applicable terms.",
    ],
  },
  {
    id: "international-processing",
    title: "14. International Data Processing",
    content: [
      "Some service providers may process or store information in countries other than the country where you live.",
      "Where personal information is transferred internationally, we will take steps required by applicable law to ensure that the transfer and processing are appropriately protected.",
      "The locations in which information is processed depend on our service providers and their configurations.",
    ],
  },
  {
    id: "changes",
    title: "15. Changes to This Privacy Policy",
    content: [
      "We may update this Privacy Policy to reflect changes in our services, technology, data processing practices, or legal obligations.",
      "When we update the policy, we will revise the date shown at the top of this page. Where required by law, we will provide additional notice or obtain consent before implementing relevant changes.",
      "We encourage you to review this page periodically.",
    ],
  },
  {
    id: "contact",
    title: "16. Contact Us",
    content: [
      "If you have questions about this Privacy Policy, wish to exercise an applicable privacy right, or have a concern about how your information is handled, please contact the Lokestays team.",
      "Before publishing this policy, add an email address or another reliable contact method that you actively monitor.",
    ],
  },
] as const;

/* --------------------------- Sub-components ------------------------ */

const Breadcrumb = memo(() => (
  <nav aria-label="Breadcrumb" className="mt-4">
    <ol className="flex items-center gap-2">
      <li>
        <Link
          to="/"
          className="text-[12px]
           capitalize text-[#222222]
           underline-offset-4
           hover:underline
           focus-visible:rounded-md
           focus-visible:offset-[#222222]
           focus-visible:outline-offset-2
           font-normal leading-[16px]
           motion-reduce:transition-none
           cursor-pointer"

        >
          Home
        </Link>
      </li>
      <li aria-hidden="true" className="text-[#222222]">/</li>
      <li aria-current="page" 
          className="text-[12px]
          underline-offset-4
          focus-visible:rounded-md
          focus-visible:offset-[#222222]
          focus-visible:outline-offset-2
          hover:underline
          cursor-pointer
          capitalize text-[#222222] 
          motion-reduce:transition-none
          font-normal leading-[16px]">
        Privacy Policy
      </li>
    </ol>
  </nav>
));
Breadcrumb.displayName = "Breadcrumb";

interface TableOfContentsProps {
  sections: readonly PrivacySection[];
  activeId: string;
}

const TableOfContents = memo(({ sections, activeId }: TableOfContentsProps) => (
  <aside
    role="complementary"
    aria-label="Privacy policy table of contents"
    className="hidden lg:block h-fit rounded-xl border border-gray-200 p-5 lg:sticky lg:top-24"
  >
    <h2 className="mb-3 text-[16px] leading-[24px] font-semibold uppercase tracking-wide text-[#6c6c6c]">
      On this page
    </h2>
    <nav aria-label="Privacy policy sections">
      <ol className="space-y-2.5">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block text-[14px] leading-[19px] transition-colors hover:text-[#222222] ${
                  isActive ? "font-semibold text-[#222222]" : "text-gray-500"
                }`}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  </aside>
));
TableOfContents.displayName = "TableOfContents";

const PrivacySectionBlock = memo(({ section }: { section: PrivacySection }) => (
  <section
    key={section.id}
    id={section.id}
    aria-labelledby={`${section.id}-heading`}
    className="scroll-mt-28 border-b border-gray-200 pb-8 last:border-b-0 print:break-inside-avoid"
  >
    <h2
      id={`${section.id}-heading`}
      className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
    >
      {section.title}
    </h2>
    <div className="space-y-3">
      {section.content.map((paragraph, index) => (
        <p
          key={`${section.id}-${index}`}
          className="text-[14px] leading-[19px] md:text-[15px] leading-[20px] text-gray-600 sm:text-base"
        >
          {paragraph}
        </p>
      ))}
    </div>
  </section>
));
PrivacySectionBlock.displayName = "PrivacySectionBlock";

/* -------------------------- Structured data ------------------------ */

function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Lokestays Privacy Policy",
        description:
          "Learn how Lokestays collects, uses, stores, and protects personal information when you use our accommodation platform.",
        dateModified: LAST_UPDATED_ISO,
        isPartOf: { "@type": "WebSite", name: "Lokestays" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Privacy Policy" },
        ],
      },
    ],
  };
}

/* ------------------------------ Scroll spy ------------------------- */

function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // Trigger when heading is near top, accounting for sticky header
      { rootMargin: "-25% 0px -70% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

/* -------------------------------- Page ----------------------------- */

export default function Privacy() {
  const jsonLd = useMemo(buildJsonLd, []);
  const sectionIds = useMemo(() => PRIVACY_SECTIONS.map((s) => s.id), []);
  const activeId = useActiveSection(sectionIds);

  return (
    <main className="w-full px-4 pt-12 md:pt-20 h-auto min-h-screen bg-white text-[#222222]">
      <Helmet>
        <title>Privacy Policy | Lokestays</title>
        <meta
          name="description"
          content="Learn how Lokestays collects, uses, stores, and protects personal information when you use our accommodation platform."
        />
        <link rel="canonical" href="/privacy" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="w-full max-w-5xl mx-auto">
        <Breadcrumb />

        <header className="my-4 flex flex-col items-start gap-1.5">
          <p className="text-[#6c6c6c] text-[15px] leading-[20px] font-medium">Legal terms</p>
          <h1 className="text-[24px] leading-[29px] md:text-[32px] md:leading-[36px] text-[#222222] font-semibold">
            Your privacy matters to us. Learn how Lokestays handles your personal
            information when you use our platform.
          </h1>
          <p className="mt-1 font-normal tracking-normal text-[12px] leading-[16px] text-[#6c6c6c]">
            Last updated:{" "}
            <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 py-4 lg:grid-cols-[240px_1fr]">
          <TableOfContents sections={PRIVACY_SECTIONS} activeId={activeId} />

          <article className="min-w-0">
            <div className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <h2 className="mb-2 text-[15px] leading-[20px] font-semibold">About this policy</h2>
              <p className="text-[15px] leading-[20px] text-gray-600 tracking-normal md:tracking-tight">
                This policy explains how personal information may be processed
                when you use Lokestays. The information we collect depends on the
                features you use and the services currently integrated into the
                platform.
              </p>
            </div>

            <div className="space-y-10">
              {PRIVACY_SECTIONS.map((section) => (
                <PrivacySectionBlock key={section.id} section={section} />
              ))}
            </div>
          </article>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  );
}