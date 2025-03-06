"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const indexes = [
    { label: "Intro", targetId: "intro", href: "/" },
    { label: "Skills", targetId: "skills", href: "/skills" },
    { label: "Education", targetId: "education", href: "/education" },
    { label: "Experience", targetId: "experience", href: "/experience" },
    { label: "Projects", targetId: "projects", href: "/projects" },
    { label: "About", targetId: "about", href: "/about" }
  ];

  const links = [
    { src: "/images/linkedin.svg", alt: "LinkedIn", url: "https://www.linkedin.com/in/srishti-c-rai/" },
    { src: "/images/github.svg", alt: "GitHub", url: "https://github.com/srishtirai" },
    { src: "/images/email.svg", alt: "Email", url: "mailto:srishtiraic@gmail.com" }
  ];

  const handleNavigation = (targetId: string) => {
    if (pathname === "/") {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "/");
      }
    } else {
      router.push("/");
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  return (
    <div
      className={`sm:fixed top-0 sm:w-full z-10 transition-all right-0 ${
        scrolled ? "py-2 bg-white shadow-md" : "py-4"
      } flex justify-end sm:justify-between items-center px-6 sm:px-12`}
    >
      {/* Navigation Links */}
      <div className="hidden sm:flex space-x-6">
        {indexes.map((index) => (
          <button
            key={index.targetId}
            onClick={() => handleNavigation(index.targetId)}
            className="relative text-primary font-medium text-small transition-all duration-300 hover:underline hover:scale-110 hover:text-accent underline-offset-8"
          >
            {index.label}
          </button>
        ))}
      </div>

      {/* Social Media Icons */}
      <div className="flex items-center space-x-4">
        {links.map((link) => (
          <Link key={link.alt} href={link.url} target="_blank" rel="noopener noreferrer">
            <Image
              src={link.src}
              alt={link.alt}
              width={35}
              height={35}
              className="transition-transform transform hover:scale-110 hover:opacity-80 sm:w-[35px] sm:h-[35px] w-[30px] h-[30px]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
