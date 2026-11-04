import Image from "next/image";
import Avatar from "@/components/Avatar";
import { projects } from "@/data/projects";

export default function Projects() {
  return <section id="projects" className="portfolio-section">
    <div className="section-heading"><h1 className="text-header">Projects</h1><Avatar bubbleMessage="Every project starts with a ‘what if…’" sectionName="projects" /></div>
    <div className="project-grid">{projects.map(project => <article className="project-card" key={project.name}>
      <div className={project.name === "WoodlandWander" ? "project-image original-art" : "project-image"}><Image src={project.imgSrc} alt={project.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain" /></div>
      <div className="project-copy"><h2>{project.name}</h2><p>{project.description}</p><p className="project-stack">{project.techStack}</p><a href={project.link} target="_blank" rel="noopener noreferrer">View project ↗</a></div>
    </article>)}</div>
  </section>;
}
