import Avatar from "../components/avatar";

export default function Projects() {
  return (
    <section id="projects" className="min-h-[90vh] p-8">
      <div className="flex items-center mb-8">
        <h1 className="text-header font-bold mr-4">Projects</h1>
        <Avatar bubbleMessage="Every project starts with a ‘what if…’" sectionName="projects"/>
      </div>
    </section>
  );
}
