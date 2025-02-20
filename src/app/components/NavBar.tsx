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
    <div className="flex flex-wrap md:flex-nowrap items-center justify-between bg-white z-10">
      <div className="flex items-center space-x-8">
        {indexes.map((index) => (
          <NavItem key={index.targetId} label={index.label} targetId={index.targetId} />
        ))}
      </div>
      <div className="flex items-center space-x-4">
        {images.map((img) => (
          <Image key={img.alt} src={img.src} alt={img.alt} width={38} height={38}/>
        ))}
      </div>
    </div>
  );
}
