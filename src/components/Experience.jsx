import { serif } from "@/lib/academicStyle";

const experiences = [
  {
    id: "pinterest",
    role: "Software Engineer Intern",
    org: "Pinterest",
    summary:
      "Built MCP endpoints and a distributed data-observability framework for Pinterest's A/B testing platform, which handles 10+ TB of data daily.",
  },
  {
    id: "sumly",
    role: "Software Engineer Intern",
    org: "Sumly",
    summary:
      "Built an AI-powered expense tracking app, including a RAG pipeline that classified transactions with 90% accuracy, saving clients $2,300 annually.",
  },
  {
    id: "gamsa",
    role: "Software Engineer Intern",
    org: "Gamsa Foods",
    summary:
      "Built the Korean-oatmeal startup's full website, increasing site traffic by 76%.",
  },
  {
    id: "texas-state",
    role: "AI/ML Research Intern",
    org: "Texas State University",
    summary:
      "Led a team of 3 undergraduate researchers to formally verify AI system architectures with Computation Tree Logic, first-authoring a paper on distributed AI verification in bioinformatics presented to 100+ researchers at the Mathworks research symposium.",
  },
  {
    id: "ross",
    role: "Junior Counselor & Scholar",
    org: "Ross Mathematics Program",
    summary:
      "Selected as 1 of 14 junior counselors for an intensive six-week math camp, engaged daily in lectures and problem sets on game theory, number theory, and graph theory, and curated and presented lectures on measure theory to 30+ participants.",
  },
  {
    id: "hsmc",
    role: "Counselor & Scholar",
    org: "The Honors Summer Math Camp",
    summary:
      "Selected as counselor for the Number Theory course, planned daily lectures for 35+ students, rigorously proved 70+ real analysis, 50+ number theory, and 40+ combinatorics theorems, and guided 8 students through an advanced number theory course.",
  },
];

export const Experience = () => {
  return (
    <section
      id="experience"
      className="px-5 py-4"
      style={{ fontFamily: serif, color: "#000", fontSize: "16px", textAlign: "left" }}
    >
      <h2 className="font-bold mb-3" style={{ fontSize: "24px" }}>
        Experience
      </h2>
      <ul className="leading-normal" style={{ listStyleType: "disc", paddingLeft: "1.4em" }}>
        {experiences.map((exp) => (
          <li key={exp.id} className="mb-2">
            <strong>{exp.org}</strong>, {exp.role} - {exp.summary}
          </li>
        ))}
      </ul>
    </section>
  );
};
