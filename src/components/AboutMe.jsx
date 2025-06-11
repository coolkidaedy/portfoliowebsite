import { Briefcase, Code, Microscope, User } from "lucide-react";
export const AboutMe = () => {
    return(

     <section id="about" className="py-24 px-4 relative">
        {" "}
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                About <span className="text-primary"> Me</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"> 
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">CS student + AI Researcher</h3>
                <p className="text-muted-foreground">
                I enjoy transforming abstract mathematical concepts into practical solutions. From attending mathematics camps like Ross and HSMC to publishing research on formal verification of AI systems using computational tree logic, I've always pursued the intersection of theory and application. This approach led me to win 1st place at Columbia's Devfest Hackathon with Patent.io—a tool that combines GPT-4, RAG architecture, and vector databases to automate patent application generation.
                </p>
                <p className="text-muted-foreground">Beyond academics, I enjoy watching and playing basketball (go Knicks!), trying new restaurants (love cheap eats), and running around NYC (completed NYC half this March, thinking about NYC full marathon). I also have a passion for pure mathematics, especially in fields like number theory, game theory, and combinatorics.
                </p>
                <p className="text-muted-foreground">
                    I have experience in a variety of programming languages, including Java, Python, C, JavaScript, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                    <a href="#contact" className="cosmic-button">
                        {" "}
                        Get in Touch
                    </a>
                    <a href="" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration 300">
                        {" "}
                        View My Resume
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <div className="gradient-border p-6 card-hover">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                            <Briefcase className="h-6 w-6 text-primary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg">Incoming SWE Intern at Sumly</h4>
                            <p className="text-muted-foreground">
                            Summer intern at Sumly, a fintech startup creating an AI-powered expense tracking mobile platform for the self-employed.
                            </p>

                        </div>

                    </div>
                </div>
                <div className="gradient-border p-6 card-hover">
                <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                            <Briefcase className="h-6 w-6 text-primary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg">Front-End SWE Intern at Gamsa Foods </h4>
                            <p className="text-muted-foreground">
                            Engineered interactive web application with HTML, CSS, and JavaScript.
                            </p>

                        </div>

                    </div>
                </div>
                <div className="gradient-border p-6 card-hover">
                <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                            <Microscope className="h-6 w-6 text-primary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg">AI Researcher</h4>
                            <p className="text-muted-foreground">
                                First-authored published research on applying mathematical logic formulas to distributed AI bioinformatics systems.
                            </p>

                        </div>

                    </div>
                </div>

            </div>
            </div>
        </div>

    </section>
    );
};
