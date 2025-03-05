import Image from 'next/image';

export type Skill = {
    label: string;
    imgSrc: string;
};
  
export type SkillsListProp = {
    category: string;
    skills: Skill[];
};

export default function SkillsTab({ category, skills }: SkillsListProp) {

    return (
        <div className="flex flex-col p-6 shadow-xl items-center justify-start bg-white rounded-[10px] w-full max-w-[250px] sm:max-w-[300px] sm:min-w-[220px] h-[430px] sm:h-[530px] p-4 space-y-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-subheader sm:text-3xl font-bold text-center sm:h-[70px]">{category}</h3>
            <div className="flex flex-wrap justify-start space-y-4 w-full">
                {skills.map((skill) => (
                    <div 
                      key={skill.label} 
                      className="flex items-center justify-start space-x-3 w-full min-w-[200px] max-w-full"
                    >
                        <Image 
                            src={skill.imgSrc} 
                            alt={skill.label} 
                            width={30} 
                            height={30} 
                            className="sm:w-[30px] sm:h-[30px] w-[25px] h-[25px]" 
                        />
                        <p className="text-primary font-medium">{skill.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
