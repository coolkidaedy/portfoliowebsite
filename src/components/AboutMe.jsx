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
                <h3 className="text-2xl font-semibold">Computer Science and Philosophy Student</h3>
                <p className="text-muted-foreground">
                I'm Aedin, a CS & Philosophy student at Columbia Engineering. My background is a mix of theoretical mathematics and hands-on software development across full-stack, ML, and AI systems.
I'm looking to join an early-stage startup where I can take ownership and build things that matter. I like hard problems and fast-moving environments.
                </p>
                <p className="text-muted-foreground">Beyond academics, I enjoy watching and playing basketball (go Nets!!), trying new restaurants (love cheap eats), and running around NYC (completed NYC half this March, thinking about NYC full marathon). I also have a passion for pure mathematics, especially in fields like number theory, game theory, and combinatorics.
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
                            <h4 className="font-semibold text-lg">Software Engineering Intern at Sumly</h4>
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
                            <h4 className="font-semibold text-lg">Software Engineer Intern at Gamsa Foods </h4>
                            <p className="text-muted-foreground">
                            Engineered interactive web application with HTML, CSS, and JavaScript for CPG backed startup.
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
                            <h4 className="font-semibold text-lg">Counselor/Scholar at The Ross Mathematics Program</h4>
                            <p className="text-muted-foreground">
                                Proved many number theory, combinatorics, and analysis theorems. Helped 4 students conquer an introductory course in Number Theory. 
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
