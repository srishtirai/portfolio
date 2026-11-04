"use client";

import Link from "next/link";
import { useState } from "react";

const sections = ["Intro", "Experience", "Projects", "Education", "About"];
export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <Link className="nav-brand" href="/#intro" onClick={() => setOpen(false)}>Srishti Rai<span aria-hidden="true"> ✦</span></Link>
      <button className="nav-toggle" aria-expanded={open} aria-controls="portfolio-navigation" onClick={() => setOpen(!open)}>{open ? "Close ✕" : "Menu ☰"}</button>
      <nav id="portfolio-navigation" aria-label="Main navigation" className={open ? "nav-links is-open" : "nav-links"}>
        {sections.map(section => <Link key={section} href={`/#${section.toLowerCase()}`} onClick={() => setOpen(false)}>{section}</Link>)}
      </nav>
    </header>
  );
}
