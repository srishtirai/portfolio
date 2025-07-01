import Link from "next/link";

export const education = [
    {
      college: "Northeastern University",
      imgSrc: "/images/neu.svg",
      degree: "Master of Science, Software Engineering",
      location: "Boston, MA",
      duration: "Sep 2023 - Jun 2025",
      additionalDetails: [
        {
          title: "Teaching Assistant",
          description: "Assisting in Java OOP course, mentoring students and grading assignments.",
        },
        {
          title: "OASIS Mentor",
          description: (
            <>
              Mentoring undergraduate students in developing web applications.{" "}
              <Link
                href="https://oasisneu.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:text-hover transition-colors duration-300"
              >
                Learn more
              </Link>
            </>
          ),
        },
      ],
    },
    {
      college: "RNS Institute of Technology",
      imgSrc: "/images/rns.svg",
      degree: "Bachelor of Engineering, Computer Science",
      location: "Bengaluru, India",
      duration: "Jul 2016 - Aug 2020",
    },
];