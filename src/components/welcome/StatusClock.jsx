import { useEffect, useState } from "react";

// Bottom-left live clock + status line, persistent across the welcome scene.
export const StatusClock = () => {
  const [time, setTime] = useState("--:--:-- --");

  useEffect(() => {
    function tick() {
      const now = new Date();
      const h12 = ((now.getHours() + 11) % 12) + 1;
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${h12}:${mm}:${ss} ${ampm}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="status-clock pointer-events-none absolute bottom-[21px] left-[21px] text-base uppercase leading-tight hidden sm:block"
      style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-mute)" }}
    >
      <p>{time}</p>
    </div>
  );
};
