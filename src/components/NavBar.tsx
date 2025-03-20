"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

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

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    indexes.forEach((index) => {
      const section = document.getElementById(index.targetId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

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
      className={`sm:fixed top-0 sm:w-full z-10 transition-all right-0 bg-white ${
        scrolled ? "py-2 shadow-md" : "py-4"
      } flex justify-end sm:justify-between items-center px-6 sm:px-12`}
    >
      <div className="hidden sm:flex space-x-6">
        {indexes.map((index) => (
          <button
            key={index.targetId}
            onClick={() => handleNavigation(index.targetId)}
            className={`relative font-medium text-small transition-all duration-300 hover:underline hover:scale-110 hover:text-accent underline-offset-8 ${
              activeSection === index.targetId ? "text-accent scale-110 underline" : "text-primary"
            }`}
          >
            {index.label}
          </button>
        ))}
      </div>
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
