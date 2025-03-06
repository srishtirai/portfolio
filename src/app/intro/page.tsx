import Image from "next/image";
import FloatingElements from "@/components/FloatingElements";
import AnimatedText from "@/components/AnimatedText";

export default function Intro() {
  return (
    <section id="intro" className="relative min-h-[80vh] flex flex-col justify-center">
      <FloatingElements />
      <div className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-start w-full px-4 sm:px-12">
        <AnimatedText 
          className="text-header font-bold mb-4 sm:mb-6 sm:mr-8 text-center sm:text-left"
          as="h1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          text="Hi I'm Srishti Rai"
        />
        <Image className="mb-12" src="/images/headshot.svg" alt="headshot" width={100} height={100} unoptimized />
      </div>

      <AnimatedText 
        className="text-subheader sm:text-4xl font-bold mb-8 sm:mb-20 text-center sm:text-left px-4 sm:px-12"
        as="h2"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        text="A full-stack developer blending code with creativity."
      />
      <AnimatedText 
        className="text-body text-center sm:text-left px-4 sm:px-12"
        as="p"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        text="From frontend finesse to backend brilliance, I craft seamless web experiences, one line of code at a time!"
      />
    </section>
  );
}
