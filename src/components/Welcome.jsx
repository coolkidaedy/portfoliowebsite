import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Starfield } from "@/components/welcome/Starfield";
import { ConstellationField } from "@/components/welcome/ConstellationField";
import { ShootingStars } from "@/components/welcome/ShootingStars";
import { WelcomeHero } from "@/components/welcome/WelcomeHero";
import { WelcomeCursor } from "@/components/welcome/WelcomeCursor";
import { StatusClock } from "@/components/welcome/StatusClock";

// Welcome scene — ported from the example site's DarkScene layout +
// welcome components (Starfield, ConstellationField, ShootingStars,
// WelcomeHero, WelcomeCursor, StatusClock). Rendered here as a
// full-viewport overlay (rather than a separate route) since this project
// is a single-page app.
export const Welcome = ({ onExplore }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleExplore = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(onExplore, 500);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Enter") handleExplore();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 ease-out",
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      style={{ background: "var(--color-ink)", color: "var(--color-ink-inverted)" }}
    >
      <div className="relative min-h-dvh overflow-hidden">
        <Starfield />
        <ConstellationField />
        <ShootingStars />
        <WelcomeHero onExplore={handleExplore} />
        <WelcomeCursor />
        <StatusClock />
      </div>
    </div>
  );
};
