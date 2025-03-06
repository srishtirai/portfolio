"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { projects } from "@/data/projects";

export default function Projects() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Function to update index when user scrolls
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section id="projects" className="sm:min-h-[80vh] py-10 sm:py-36">
      {/* Header & Avatar */}
      <div className="flex sm:flex-row flex-col items-center sm:mb-10">
        <h1 className="text-header font-bold sm:mr-4">Projects</h1>
        <Avatar bubbleMessage="Every project starts with a ‘what if…’" sectionName="projects" />
      </div>

      {/* Grid Layout for Desktop */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.name}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer h-[300px] transition-all duration-500 hover:scale-105"
          >
            {/* Front Side */}
            <div className="relative w-full h-full flex flex-col items-center">
              <div className="mb-auto relative w-full h-[220px] overflow-hidden">
                <Image 
                  src={project.imgSrc} 
                  alt={project.name} 
                  fill 
                />
              </div>
              <h4 className="text-body text-center text-primary bg-accent bg-opacity-30 py-2 w-full font-bold">
                {project.name}
              </h4>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 bg-primary text-white p-6 
              flex flex-col justify-between items-start transition-opacity duration-500 opacity-0 hover:opacity-100">
              <h2 className="text-subheader text-accent font-bold text-center w-full">{project.name}</h2>
              <p className="mt-2">{project.description}</p>
              <p className="mt-3 text-gray-300 text-sm">{project.techStack}</p>
              <Link
                href={project.link}
                target="_blank"
                className="mt-auto bg-accent text-white mb-4 px-4 py-2 rounded-md text-center w-full transition-transform duration-300 hover:scale-105"
              >
                View Project
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal Scroll for Mobile */}
      <div className="md:hidden flex flex-col items-center space-y-4">
        {/* Scrollable Project List */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto w-full snap-x snap-mandatory space-x-6 p-4 scrollbar-hide"
        >
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex-shrink-0 w-[90%] mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 relative h-[240px] snap-center"
            >
              {/* Image Section */}
              <div className="relative w-full h-[200px] overflow-hidden rounded-lg">
                <Image 
                  src={project.imgSrc} 
                  alt={project.name} 
                  fill 
                  className="object-contain"
                />
              </div>
              <h4 className="mb-auto text-body text-center text-primary bg-accent bg-opacity-30 py-2 w-full font-bold">
                {project.name}
              </h4>

              {/* Project Details on Click */}
              <div className="absolute inset-0 bg-primary text-white p-3 
                flex flex-col justify-between transition-all duration-500 opacity-0 hover:opacity-100">
                <h2 className="text-subheader text-accent font-bold text-center w-full">{project.name}</h2>
                <p className="mt-2">{project.description}</p>
                <p className="mt-3 text-gray-300 text-sm">{project.techStack}</p>
                <Link
                  href={project.link}
                  target="_blank"
                  className="mt-auto bg-accent text-white mb-4 px-4 py-2 rounded-md text-center w-full transition-transform duration-300 hover:scale-105"
                >
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex space-x-2">
          {projects.map((_, index) => (
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
