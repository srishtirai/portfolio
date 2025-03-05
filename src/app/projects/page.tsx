"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/avatar";

export default function Projects() {
  const projects = [
    {
      name: "Portfolio",
      description: "A showcase of my work, projects, and experience.",
      imgSrc: "/images/portfolio.png",
      link: "https://github.com/srishtirai/portfolio",
      techStack: "Next.js, Tailwind CSS, TypeScript",
    },
    {
      name: "Movie Booking App",
      description: "A full-stack booking system for seamless movie reservations.",
      imgSrc: "/images/movie-booking.png",
      link: "https://github.com/srishtirai/movie-booking",
      techStack: "Java, Spring Boot, Hibernate, MySQL, Thymeleaf",
    },
    {
      name: "Stock Price Prediction",
      description: "An ML model that predicts stock trends based on historical data.",
      imgSrc: "/images/stock-predictor.png",
      link: "https://github.com/srishtirai/stock-predictor",
      techStack: "Flask, Python, Scikit-learn, Pandas, Matplotlib",
    },
    {
      name: "InHabit - Civic Tech",
      description: "Gamified user engagement platform for civic participation.",
      imgSrc: "/images/inhabit.png",
      link: "https://github.com/srishtirai/inhabit",
      techStack: "React, Flask, MySQL, CSS",
    }
  ];

  const [expanded, setExpanded] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll dots update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section id="projects" className="sm:min-h-[80vh] py-10 sm:py-36">
      <div className="flex sm:flex-row flex-col items-center sm:mb-10">
        <h1 className="text-header font-bold sm:mr-4">Projects</h1>
        <Avatar bubbleMessage="Every project starts with a ‘what if…’" sectionName="projects" />
      </div>
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer h-[300px] transition-all duration-500 hover:scale-105"
            onMouseEnter={() => window.innerWidth > 768 && setExpanded(index)}
            onMouseLeave={() => window.innerWidth > 768 && setExpanded(null)}
            onClick={() => window.innerWidth <= 768 && setExpanded(expanded === index ? null : index)}
          >
            {/* Flip Container */}
            <div className={`relative w-full h-full transition-transform duration-500 ${expanded === index ? "rotate-y-180" : ""}`}>
              
              {/* Front Side */}
              <div className={`absolute w-full h-full flex flex-col items-center transition-opacity duration-500 ${expanded === index ? "opacity-0" : "opacity-100"}`}>
                <div className="mb-auto relative w-full h-[220px] overflow-hidden rounded-lg">
                  <Image 
                    src={project.imgSrc} 
                    alt={project.name} 
                    fill 
                    className="object-contain"
                  />
                </div>
                <h4 className="text-body text-center text-primary bg-accent bg-opacity-30 py-2 w-full font-bold">
                  {project.name}
                </h4>
              </div>

              {/* Back Side */}
              <div className={`absolute inset-0 bg-primary text-white p-6 
                flex flex-col justify-between items-start transition-opacity duration-500
                ${expanded === index ? "opacity-100" : "opacity-0"}`}>
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
          </div>
        ))}
      </div>

      {/* Horizontal Scroll for Small Screens */}
      <div className="md:hidden flex flex-col items-center space-y-4">
        <div className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide snap-x snap-mandatory">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={`flex-shrink-0 w-[300px] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 relative h-[260px] snap-center ${
                index === currentIndex ? "scale-[1.03]" : "scale-[0.97] opacity-75"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {/* Image Section */}
              <div className={`relative w-full h-[200px] overflow-hidden rounded-lg ${expanded === index ? "hidden" : ""}`}>
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

              {/* Flip Card for Small Screens (Click Effect) */}
              <div className={`absolute inset-0 bg-primary text-white p-6 
                flex flex-col justify-between transition-all duration-500
                ${expanded === index ? "opacity-100" : "opacity-0"}`}>
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
