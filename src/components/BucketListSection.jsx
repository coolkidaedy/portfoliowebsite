import { CheckSquare, Square } from "lucide-react";

// Edit this list to manage your SF bucket list.
// Add an item: append an object with a new id, your text, and done: false.
// Mark something finished: change its done from false to true.
const bucketList = [
    { id: 1, text: "Pintern hangout", done: false },
    { id: 2, text: "Visit Palo Alto", done: false },
    { id: 3, text: "Golden Gate Bridge", done: false },
    { id: 4, text: "Mission Dolores Park", done: true },
    { id: 5, text: "Return offer", done: false },
    { id: 6, text: "Go on a date", done: false },
    { id: 7, text: "Ask for someone's number", done: false },
    { id: 8, text: "Go out", done: false },
    { id: 9, text: "VC event", done: false },
    { id: 10, text: "Drinks in Mission", done: false },
    { id: 11, text: "Visit Berkeley", done: false },
    { id: 12, text: "Twin Peaks", done: false },
    { id: 13, text: "Big Sur", done: false },
    { id: 14, text: "Yosemite", done: false },
    { id: 15, text: "Redwoods", done: false },
    { id: 16, text: "Visit Sausalito", done: false },
    { id: 17, text: "Sunday dinner for new people", done: false },
    { id: 18, text: "Bike to work", done: false },
    { id: 19, text: "Painted Ladies", done: false },
    { id: 20, text: "The Lands End trail", done: false },
    { id: 21, text: "Ride a trolley", done: false },
    { id: 22, text: "Chinatown", done: true },
    { id: 23, text: "In office most days", done: false },
    { id: 24, text: "Learn how to mix", done: false },
    { id: 25, text: "Lombard Street & Russian Hill", done: false },
    { id: 26, text: "Alcatraz", done: false },
    { id: 27, text: "Visit 5 offices that aren't Pinterest", done: false },
    { id: 28, text: "Visit Neena in LA", done: false },
    { id: 29, text: "Visit Kelvin's house", done: false },
    { id: 30, text: "Do a hackathon", done: false },
    { id: 31, text: "La Taqueria", done: true },
    { id: 32, text: "Must-try SF food", done: false },
    { id: 33, text: "Outdoor basketball", done: false },
    { id: 34, text: "Go to a club", done: false },
    { id: 35, text: "Attend startup school parties", done: false },
    { id: 36, text: "Meet a founder", done: false },
    { id: 37, text: "Bi-Rite Creamery", done: false },
    { id: 38, text: "Tartine", done: false },
    { id: 39, text: "House of Prime Rib", done: false },
    { id: 40, text: "Sunset skyline from Bernal Heights", done: false },
    { id: 41, text: "Make friends w/ other interns", done: false },
    { id: 42, text: "Meet someone from every state!", done: false },
    { id: 43, text: "Rank office food in SF", done: false },
    { id: 44, text: "Spam Beli", done: false },
    { id: 45, text: "Go to the gym", done: false },
    { id: 46, text: "Finish intern project", done: false },
    { id: 47, text: "Learn new technologies", done: false },
    { id: 48, text: "Build something cool", done: false },
    { id: 49, text: "Minimize time spent in room", done: false },
    { id: 50, text: "Meet up with CORE", done: false },
    { id: 51, text: "Meet old friends", done: false },
    { id: 52, text: "Mount Tamalpais State Park", done: false },
    { id: 53, text: "In-N-Out", done: false },
    { id: 54, text: "Swim in a beach", done: false },
    { id: 55, text: "Ride in a Waymo", done: false },
    { id: 56, text: "Japantown", done: false },
    { id: 57, text: "Golden Gate Park", done: false },
    { id: 58, text: "Presidio", done: true },
    { id: 59, text: "Marin Headlands hike", done: false },
    { id: 60, text: "Santa Cruz / Capitola beaches", done: false },
    { id: 61, text: "Castro neighborhood", done: false },
    { id: 62, text: "Ferry Building", done: false },
    { id: 63, text: "SF MoMA", done: false },
    { id: 64, text: "Fisherman's Wharf", done: false },
    { id: 65, text: "Ocean Beach", done: false },
];

export const BucketListSection = () => {
    const completed = bucketList.filter((item) => item.done).length;

    return (
        <section id="bucket-list" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    San Francisco <span className="text-primary"> Bucket List</span>
                </h2>
                <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
                    A running list of things I want to do around SF
                </p>
                <p className="text-center text-primary font-medium mb-12">
                    {completed} / {bucketList.length} completed
                </p>
                <ul className="space-y-3">
                    {bucketList.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center gap-3 p-4 gradient-border card-hover text-left"
                        >
                            {item.done ? (
                                <CheckSquare className="h-5 w-5 text-primary shrink-0" />
                            ) : (
                                <Square className="h-5 w-5 text-muted-foreground shrink-0" />
                            )}
                            <span className={item.done ? "line-through text-muted-foreground" : "text-foreground"}>
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
