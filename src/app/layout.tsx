import { defaultMetadata } from "@/lib/seo-config";
import "./globals.css";
import NavBar from "@/components/NavBar";
// import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Analytics/>
        <SpeedInsights/>
        <NavBar />
        <div className="site-content">{children}</div>
        {/* <Chatbot /> */}
        <Footer />
      </body>
    </html>
  );
}
