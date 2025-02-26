import Image from 'next/image';
import { SkillsListProp } from '../sections/Skills';

export default function SkillsTab({ category, skills }: SkillsListProp) {
    return (
        <div className="flex flex-col items-center justify-start bg-white border border-accent rounded-[10px] w-full max-w-[250px] min-w-[170px] sm:min-w-[200px] h-[430px] sm:h-[530px] p-4 space-y-4">
            <h3 className="text-subheader sm:text-3xl font-bold text-center sm:h-[70px]">{category}</h3>
            <div className="flex flex-wrap justify-start sm:justify-start space-y-4 w-full">
                {skills.map((skill) => (
                    <div className="flex items-center justify-start space-x-3 w-full min-w-[200px] max-w-full" 
                    key={skill.label}>
                        <Image 
                            src={skill.imgSrc} 
                            alt={skill.label} 
                            width={30} 
                            height={30} 
                            className="sm:w-[30px] sm:h-[30px] w-[25px] h-[25px]" 
                        />
                        <p className="text-primary text-small font-medium">{skill.label}</p>
                    </div>
                ))}
            </div>
      </div>
    );
}

