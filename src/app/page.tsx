import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StackSection } from "@/components/sections/StackSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <ProjectsSection />
      <StackSection />
      <ContactSection />
    </>
  );
}
