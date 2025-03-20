import { SkillsListProp } from "@/types/types";

export const skillList: SkillsListProp[] = [
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