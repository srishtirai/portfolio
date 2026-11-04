export const experience = [
    {
      company: "Topline",
      imgSrc: "/images/topline.png",
      location: "",
      roles: [{
        title: "Software Engineer II",
        duration: "Aug 2025 – Present",
        projects: [
          { title: "Invoicing & payments architecture", description: "Drove the re-architecture of invoicing and quoting from Stripe to an internal database, enabling native fee calculation, per-company feature rollout, and payment-provider flexibility.", techStack: "Python · Stripe integration · Celery · Django · PostgreSQL · React · Pydantic AI · Langfuse" },
          { title: "QuickBooks Online integration", description: "Built an integration that automated invoice synchronization and payout reconciliation, enabling seamless bookkeeping workflows across the platform.", techStack: "QuickBooks Online integration · Authentication · Webhook integrations" },
          { title: "Mobile app: architecture to production", description: "Built the React Native app from early architecture through production launch, establishing shared component patterns and CI/CD foundations. Delivered payments onboarding, invoicing, jobs, contacts, settings, and a tap-to-pay feature.", techStack: "React Native · Tap to Pay SDK · Tamagui · Ably" },
          { title: "AI Voice sales product", description: "Architected and developed conversation workflows, inbound lead qualification, and outbound calling. Connected post-call webhooks to the booking pipeline to power AI-driven sales workflows.", techStack: "AI Voice · Webhooks · Automation · Twilio / SendGrid integration" },
        ],
      }],
    },
    {
      company: "Sentinel Group",
      imgSrc: "/images/sentinel.svg",
      location: "Wakefield, MA",
      roles: [
        {
          title: "Software Development Co-op",
          duration: "May 2024 - Dec 2024",
          projects: [
            {
              title: "Automated Folder Management System",
              description:
                "Built an automation system for folder management using Nest.js, integrating compliance monitoring and a user-friendly Next.js admin panel with TDD for maintainability.",
              techStack: "TypeScript, Next.js, Tailwind CSS, Postgres, Nest.js, AWS (EC2)",
            },
          ],
        },
      ],
    },
    {
      company: "LG Soft India",
      imgSrc: "/images/lg.svg",
      location: "Bengaluru, India",
      roles: [
        {
          title: "Research Engineer",
          duration: "Jul 2021 - Aug 2023",
          projects: [
            {
              title: "OTA Updates Portal & Battery Management System",
              description:
                "Developed an application to manage and monitor battery statuses & firmware updates. Used React for the frontend, modular components for reusability, and secure APIs for authentication.",
              techStack: "React, Redux, Docker, AWS (S3, IAM), SASS, Java, Spring Boot, ChartJS, AGGrid",
            },
          ],
        },
        {
          title: "Software Engineer",
          duration: "Jul 2020 - Jul 2021",
          projects: [
            {
              title: "TV, Signage, & Entertainment System Development",
              description:
                "Worked on the webOS ecosystem, developing gallery and calendar apps using EnactJS for TVs and signage. Built a Flutter proof-of-concept for network and Bluetooth-based features.",
              techStack: "React, Redux, EnactJS, CSS, WebOS",
            },
          ],
        },
        {
          title: "Web Development Intern",
          duration: "Mar 2020 - Jun 2020",
          projects: [
            {
              title: "EnactJS & webOS Development",
              description:
                "Explored modern web development with EnactJS, contributing to webOS services and UI accessibility improvements.",
              techStack: "React, Redux, EnactJS, CSS, WebOS",
            },
          ],
        },
      ],
    },
  ];