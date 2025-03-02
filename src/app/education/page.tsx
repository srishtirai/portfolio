import Image from "next/image";
import Avatar from "@/components/avatar";

export default function Education() {
  const education = [
    {
      college: "Northeastern University",
      imgSrc: '/images/neu.svg',
      degree: "Master of Science, Software Engineering",
      location: "Boston, MA",
      duration: "Sep 2023 - Expected Jun 2025",
      additionalDetails: {
        title: "Leadership & Mentorship",
        description: "TA - Java OOC, OASIS Mentor",
      },
    },
    {
      college: "RNS Institute of Technology",
      imgSrc: '/images/rns.svg',
      degree: "Bachelor of Engineering, Computer Science",
      location: "Bengaluru, India",
      duration: "Jul 2016 - Aug 2020",
    },
  ];

  return (
    <section id="education" className="sm:min-h-[80vh] py-10 sm:py-36">
      <div className="flex sm:flex-row flex-col items-center sm:mb-10">
        <h1 className="text-header font-bold sm:mr-4">Education</h1>
        <Avatar bubbleMessage="Degrees and debugging — both require patience!" sectionName="education" />
      </div>
      {education.map(edu => (
        <div className="p-5 bg-white rounded-lg shadow-lg mb-10" key={edu.college}>
          <div className="flex flex-row sm:mb-2">
            <Image
              src={edu.imgSrc} 
              alt={edu.college} 
              width={60} 
              height={60}
            />
            <div className="flex justify-between flex-col sm:flex-row mt-3 ml-4 w-full">
              <h3 className="text-subheader sm:text-3xl font-bold sm:mb-1">{edu.college}</h3>
              <p>{edu.location}</p>
            </div>
          </div>
          <div className="sm:ml-14 sm:pl-4 mt-3 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between text-primary">
              <h3 className="font-bold text-body">{edu.degree}</h3>
              <p>{edu.duration}</p>
            </div>
            {edu.additionalDetails && (
              <div className="sm:mt-7">
                <p className="text-primary">{edu.additionalDetails.title} :</p>
                <p>{edu.additionalDetails.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
