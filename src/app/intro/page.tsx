import Image from "next/image";
import FloatingElements from "@/components/FloatingElements";

export default function Intro() {
  return <section id="intro" className="intro-section">
    <FloatingElements />
    <div className="intro-copy">
      <p className="eyebrow">Software Engineer</p>
      <h1 className="text-header">Hi, I’m Srishti Rai.</h1>
      <h2 className="intro-tagline">Engineering with intention.<br />Creating with personality.</h2>
      <p className="intro-description">I build full-stack applications and automate complex workflows, with care for the systems behind the screen and the people using them.</p>
      <a className="linkedin-intro" href="https://www.linkedin.com/in/srishti-c-rai/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a>
    </div>
    <div className="intro-art"><Image src="/images/headshot.svg" alt="My hand-drawn portrait with orbiting technology symbols" width={230} height={260} unoptimized priority /></div>
  </section>;
}
