"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="sm:min-h-[80vh] py-10 sm:py-20">
      <div className="flex sm:flex-row flex-col items-center sm:mb-10">
        <h1 className="text-header font-bold sm:mr-4">About Me</h1>
      </div>
      <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start sm:space-x-10">
        <div className="sm:w-3/5 text-primary">
          <p className="hidden sm:block mb-4">
            Hey there! I’m <strong>Srishti</strong>, a <strong>full-stack developer</strong> who thrives on crafting <strong>scalable systems</strong>, designing seamless <strong>user experiences</strong>, and automating processes to make life easier. 
            I’ve worked on enterprise automation, performance optimization, and AI-driven applications, tackling problems from system architecture to UI design.
          </p>
          
          <p className="hidden sm:block mb-4">
            But let’s be real—when I’m not building software, I’m probably <strong>painting</strong>(That little sketch you see? It’s something I doodled on my phone), <strong>writing {" "}
              <Link 
              href="https://www.yourquote.in/srishti-c-rai-m1oj/quotes" 
              target="_blank" 
              className="text-accent underline hover:text-hover transition-colors duration-300"
            >poetry</Link>, stalking adorable pets on Instagram, or experimenting in the kitchen</strong>. 
            I love blending <strong>creativity and logic</strong>, whether that’s through designing intuitive interfaces or finding new ways to automate workflows.
          </p>

          <p className="hidden sm:block">
            <strong>What fuels me?</strong> Building solutions at the intersection of technology and design while keeping things fun.  
            If you’re into cool projects, art, AI, or just swapping pet videos, let’s connect! 
          </p>

          {/* Mobile Version */}
          <p className="sm:hidden mt-10 mx-3">
            Developer by day, <strong>artist, poet, and pet enthusiast</strong> by night.  
            Passionate about automation, UI/UX, and AI, I’m all about building smart, scalable solutions and sneaking creativity into my projects.  
            Find me coding, painting, or discovering new food obsessions!
          </p>
        </div>
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
