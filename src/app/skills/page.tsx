"use client";

import { useState, useRef } from 'react';
import Avatar from '@/components/Avatar';
import SkillsTab from '@/components/SkillsTab';
import { skillList } from '@/data/skills';

export default function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section id="skills" className="sm:min-h-[80vh] py-10 sm:py-36">
      <div className="flex sm:flex-row flex-col items-center mb-2">
        <h1 className="text-header font-bold sm:mr-4">Skills</h1>
        <Avatar bubbleMessage="I speak fluent JavaScript… and a few others!" sectionName="skills"/>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-12 justify-center items-center w-full max-w-[1500px] mx-auto">
        {skillList.map((item) => (
          <SkillsTab key={item.category} category={item.category} skills={item.skills} />
        ))}
      </div>

      {/* Mobile Horizontal Scroll with Pagination */}
      <div className="md:hidden flex flex-col items-center space-y-4">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto w-full snap-x snap-mandatory space-x-6 p-4 scrollbar-hide"
        >
          {skillList.map((item) => (
            <div key={item.category} className="flex-shrink-0 mx-auto snap-center">
              <SkillsTab category={item.category} skills={item.skills} />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex space-x-2">
          {skillList.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-accent scale-110" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
