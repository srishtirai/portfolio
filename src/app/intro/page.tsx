"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section id="intro" className="relative min-h-[80vh] flex flex-col justify-center">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-20 h-20 sm:w-36 sm:h-36 bg-accent opacity-20 rounded-full top-20 sm:top-10 left-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-24 h-24 sm:w-40 sm:h-40 bg-accent opacity-10 rounded-full right-10 bottom-20 sm:right-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-start w-full px-4 sm:px-12">
        {/* Animated Heading */}
        <motion.h1
          className="text-header font-bold mb-4 sm:mb-6 sm:mr-8 text-center sm:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hi I&apos;m Srishti Rai
        </motion.h1>
        <Image className="mb-12" src="/images/headshot.svg" alt="headshot" width={100} height={100} unoptimized />
      </div>

      {/* Subheader */}
      <motion.h2
        className="text-subheader sm:text-4xl font-bold mb-8 sm:mb-20 text-center sm:text-left px-4 sm:px-12"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        A full-stack developer blending code with creativity.
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-body text-center sm:text-left px-4 sm:px-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <span className="hover:underline hover:text-accent transition-all duration-300">
          From frontend finesse to backend brilliance
        </span>
        , I craft seamless web experiences, one line of code at a time!
      </motion.p>
    </section>
  );
}
