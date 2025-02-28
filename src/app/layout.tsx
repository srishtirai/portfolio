import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar"; // Import Navbar globally

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
        <NavBar /> {/* Navbar is always present */}
        <main className="container mt-20">{children}</main>
      </body>
    </html>
  );
}
