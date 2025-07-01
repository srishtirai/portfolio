// lib/seo-config.ts
import type { Metadata } from 'next'

export const siteConfig = {
  name: "Srishti Rai",
  title: "Srishti Rai - Full Stack Developer | React, Next.js, Spring Boot",
  description: "Full-stack developer specializing in React, Next.js, TypeScript, Spring Boot, and AI. Experienced in automation, UI/UX design, and scalable web applications.",
  url: "https://srishtirai-portfolio.vercel.app",
  image: "/images/about_me.jpeg",
  keywords: [
    "Srishti Rai",
    "Full Stack Developer", 
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Spring Boot",
    "JavaScript",
    "Software Engineer",
    "Boston"
  ],
  social: {
    github: "https://github.com/srishtirai",
    portfolio: "https://www.yourquote.in/srishti-c-rai-m1oj/quotes"
  }
}

export const defaultMetadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords.join(", "),
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${siteConfig.name} Portfolio`,
    images: [{
      url: siteConfig.image,
      width: 1200,
      height: 630,
      alt: siteConfig.name,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.image],
  },
  alternates: {
    canonical: siteConfig.url,
  },
}