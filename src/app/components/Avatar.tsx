"use client";

import Image from "next/image";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import "./Avatar.css";

interface AvatarProps {
  bubbleMessage: string;
  sectionName: string;
}

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
            start: "top 50%", // Adjust this value to control when the avatar starts fading in
            end: "top 10%", // Adjust this value to control when the avatar starts fading out
            scrub: true,
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [sectionName]);

  return (
    <div ref={avatarRef} className="avatar-wrapper">
      <div className="avatar-image">
        <Image 
          src="/images/head.svg" 
          width={70} 
          height={70} 
          unoptimized
          alt="headshot"
        />
      </div>
      <div className="thought-bubble">
        <span>{bubbleMessage}</span>
      </div>
    </div>
  );
}

