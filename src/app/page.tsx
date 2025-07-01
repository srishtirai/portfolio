import Intro from "./intro/page";
import Skills from "./skills/page";
import Education from "./education/page";
import Experience from "./experience/page";
import Projects from "./projects/page";
import About from "./about/page";
import { defaultMetadata } from "@/lib/seo-config";

export const metadata = defaultMetadata;

export default function Home() {
  return (
    <main>
      <Intro />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <About />
    </main>
  );
}