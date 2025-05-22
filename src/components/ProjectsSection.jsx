import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
{
    id: 1,
    title: "Patent.io",
    description: "This AI platform automates patent filing by generating required forms from user inputs and uses a vector database of U.S. patents to identify similar existing patents, helping users avoid unnecessary application fees.",
    image: "/projects/patentprojject.png",
    tags: ["Python", "JavaScript", "FAISS Vector Database", "RAG"],
    githubUrl: "https://github.com/coolkidaedy/Patent-Automation-Agent",
},
{
    id: 2,
    title: "March Madness Predictor",
    description: "a machine learning algorithm that predicts NCAA Tournament outcomes by leveraging RandomForest algorithms",
    image: "/projects/mlmarch.png",
    tags: ["Python", "Random Forest", "Pandas", "Numpy", "Scikit-learn"],
    githubUrl: "",
},
{
    id: 3,
    title: "Distributed AI Research",
    description: "This research project performs a verification of distributed AI system architectures in bioinformatics applications. First-authored paper and presented at research symposium.",
    image: "/projects/research.png",
    tags: ["Java", "C++", "LaTex", "Computational Tree Logic",],
    githubUrl: "https://arxiv.org/abs/2302.04389",
},
{
    id: 4,
    title: "Portfolio Website",
    description: "This portfolio website showcases my projects and skills, built with React and Tailwind CSS.",
    image: "/projects/website.png",
    tags: ["React", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/coolkidaedy/portfoliowebsite",
},
{
    id: 5,
    title: "Minishell",
    description: "A simple shell implementation in C, designed to handle basic shell functionalities like command execution, piping, and redirection.",
    image: "projects/minishell.png",
    tags: ["C", "Git", "Unix", "Makefile"],
    githubUrl: "https://gist.github.com/coolkidaedy/901eae34f0f6f5266c991bbc12d94b54",
},
{
    id: 6,
    title: "Gamsa Foods' Website",
    description: "A website for a Korean Oatmeal startup, Gamsa Foods, showcasing their products with animations and interactive UI.",
    image: "projects/gamsa.png",
    tags: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://gamsafoods.com/",
},
];

export const ProjectsSection = () => {
    return (
    <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Featured <span className="text-primary"> Projects </span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Here are some of my projects that showcase my skills and experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project,key) => (
                    <div key={key} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col">
                        <div className="h-48 overflow-hidden">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        
                            <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 flex-grow">
                                {project.description}
                            </p>
                            
                            {/* GitHub link stays at bottom */}
                            <div className="mt-auto">
                                <a href={project.githubUrl} target="_blank" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300">
                                     <Github size={20}/>
                                     <span className="text-sm">
                                         {project.id === 3 ? "Research Paper Link" : "GitHub Link"}
                                     </span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <a className="cosmic-button w-fit flex items-center mx-auto gap-2" href="https://github.com/coolkidaedy"
                target="_blank">
                    Check out my GitHub <ArrowRight size={16} />
                </a>
            </div>
        </div>
    </section>
    );
};