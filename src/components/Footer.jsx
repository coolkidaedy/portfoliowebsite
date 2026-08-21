import { serif } from "@/lib/academicStyle";

export const Footer = () => {
  return (
    <footer
      className="px-5 py-6"
      style={{ fontFamily: serif, color: "#000", fontSize: "16px", textAlign: "left" }}
    >
      &copy; 2026 Aedin Pereira
    </footer>
  );
};
