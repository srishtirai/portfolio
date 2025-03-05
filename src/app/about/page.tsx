import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="sm:min-h-[80vh] py-10 sm:py-20">
      <div className="flex sm:flex-row flex-col items-center sm:mb-10">
        <h1 className="text-header font-bold sm:mr-4">About Me</h1>
      </div>

      {/* About Content */}
      <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start sm:space-x-10">
        {/* Text Section */}
        <div className="sm:w-3/5 text-primary">
          <p className="hidden sm:block mb-4">
            I&apos;m a <strong>full-stack developer</strong> with a passion for <strong>automation, UI/UX, and AI-driven applications</strong>. 
            With experience at <strong>Sentinel Group</strong> and <strong>LG Soft India</strong>, I&apos;ve worked on <strong>enterprise automation, scalable architectures, and performance optimization</strong>. 
            I enjoy building seamless <strong>frontend experiences</strong> and architecting <strong>efficient backend systems</strong>.
          </p>
          <p className="hidden sm:block mb-4">
            Outside of coding, I’m an <strong>artist, a hiker, and an amateur poet</strong>. I love bringing creativity into my projects, whether it’s through <strong>design, problem-solving, or storytelling</strong>.
          </p>
          <p className="hidden sm:block">
            <strong>What drives me?</strong> Engineering impactful solutions at the intersection of <strong>technology, design, and AI</strong>. Let&apos;s connect and build something exciting!
          </p>

          {/* Mobile Version */}
          <p className="sm:hidden mt-10 mx-3">
            Passionate about <strong>full-stack development, automation, and UI/UX</strong>, I bring creativity into every project. 
            When not coding, you&apos;ll find me <strong>painting, hiking, or exploring AI for creative problem-solving</strong>.
          </p>
        </div>

        {/* Image Section */}
        <div className="sm:w-2/5 flex justify-center">
          <Image
            src="/images/about_me.jpeg" 
            alt="Srishti C Rai"
            width={300}
            height={300}
            className="rounded-xl shadow-xl object-cover sm:w-[300px] sm:h-[400px] w-[150px] h-[200px]"
          />
        </div>
      </div>
    </section>
  );
}
