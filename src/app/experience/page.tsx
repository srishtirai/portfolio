import Image from "next/image";
import Avatar from "@/components/Avatar";
import { experience } from "@/data/experience";

export default function Experience() {

  return (
    <section id="experience" className="portfolio-section">
      <div className="section-heading">
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
              {exp.imgSrc ? <Image src={exp.imgSrc} alt={exp.company} width={50} height={50} /> : <span className="company-monogram" aria-hidden="true">T</span>}
              <div className="ml-4">
                <h3 className="text-subheader sm:text-3xl font-bold">{exp.company}</h3>
                {exp.location && <p>{exp.location}</p>}
              </div>
            </div>

            {exp.roles.map(role => <RoleDetails key={role.title} role={role} />)}
          </div>
        ))}
      </div>
    </section>
  );
}

function RoleDetails({ role }: { role: (typeof experience)[number]["roles"][number] }) {
  return <div className="mt-6">
    <h3 className="font-bold text-body">{role.title}</h3>
    {role.duration && <p>{role.duration}</p>}
    {role.projects.map(project => <div key={project.title} className="mt-3 pl-4 border-l-2 border-accent border-opacity-50">
      <p className="font-semibold text-primary">{project.title}</p>
      <p className="text-xs sm:text-sm">{project.description}</p>
      <p className="text-xs sm:text-sm italic mt-1">{project.techStack}</p>
    </div>)}
  </div>;
}
