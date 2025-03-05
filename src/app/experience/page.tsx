"use client";

import Image from "next/image";
import Avatar from "@/components/avatar";

export default function Experience() {
  const experience = [
    {
      company: "Sentinel Group",
      imgSrc: "/images/sentinel.svg",
      location: "Wakefield, MA",
      roles: [
        {
          title: "Software Development Co-op",
          duration: "May 2024 - Dec 2024",
          projects: [
            {
              title: "Automated Folder Management System",
              description:
                "Built an automation system for folder management using Nest.js, integrating compliance monitoring and a user-friendly Next.js admin panel with TDD for maintainability.",
              techStack: "TypeScript, Next.js, Tailwind CSS, Postgres, Nest.js, AWS (EC2)",
            },
          ],
        },
      ],
    },
    {
      company: "LG Soft India",
      imgSrc: "/images/lg.svg",
      location: "Bengaluru, India",
      roles: [
        {
          title: "Research Engineer",
          duration: "Jul 2021 - Aug 2023",
          projects: [
            {
              title: "OTA Updates Portal & Battery Management System",
              description:
                "Developed an application to manage and monitor battery statuses & firmware updates. Used React for the frontend, modular components for reusability, and secure APIs for authentication.",
              techStack: "React, Redux, Docker, AWS (S3, IAM), SASS, Java, Spring Boot, ChartJS, AGGrid",
            },
          ],
        },
        {
          title: "Software Engineer",
          duration: "Jul 2020 - Jul 2021",
          projects: [
            {
              title: "TV, Signage, & Entertainment System Development",
              description:
                "Worked on the webOS ecosystem, developing gallery and calendar apps using EnactJS for TVs and signage. Built a Flutter proof-of-concept for network and Bluetooth-based features.",
              techStack: "React, Redux, EnactJS, CSS, WebOS",
            },
          ],
        },
        {
          title: "Web Development Intern",
          duration: "Mar 2020 - Jun 2020",
          projects: [
            {
              title: "EnactJS & webOS Development",
              description:
                "Explored modern web development with EnactJS, contributing to webOS services and UI accessibility improvements.",
              techStack: "React, Redux, EnactJS, CSS, WebOS",
            },
          ],
        },
      ],
    },
  ];

  return (
    <section id="experience" className="sm:min-h-[80vh] py-10 sm:py-36">
      <div className="flex sm:flex-row flex-col items-center sm:mb-10">
        <h1 className="text-header font-bold sm:mr-4">Experience</h1>
        <Avatar bubbleMessage="From concept to production—been there, built that." sectionName="experience" />
      </div>

      <div className="flex flex-col space-y-8 mx-auto">
        {experience.map((exp) => (
          <div
            key={exp.company}
            className="p-5 bg-white rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="flex items-center">
              <Image src={exp.imgSrc} alt={exp.company} width={50} height={50} />
              <div className="ml-4">
                <h3 className="text-subheader sm:text-3xl font-bold">{exp.company}</h3>
                <p>{exp.location}</p>
              </div>
            </div>

            {exp.roles.map((role, roleIndex) => (
              <div key={roleIndex} className="mt-6">
                <h3 className="font-bold text-body">{role.title}</h3>
                <p>{role.duration}</p>

                {role.projects &&
                  role.projects.map((project, projectIndex) => (
                    <div key={projectIndex} className="mt-3 pl-4 border-l-2 border-accent border-opacity-50">
                      <p className="font-semibold text-primary">{project.title}</p>
                      <p className="text-xs sm:text-sm">{project.description}</p>
                      {/* <p className="text-xs sm:text-sm italic mt-1">{project.techStack}</p> */}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
