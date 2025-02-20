import Image from 'next/image';
import NavBar from '../components/NavBar';

export default function Intro() {
    return (
      <section id="intro" className="min-h-[90vh] flex flex-col">
      <NavBar />
      <div className="flex flex-col flex-grow py-20 sm:py-40">
        <div className="flex flex-wrap items-end justify-center sm:justify-start">
          <h1 className="text-header font-bold mb-[16px] sm:mb-[24px] sm:mr-[30px] text-center sm:text-left">
            Hi I&apos;m Srishti Rai
          </h1>
          <Image 
            className="mb-[16px]" 
            src="/images/headshot.svg" 
            alt="headshot" 
            width={95} 
            height={95} 
            unoptimized
          />
        </div>
        <h2 className="text-4xl font-bold mb-[32px] sm:mb-[86px] text-center sm:text-left">
          A full-stack developer blending code with creativity.
        </h2>
        <p className="text-body text-center sm:text-left">
          From frontend finesse to backend brilliance, I craft seamless web experiences, one line of code at a time!
        </p>
      </div>
    </section>
    
    );
  }
  