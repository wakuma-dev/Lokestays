import type { ReactNode } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

interface SocialLink {
  readonly platform: string;
  readonly href: string;
  readonly icon: ReactNode;
}

const SOCIAL_LINKS = [
  {
    platform: "Facebook",
    href: "https://www.facebook.com/",
    icon: <FaFacebookF aria-hidden="true" focusable="false" />,
  },
  {
    platform: "X",
    href: "https://x.com/",
    icon: <FaXTwitter aria-hidden="true" focusable="false" />,
  },
  {
    platform: "Instagram",
    href: "https://www.instagram.com/",
    icon: <FaInstagram aria-hidden="true" focusable="false" />,
  },
] satisfies readonly SocialLink[];

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="
        mx-auto flex w-full max-w-[1400px] flex-col-reverse
        items-start gap-2 px-4
        md:flex-row md:items-center md:justify-between md:gap-0
        md:px-6 lg:px-0 lg:pb-10
      "
    >
      <p className="text-base leading-6 font-normal text-[#222222]">
        © {currentYear} Lokestays. All rights reserved.
      </p>

      <nav aria-label="Social media">
        <ul className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ platform, href, icon }) => (
            <li key={platform}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Lokestays on ${platform}`}
                className="
                  flex size-10 items-center justify-start md:justify-center rounded-full
                  text-[#222222] transition-colors duration-150
                  hover:bg-[#EBEBEB]
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#222222]
                  motion-reduce:transition-none
                "
              >
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

