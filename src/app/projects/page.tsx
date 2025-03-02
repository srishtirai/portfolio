import Avatar from "../components/avatar";

export default function Projects() {
  return (
    <section id="projects" className="sm:min-h-[80vh] py-10 sm:py-36">
      <div className="flex sm:flex-row flex-col items-center mb-10">
        <h1 className="text-header font-bold sm:mr-4">Projects</h1>
        <Avatar bubbleMessage="Every project starts with a ‘what if…’" sectionName="projects" />
      </div>
    </section>
  );
}
