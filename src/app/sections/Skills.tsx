import SkillsTab from "../components/SkillsTab";

export type Skill = {
  label: string;
  imgSrc: string;
};

export type SkillsListProp = {
  category: string;
  skills: Skill[];
};

export default function Skills() {
  const skillList: SkillsListProp[] = [
    { 
      category: 'Languages', 
      skills: [
        { label: 'JavaScript', imgSrc: '/images/javaScript.svg' },
        { label: 'Java', imgSrc: '/images/java.svg' },
        { label: 'TypeScript', imgSrc: '/images/typeScript.svg' },
        { label: 'Python', imgSrc: '/images/python.svg' },
        { label: 'Dart', imgSrc: '/images/dart.svg' },
        { label: 'C#', imgSrc: '/images/c-sharp.svg' },
      ],
    },
    { 
      category: 'Frontend', 
      skills: [
        { label: 'React', imgSrc: '/images/react.svg' },
        { label: 'Next.js', imgSrc: '/images/next.svg' },
        { label: 'Redux', imgSrc: '/images/redux.svg' },
        { label: 'HTML', imgSrc: '/images/html.svg' },
        { label: 'CSS', imgSrc: '/images/css.svg' },
        { label: 'Sass', imgSrc: '/images/sass.svg' },
        { label: 'Bootstrap', imgSrc: '/images/bootstrap.svg' },
        { label: 'Webpack', imgSrc: '/images/webpack.svg' },
        { label: 'Flutter', imgSrc: '/images/flutter.svg' },
      ],
    },
    { 
      category: 'Backend', 
      skills: [
        { label: 'Spring Boot', imgSrc: '/images/springboot.svg' },
        { label: 'Nest.js', imgSrc: '/images/nestjs.svg' },
        { label: 'Flask', imgSrc: '/images/flask.svg' },
        { label: 'ASP.NET', imgSrc: '/images/dot-net.svg' },
        { label: 'Jest', imgSrc: '/images/jest.svg' },
        { label: 'Selenium', imgSrc: '/images/selenium.svg' },
        { label: 'Docker', imgSrc: '/images/docker.svg' },
        { label: 'Octopus', imgSrc: '/images/octopus.svg' },
      ],
    },
    { 
      category: 'Databases & Cloud', 
      skills: [
        { label: 'SQL', imgSrc: '/images/sql.svg' },
        { label: 'MySQL', imgSrc: '/images/mysql.svg' },
        { label: 'PostgreSQL', imgSrc: '/images/postgresql.svg' },
        { label: 'MSSQL', imgSrc: '/images/mssql.svg' },
        { label: 'MongoDB', imgSrc: '/images/mongodb.svg' },
        { label: 'AWS', imgSrc: '/images/aws.svg' },
        { label: 'Azure', imgSrc: '/images/azure.svg' },
      ],
    },
    { 
      category: 'Exploring', 
      skills: [
        { label: 'LangChain', imgSrc: '/images/langchain.svg' },
        { label: 'FAISS', imgSrc: '/images/meta.svg' },
        { label: 'Open API', imgSrc: '/images/openai.svg' },
        { label: 'NumPy', imgSrc: '/images/numpy.svg' },
        { label: 'Pandas', imgSrc: '/images/pandas.svg' },
        { label: 'Scikit-learn', imgSrc: '/images/scikitlearn.svg' },
        { label: 'TensorFlow', imgSrc: '/images/tensorflow.svg' },
        { label: 'PyTorch', imgSrc: '/images/pytorch.svg' },
        { label: 'Figma', imgSrc: '/images/figma.svg' },
      ],
    }
  ];

    return (
      <section id="skills" className="min-h-[90vh] p-8">
        <h1 className="text-header font-bold mb-8">Skills</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {skillList.map((item) => (
            <SkillsTab key={item.category} category={item.category} skills={item.skills} />
          ))}
        </div>
      </section>
    );
  }
  