import Image from "next/image";
import Avatar from "../components/avatar";

export default function Experience() {
  const experience = [
    {
      company: "Sentinel Group",
      imgSrc: "/images/sentinel.svg",
      location: "Wakefield, MA",
      duration: "May 2025 - Dec 2024",
      roles: [
        {
          title: "Software Development Co-op",
          duration: "May 2025 - Dec 2024",
          projects: [
            {
              title: "Automated Folder Management System",
              description:
                "A solution built to streamline folder creation and management processes using NestJS for automation and Next.js for a user-friendly admin interface. It includes robust compliance monitoring and follows Test-Driven Development (TDD) for maintainable code.",
              techStack: "TypeScript, Next.js, Tailwind CSS, Postgres, Nest.js, AWS(EC2)",
            },
          ],
        },
      ],
    },
    {
      company: "LG Soft India",
      imgSrc: "/images/lg.svg",
      location: "Bengaluru, India",
      duration: "Mar 2020 - Aug 2023",
      roles: [
        {
          title: "Research Engineer",
          duration: "Jul 2021 - Aug 2023",
          projects: [
            {
              title: "OTA Updates Portal & Battery Management System",
              description:
                "A dynamic application designed to manage and monitor battery site statuses and firmware updates. Built with React for the frontend, it integrates Battery Management System data, enhances modularity with reusable components, and features secure APIs for platform authentication and authorization.",
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
                "Contributed to the webOS ecosystem by developing gallery and calendar apps using EnactJS for TV and signage. Created a Flutter proof of concept with network and Bluetooth features, designed accessible UIs for automotive and in-flight entertainment systems, and contributed to the webOS API for the TV settings app platform.",
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
                "Gained hands-on experience with EnactJS, deepening understanding of modern web practices, while exploring various webOS services to lay the foundation for future contributions.",
              techStack: "React, Redux, EnactJS, CSS, WebOS",
            },
          ],
        },
      ],
    },
  ];

  return (
    <section id="experience" className="sm:min-h-[80vh] py-10 sm:py-36">
      <div className="flex sm:flex-row flex-col items-center mb-10">
        <h1 className="text-header font-bold sm:mr-4">Experience</h1>
        <Avatar bubbleMessage="From concept to production—been there, built that." sectionName="experience" />
      </div>
      {experience.map((exp) => (
         <div className="p-5 bg-white rounded-lg shadow-lg mb-10" key={exp.company}>
          <div className="flex flex-row sm:mb-2">
            <Image
              src={exp.imgSrc} 
              alt={exp.company} 
              width={60} 
              height={60}
            />
            <div className="flex flex-col ml-4 w-full">
              <div className="flex justify-between mt-3">
                <h3 className="text-subheader sm:text-3xl font-bold sm:mb-1">{exp.company}</h3>
                <p>{exp.location}</p>
              </div>
            </div>
          </div>

          <div className="ml-6 pl-4 border-l-2 border-accent border-opacity-50 space-y-6">
            {exp.roles.map((role) => (
              <div key={role.title} className="relative">
                <div className="absolute -left-[25px] -top-[-10px] w-4 h-4 bg-accent rounded-full"></div>
                <div className="flex justify-between text-primary ml-3">
                  <h3 className="font-bold text-body">{role.title}</h3>
                  <p>{role.duration}</p>
                </div>
                {role.projects &&
                  role.projects.map((project) => (
                    <div key={project.title} className="mt-5 ml-3">
                      <p className="text-primary">{project.title}</p>
                      <p>{project.description}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
