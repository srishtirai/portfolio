"use client";

import { motion } from "framer-motion";

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-20 h-20 sm:w-36 sm:h-36 bg-accent opacity-20 rounded-full top-20 sm:top-10 left-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-24 h-24 sm:w-40 sm:h-40 bg-accent opacity-10 rounded-full right-10 bottom-20 sm:right-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
  );
}
