import React, { useState } from 'react';
import { cn } from "@/lib/utils";

const skills = [
    {name: 'Java', catergory: 'back-end'},
    {name: 'Python', catergory: 'back-end'},
    {name: 'JavaScript', catergory: 'front-end'},
    {name: 'C', catergory: 'back-end'},
    {name: 'React', catergory: 'front-end'},
    {name: 'Pandas', catergory: 'back-end'},
    {name: 'NumPy', catergory: 'back-end'},
    {name: 'Scikit-Learn', catergory: 'back-end'},
    {name: 'Bash', catergory: 'back-end'},
    {name: 'HTML/CSS', catergory: 'front-end'},
    {name: 'Git', catergory: 'all'},
    {name: 'Flask', catergory: 'back-end'},
    {name: 'Computational Tree Logic', catergory: 'back-end'},
    {name: 'LaTeX', catergory: 'all'},
    {name: 'Pure Mathematics', catergory: 'all'},
    {name: 'TailwindCSS', catergory: 'front-end'},


    //Java, Python, C, Pandas, NumPy, scikit-learn, Bash, SQL, HTML/CSS, Git, Flask,
//Computational Tree Logic, LaTeX, Pure Mathematics
]
const categories = ["all", "front-end", "back-end"];

export const SkillsSection = () => {
    const [activeCatergory, setActiveCatergory] = useState("all");
    const filteredSkills = skills.filter(
        (skill) => activeCatergory === "all" || skill.catergory === activeCatergory
    );
    
    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    My <span className="text-primary">Skills</span>
                </h2>
                
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category, key) => (
                        <button 
                            key={key} 
                            onClick={() => setActiveCatergory(category)} 
                            className={cn(
                                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                                activeCatergory === category 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-secondary/70 text-foreground hover:bg-secondary"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredSkills.map((skill, key) => (
                        <div 
                            key={key} 
                            className="bg-card p-4 rounded-lg shadow-xs card-hover flex items-center justify-center"
                        >
                            <h3 className="font-medium text-center">{skill.name}</h3>
                        </div>
                    ))}
                </div>     
            </div>
        </section>
    );
};