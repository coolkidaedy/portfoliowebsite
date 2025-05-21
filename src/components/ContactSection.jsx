import { Linkedin, Mail, MapPin } from "lucide-react";

export const ContactSection = () => {
return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Get in <span className="text-primary"> Touch</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                I am always open to discussing new projects, ideas or opportunities. 
                Feel free to reach out to me.
            </p>
            
            {/* Centered contact information */}
            <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold mb-6 text-center">Contact Information</h3>
                
                <div className="space-y-8">
                    {/* Email - centered */}
                    <div className="flex flex-col items-center text-center">
                        <div className="p-3 rounded-full bg-primary/10 mb-3">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="font-medium">Email</h4>
                        <a href="mailto:ap4672 [at] columbia [dot] edu" className="text-muted-foreground hover:text-primary transition-colors">
                            ap4672 [at] columbia [dot] edu
                        </a>
                    </div>
                    
                    {/* Location - centered */}
                    <div className="flex flex-col items-center text-center">
                        <div className="p-3 rounded-full bg-primary/10 mb-3">
                            <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="font-medium">Location</h4>
                        <span className="text-muted-foreground">
                            New York, NY, United States
                        </span>
                    </div>

                    {/* LinkedIn - already centered */}
                    <div className="pt-8 text-center">
                        <h4 className="font-medium mb-4">Connect With Me</h4>
                        <div className="flex justify-center">
                            <a href="https://www.linkedin.com/in/aedin-pereira/"
                            target="_blank" className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                                <Linkedin className="h-6 w-6 text-primary" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
};