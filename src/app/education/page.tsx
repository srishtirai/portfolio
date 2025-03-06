import Image from "next/image";
import Avatar from "@/components/Avatar";
import { education } from "@/data/education";

export default function Education() {

  return (
    <section id="education" className="sm:min-h-[80vh] py-10 sm:py-36">
      <div className="flex sm:flex-row flex-col items-center sm:mb-10">
        <h1 className="text-header font-bold sm:mr-4">Education</h1>
        <Avatar bubbleMessage="Degrees and debugging — both require patience!" sectionName="education" />
      </div>
      <div className="flex flex-col space-y-8 mx-auto">
        {education.map((edu) => (
          <div
            key={edu.college}
            className="p-5 bg-white rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
          >
            <div className="flex items-center">
              <Image src={edu.imgSrc} alt={edu.college} width={50} height={50} />
              <div className="ml-4">
                <h3 className="text-subheader sm:text-3xl font-bold">{edu.college}</h3>
                <p>{edu.location}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-body">{edu.degree}</h3>
              <p>{edu.duration}</p>
            </div>

            {edu.additionalDetails && (
              <div className="mt-4 space-y-2">
                {edu.additionalDetails.map((detail, index) => (
                  <div key={index}>
                    <p className="font-semibold text-primary">{detail.title}</p>
                    <p className="text-xs sm:text-sm">{detail.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
