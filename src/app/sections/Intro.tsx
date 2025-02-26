import Image from 'next/image';
import NavBar from '../components/NavBar';

export default function Intro() {
  return (
    <section id="intro" className="sm:min-h-[90vh] flex flex-col">
      <NavBar />
      <div className="flex flex-col flex-grow py-10 sm:py-40 p-4 sm:p-8">
        <div className="flex flex-wrap flex-col items-center sm:flex-row sm:items-end justify-center sm:justify-start">
          <h1 className="text-header font-bold mb-4 sm:mb-6 sm:mr-8 text-center sm:text-left">
            Hi I&apos;m Srishti Rai
          </h1>
          <Image
            className="mb-12"
            src="/images/headshot.svg"
            alt="headshot"
            width={80}
            height={80}
            unoptimized
          />
        </div>
        <h2 className="text-subheader sm:text-4xl font-bold mb-8 sm:mb-20 text-center sm:text-left">
          A full-stack developer blending code with creativity.
        </h2>
        <p className="text-body text-center sm:text-left">
          From frontend finesse to backend brilliance, I craft seamless web experiences, one line of code at a time!
        </p>
      </div>
    </section>
  );
}
