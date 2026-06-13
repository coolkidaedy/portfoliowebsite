import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { BucketListSection } from "../components/BucketListSection";
import { Footer } from "../components/Footer";

export const BucketList = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* theme toggle */}
            <ThemeToggle />
            {/* background effect */}
            <StarBackground />

            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="pt-20">
                <BucketListSection />
            </main>

            <Footer />
        </div>
    );
};
