import type { Metadata } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import { Landscape } from "@/components/background/Landscape";
import { ProgressLine } from "@/components/background/ProgressLine";
import { CustomCursor } from "@/components/background/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Nathan De Sousa — Portfolio",
  description:
    "Computer Science student at University College Cork. Full-stack projects, CTF results, and what I'm building next.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body text-white antialiased">
        <Landscape />
        <ProgressLine />
        <CustomCursor />
        <Navbar />
        <main className="relative z-[2]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
