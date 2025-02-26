import Intro from './sections/Intro';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import About from './sections/About';

export default function Home() {
  return (
    <div className="mx-[60px] mt-[40px] sm:mx-[40px] sm:mt-[30px] md:mx-[60px] md:mt-[40px]">
      <Intro />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <About />
    </div>
  );
}
