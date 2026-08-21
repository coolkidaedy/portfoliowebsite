import { serif } from "@/lib/academicStyle";

// Checked state is baked into the source (the `done` flag below) rather
// than being clickable on the live site — this is a static, no-backend
// portfolio, so the only real way to make this "editable by owner only" is
// to make it read-only for visitors and have the owner flip `done` here
// and redeploy. To mark something complete, set done: true.
const items = [
  { id: "visit-neena-la", text: "Visit Neena in LA", done: true },
  { id: "pintern-hangout", text: "Pintern hangout", done: true },
  { id: "visit-palo-alto", text: "Visit Palo Alto", done: false },
  { id: "mission-dolores-park", text: "Mission Dolores Park", done: true },
  { id: "return-offer", text: "Return offer", done: false },
  { id: "go-out", text: "Go out", done: true },
  { id: "vc-event", text: "VC event", done: true },
  { id: "drinks-mission", text: "Drinks in Mission", done: true },
  { id: "visit-berkeley", text: "Visit Berkeley", done: true },
  { id: "golden-gate-bridge", text: "Golden Gate Bridge", done: true },
  { id: "twin-peaks", text: "Twin Peaks", done: false },
  { id: "big-sur", text: "Big Sur", done: false },
  { id: "yosemite", text: "Yosemite", done: false },
  { id: "redwoods", text: "Redwoods", done: true },
  { id: "visit-sausalito", text: "Visit Sausalito", done: true },
  { id: "sunday-dinner", text: "Sunday dinner for new people", done: true },
  { id: "bike-to-work", text: "Bike to work", done: true },
  { id: "painted-ladies", text: "Painted Ladies", done: true },
  { id: "lands-end-trail", text: "The Lands End Trail", done: true },
  { id: "ride-trolley", text: "Ride a trolley", done: false },
  { id: "chinatown", text: "Chinatown", done: true },
  { id: "in-office-most-days", text: "In office most days", done: true },
  { id: "learn-mix", text: "Learn how to mix", done: true },
  { id: "lombard-russian-hill", text: "Lombard Street & Russian Hill", done: true },
  { id: "alcatraz", text: "Alcatraz", done: false },
  { id: "visit-5-offices", text: "Visit 5 offices that aren't Pinterest", done: false },
  { id: "hackathon", text: "Do a hackathon", done: true },
  { id: "la-taqueria", text: "La Taqueria", done: true },
  { id: "must-try-sf-food", text: "Must-try SF food", done: true },
  { id: "outdoor-basketball", text: "Outdoor basketball", done: true },
  { id: "go-to-club", text: "Go to a club", done: true },
  { id: "startup-school-parties", text: "Attend Startup School parties", done: true },
  { id: "meet-founder", text: "Meet a founder", done: true },
  { id: "bi-rite-creamery", text: "Bi-Rite Creamery", done: true },
  { id: "tartine", text: "Tartine", done: true },
  { id: "house-of-prime-rib", text: "House of Prime Rib", done: false },
  { id: "sunset-bernal-heights", text: "Sunset skyline from Bernal Heights", done: false },
  { id: "friends-other-interns", text: "Make friends w/ other interns", done: true },
  { id: "meet-every-state", text: "Meet someone from every state!", done: false },
  { id: "rank-office-food", text: "Rank office food in SF", done: true },
  { id: "spam-beli", text: "Spam beli", done: true },
  { id: "go-to-gym", text: "Go to the gym", done: true },
  { id: "finish-intern-project", text: "Finish intern project", done: true },
  { id: "learn-new-tech", text: "Learn new technologies", done: true },
  { id: "build-something-cool", text: "Build something cool", done: true },
  { id: "meet-up-core", text: "Meet up with CORE", done: true },
  { id: "meet-old-friends", text: "Meet old friends", done: true },
  { id: "mount-tam", text: "Mount Tamalpais State Park", done: false },
  { id: "in-n-out", text: "In-N-Out", done: true },
  { id: "swim-beach", text: "Swim in a beach", done: true },
  { id: "ride-waymo", text: "Ride in a Waymo", done: true },
];

export const BucketList = () => {
  return (
    <section
      id="bucketlist"
      className="px-5 py-4"
      style={{ fontFamily: serif, color: "#000", fontSize: "16px", textAlign: "left" }}
    >
      <h2 className="font-bold mb-3" style={{ fontSize: "24px" }}>
        SF Summer Bucket List
      </h2>
      <ul
        className="leading-normal"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          columnWidth: "220px",
          columnGap: "24px",
        }}
      >
        {items.map((item) => (
          <li key={item.id} className="mb-1" style={{ breakInside: "avoid" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <input
                type="checkbox"
                checked={item.done}
                disabled
                readOnly
                style={{ marginTop: "4px" }}
              />
              <span
                style={{
                  textDecoration: item.done ? "line-through" : "none",
                  color: item.done ? "#888" : "#000",
                }}
              >
                {item.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};
