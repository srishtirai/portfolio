import Intro from "./intro/page";
import Skills from "./skills/page";
import Education from "./education/page";
import Experience from "./experience/page";
import Projects from "./projects/page";
import About from "./about/page";

export default function Home() {
  return (
    <div>
        <Intro />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <About />
      </div>
  );
}
