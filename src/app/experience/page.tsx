import Image from "next/image";
import Avatar from "@/components/Avatar";
import { experience } from "@/data/experience";

export default function Experience() {

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
                      <p className="text-xs sm:text-sm italic mt-1">{project.techStack}</p>
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
