import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "@/components/HeroSection";
import { AboutMe } from "../components/AboutMe";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
    return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* theme toggle */}
            <ThemeToggle />
        {/*background effect*/}
            <StarBackground />
        
        {/* Navbar */}
            <Navbar />

        {/* Main content */}
        <main>
          <HeroSection />
          <AboutMe /> 
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />

        </main>
        <Footer />

        {/* Footer */}

    </div>
    );
};