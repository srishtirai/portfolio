import Avatar from "../components/Avatar";

export default function Education() {
  return (
    <section id="education" className="min-h-[90vh] p-8 mt-20">
      <div className="flex items-center mb-8">
        <h1 className="text-header font-bold mr-4">Education</h1>
        <Avatar bubbleMessage="Degrees and debugging — both require patience!" sectionName="education"/>
      </div>
    </section>
  );
}
