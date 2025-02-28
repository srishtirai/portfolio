import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navBar"; // Import Navbar globally
import Chatbot from "./components/chatbot";

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
        <NavBar />
        <main className="container mt-20">{children}</main>
        <Chatbot />
      </body>
    </html>
  );
}
