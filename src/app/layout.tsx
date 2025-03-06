import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Welcome to my portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Analytics/>
        <NavBar />
        <main className="mx-[10px] mt-[80px] sm:mx-[60px] sm:mt-[100px] md:mx-[80px] md:mt-[120px]">{children}</main>
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
