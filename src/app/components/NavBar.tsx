"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const indexes = [
    { label: "Intro", targetId: "intro", href: "/" },
    { label: "Skills", targetId: "skills", href: "/skills" },
    { label: "Education", targetId: "education", href: "/education" },
    { label: "Experience", targetId: "experience", href: "/experience" },
    { label: "Projects", targetId: "projects", href: "/projects" },
    { label: "About", targetId: "about", href: "/about" }
  ];

  const links = [
    { src: "/images/linkedin.svg", alt: "linkedin", url: "https://www.linkedin.com/in/srishti-c-rai/" },
    { src: "/images/github.svg", alt: "github", url: "https://github.com/srishtirai" },
    { src: "/images/email.svg", alt: "email", url: "mailto:srishtiraic@gmail.com" }
  ];

  // Handle navigation and smooth scrolling
  const handleNavigation = (targetId: string) => {
    if (pathname === "/") {
      // If on home page, scroll smoothly and update the URL
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", '/');
      }
    } else {
      // Navigate to home and scroll after page loads
      router.push('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between bg-white z-10 p-4 fixed top-0 w-full shadow-md">
      {/* Navigation Links */}
      <div className="hidden sm:flex flex-wrap items-center gap-3 sm:gap-8 mx-[10px] sm:mx-[40px] md:mx-[60px]">
        {indexes.map((index) => (
          <div className="inline-block text-center" key={index.targetId}>
            <button
              onClick={() => handleNavigation(index.targetId)}
              className={`text-primary text-small font-medium ${pathname.includes(index.href) ? "font-bold" : ""}`}
            >
              {index.label}
            </button>
            <div className="w-full bg-accent font-thin border border-accent"></div>
          </div>
        ))}
      </div>

      {/* Social Media Icons with Clickable Links */}
      <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-0 ml-auto mx-[10px] sm:mx-[40px] md:mx-[60px]">
        {links.map((link) => (
          <a key={link.alt} href={link.url} target="_blank" rel="noopener noreferrer">
            <Image src={link.src} alt={link.alt} width={30} height={30} className="sm:w-9 sm:h-9 cursor-pointer" />
          </a>
        ))}
      </div>
    </div>
  );
}
