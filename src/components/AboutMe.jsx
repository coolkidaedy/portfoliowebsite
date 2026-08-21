import { serif } from "@/lib/academicStyle";

export const AboutMe = () => {
  return (
    <section
      id="about"
      className="px-5 py-4"
      style={{ fontFamily: serif, color: "#000", fontSize: "16px", textAlign: "left" }}
    >
      <h2 className="font-bold mb-3" style={{ fontSize: "24px" }}>
        Summary
      </h2>
      <p className="leading-normal mb-4">
        I&apos;m a student at Columbia University studying Computer Science and Philosophy.
        Currently, I am a Software Engineering Intern at Pinterest in SF working on the Helium
        A/B experiments team. Before that, I worked at a fintech startup and a Korean oatmeal
        startup.
      </p>
      <p className="leading-normal mb-4">
        I am interested in number theory, low-level systems programming, performance programming,
        algorithms, machine learning, computational sound, and probability.
      </p>
      <p className="leading-normal">
        Outside of work, I enjoy playing basketball, listening to music, going to the gym, and
        cooking with friends.
      </p>
    </section>
  );
};
