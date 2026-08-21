import { linkStyle, serif } from "@/lib/academicStyle";

const projects = [
  {
    id: 1,
    title: "One Billion Row Challenge",
    description:
      "Optimized a 1-billion-row aggregation from a single-threaded baseline into a lock-free work-stealing map-reduce, cutting runtime from 80s to 6s.",
    links: [{ label: "github", url: "https://github.com/coolkidaedy/1brc-cpp" }],
  },
  {
    id: 2,
    title: "Columbia Carpools",
    description:
      "Launched a ride-sharing platform for Columbia students with 260+ users and 50+ coordinated airport rides.",
    links: [{ label: "github", url: "https://github.com/coolkidaedy/columbiacarpools" }],
  },
  {
    id: 3,
    title: "Low-Level Systems & Performance Projects",
    description:
      "Built a set of low-level systems tools in C/C++, including a custom memory allocator, a LRU/LFU cache, and a parallelized file-search utility.",
    links: [{ label: "code", url: "https://gist.github.com/coolkidaedy/5852e23a4bf5e9c10d8390747ec823a2.js" }],
  },
  {
    id: 4,
    title: "Patent.io",
    description:
      "Built a app that uses GPT, RAG, and a vector database of 100,000 U.S. patents to help small businesses draft patents. Won 1st place at Columbia's DevFest Hackathon.",
    links: [{ label: "github", url: "https://github.com/coolkidaedy/Patent-Automation-Agent" }],
  },
  {
    id: 5,
    title: "ML March Madness Predictor",
    description:
      "Built an end-to-end Random Forest pipeline over 15 years of NCAA tournament data and 15+ statistical factors, reaching 82.5% prediction accuracy.",
    links: [{ label: "github", url: "https://github.com/coolkidaedy/MLMarchMadness" }],
  },
  {
    id: 6,
    title: "LED Chessboard",
    description:
      "Built an LED chessboard on an Arduino Uno that shows legal chess moves in real time, demoed live to 300+ scholars and faculty.",
    links: [
      { label: "github", url: "https://github.com/coolkidaedy/AOE-Chessboard-Forked" },
      { label: "video", url: "https://youtu.be/IvCtMuGfCxs?si=GrijzNK1JgQM3oS5" },
    ],
  },
  {
    id: 7,
    title: "Distributed AI Research",
    description:
      "First-authored a paper on distributed AI verification in bioinformatics using Computation Tree Logic, presented to 100+ researchers.",
    links: [{ label: "paper", url: "https://arxiv.org/abs/2302.04389" }],
  },
  {
    id: 8,
    title: "Computational Sound",
    description:
      "Hosted an algorave for a class final, teaching Columbia students to live-code music in Strudel.",
    links: [{ label: "video", url: "https://youtu.be/K4-Eb8QL1Dw?si=nSW94DRWy2LDf2h2" }],
  },
  {
    id: 9,
    title: "Minishell",
    description:
      "A Unix shell implementation in C supporting command execution, piping, redirection, and environment variable management.",
    links: [{ label: "code", url: "https://gist.github.com/coolkidaedy/901eae34f0f6f5266c991bbc12d94b54" }],
  },
  {
    id: 10,
    title: "Gamsa Foods Website",
    description:
      "Website for a Korean Oatmeal startup showcasing their products with animations and interactive UI elements.",
    links: [],
  },
];

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="px-5 py-4"
      style={{ fontFamily: serif, color: "#000", fontSize: "16px", textAlign: "left" }}
    >
      <h2 className="font-bold mb-3" style={{ fontSize: "24px" }}>
        Projects
      </h2>
      <ul className="leading-normal" style={{ listStyleType: "disc", paddingLeft: "1.4em" }}>
        {projects.map((project) => (
          <li key={project.id} className="mb-2">
            <strong>{project.title}</strong> - {project.description}
            {project.links.length > 0 && (
              <>
                {" "}
                (
                {project.links.map((l, i) => (
                  <span key={l.label}>
                    {i > 0 && " · "}
                    <a href={l.url} target="_blank" rel="noreferrer" style={linkStyle}>
                      {l.label}
                    </a>
                  </span>
                ))}
                )
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
