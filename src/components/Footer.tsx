import Image from "next/image";

export default function Footer() {

  const links = [
    { src: "/images/linkedin.svg", alt: "LinkedIn", text: "linkedin.com/in/srishti-c-rai", url: "https://www.linkedin.com/in/srishti-c-rai/" },
    { src: "/images/github.svg", alt: "GitHub", text: "github.com/srishtirai", url: "https://github.com/srishtirai" },
    { src: "/images/email.svg", alt: "Email", text: "srishtiraic@gmail.com", url: "mailto:srishtiraic@gmail.com" }
  ];

  return (
    <footer className="text-center text-primary text-xs sm:text-sm py-6 bg-accent bg-opacity-30">
      <p>
        Built with <span className="text-primary">❤️</span> and lots of <strong>TypeScript</strong>.
      </p>
      <p>
        Copyright © 2025 <strong>Srishti Rai</strong>
      </p>

      {/* Contact Info */}
      <div className="flex justify-center gap-6 mt-2">
        {links.map(({ src, alt, text, url }) => (
          <a key={alt} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary">
            <Image src={src} alt={alt} width={20} height={20} />
            <span>{text}</span>
          </a>
        ))}
      </div>

    </footer>
  );
}
