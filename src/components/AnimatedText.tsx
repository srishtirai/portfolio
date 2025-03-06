"use client";

import { motion, HTMLMotionProps, TargetAndTransition, Transition } from "framer-motion";
import { ElementType } from "react";

interface AnimatedTextProps extends HTMLMotionProps<"div"> {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  transition?: Transition;
}

export default function AnimatedText({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  initial = { opacity: 0, y: -20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 1, delay },
  ...props
}: AnimatedTextProps) {
  const MotionTag = motion(Tag);

  return (
    <MotionTag className={className} initial={initial} animate={animate} transition={transition} {...props}>
      {text}
    </MotionTag>
  );
}
