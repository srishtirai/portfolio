"use client";

import Image from "next/image";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import "./Avatar.css";
import { AvatarProps } from "@/utils/types";

export default function Avatar({ bubbleMessage, sectionName }: AvatarProps) {
  const avatarRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionElement = document.querySelector(`#${sectionName}`) as HTMLElement;
    const avatarElement = avatarRef.current;

    if (sectionElement && avatarElement) {
      gsap.fromTo(avatarElement,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionElement,
            start: "top 50%",
            end: "top 10%",
            scrub: true,
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [sectionName]);

  return (
    <div ref={avatarRef} className="avatar-wrapper mt-10 sm:mt-0 w-full">
      <div className="avatar-image">
        <Image 
          src="/images/head.svg" 
          width={70} 
          height={70} 
          unoptimized
          alt="headshot"
          className="sm:w-[70px] sm:h-[70px] w-[50px] h-[50px]" 
        />
      </div>
      <div className="thought-bubble">
        <span>{bubbleMessage}</span>
      </div>
    </div>
  );
}

