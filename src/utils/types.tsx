export type Skill = {
    label: string;
    imgSrc: string;
};
  
export type SkillsListProp = {
    category: string;
    skills: Skill[];
};

export type AvatarProps = {
    bubbleMessage: string;
    sectionName: string;
}