import Avatar from "@/components/Avatar";
import { skillList } from "@/data/skills";

const strengths = [
  { title: "Interfaces", description: "Thoughtful, maintainable web experiences.", tools: "React · Next.js · TypeScript" },
  { title: "Systems & automation", description: "APIs and workflows that make complex work simpler.", tools: "Java · Spring Boot · Nest.js" },
  { title: "Data & delivery", description: "The tools behind reliable applications.", tools: "PostgreSQL · AWS · Docker" },
];
export default function Skills() {
  return <section id="skills" className="portfolio-section">
    <div className="section-heading"><h1 className="text-header">Skills</h1><Avatar bubbleMessage="A few trusted tools. A lot of curiosity." sectionName="skills" /></div>
    <div className="strength-grid">{strengths.map(item => <article className="strength-card" key={item.title}><h2>{item.title}</h2><p>{item.description}</p><p className="skill-tools">{item.tools}</p></article>)}</div>
    <details className="more-skills"><summary>Explore the full toolkit</summary><div className="toolkit-grid">{skillList.map(group => <div key={group.category}><h3>{group.category}</h3><p>{group.skills.map(skill => skill.label === "Open API" ? "OpenAI API" : skill.label).join(" · ")}</p></div>)}</div></details>
  </section>;
}
