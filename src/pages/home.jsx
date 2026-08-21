import { HeroSection } from "@/components/HeroSection";
import { AboutMe } from "../components/AboutMe";
import { Experience } from "../components/Experience";
import { ProjectsSection } from "../components/ProjectsSection";
import { BucketList } from "../components/BucketList";
import { Pictures } from "../components/Pictures";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div style={{ maxWidth: "1800px", marginLeft: "auto", marginRight: "auto" }}>
        <main>
          <HeroSection />
          <AboutMe />
          <Experience />
          <ProjectsSection />
          <BucketList />
          <Pictures />
        </main>
        <Footer />
      </div>
    </div>
  );
};
