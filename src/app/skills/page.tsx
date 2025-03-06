import Avatar from '@/components/Avatar';
import SkillsTab from '@/components/SkillsTab';
import { skillList } from '@/data/skills';

export default function Skills() {

  return (
    <section id="skills" className="sm:min-h-[80vh] py-36">
      <div className="flex sm:flex-row flex-col items-center mb-2">
        <h1 className="text-header font-bold sm:mr-4">Skills</h1>
        <Avatar bubbleMessage="I speak fluent JavaScript… and a few others!" sectionName="skills"/>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-12 justify-center items-center w-full max-w-[1500px] mx-auto">
        {skillList.map((item) => (
          <SkillsTab key={item.category} category={item.category} skills={item.skills} />
        ))}
      </div>
    </section>
  );
}
