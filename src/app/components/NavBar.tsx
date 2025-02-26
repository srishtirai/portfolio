import Image from 'next/image';
import NavItem from './NavItem';

export default function NavBar() {
  const indexes = [
    { label: 'Intro', targetId: 'intro' },
    { label: 'Skills', targetId: 'skills' },
    { label: 'Education', targetId: 'education' },
    { label: 'Experience', targetId: 'experience' },
    { label: 'Projects', targetId: 'projects' },
    { label: 'About', targetId: 'about' },
  ];

  const images = [
    { src: '/images/linkedin.svg', alt: 'linkedin' },
    { src: '/images/github.svg', alt: 'github' },
    { src: '/images/email.svg', alt: 'email' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between bg-white z-10 p-4">
      <div className="hidden sm:flex flex-wrap items-center gap-3 sm:gap-8 ">
        {indexes.map((index) => (
          <NavItem key={index.targetId} label={index.label} targetId={index.targetId} />
        ))}
      </div>
      <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-0 ml-auto">
        {images.map((img) => (
          <Image 
            key={img.alt}
            src={img.src}
            alt={img.alt}
            width={30}
            height={30}
            className="sm:w-9 sm:h-9"
          />
        ))}
      </div>
    </div>
  );
}
