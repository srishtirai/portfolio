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

export type QueryRequest = {
    query: string;
};
  
export type ChunkResult = {
    content: string;
    id: string;
    metadata: {
      section: string;
      [key: string]: unknown;
    };
  };