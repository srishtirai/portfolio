import Avatar from "../components/avatar";

export default function Experience() {
  return (
    <section id="experience" className="min-h-[90vh] p-8">
      <div className="avatar-section flex items-center mb-8">
        <h1 className="text-header font-bold mr-4">Experience</h1>
        <Avatar bubbleMessage="From concept to production—been there, built that." sectionName="experience"/>
      </div>
    </section>
  );
}
