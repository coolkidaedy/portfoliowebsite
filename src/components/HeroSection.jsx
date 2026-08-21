import { linkStyle, serif } from "@/lib/academicStyle";

export const HeroSection = () => {
  return (
    <header
      id="hero"
      className="px-5 pt-6 pb-4"
      style={{ fontFamily: serif, color: "#000", fontSize: "16px", textAlign: "left" }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="font-bold mb-3" style={{ fontSize: "32px" }}>
            Aedin Pereira
          </h1>
          <p className="leading-normal">
            Student, Computer Science
            <br />
            Columbia University
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-3 items-start md:items-start">
          <div id="contact" className="leading-normal text-left md:text-right">
            <p>Contact information:</p>
            <p>
              GitHub:{" "}
              <a href="https://github.com/coolkidaedy" target="_blank" rel="noreferrer" style={linkStyle}>
                @coolkidaedy
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/aedin-pereira/"
                target="_blank"
                rel="noreferrer"
                style={linkStyle}
              >
                aedin-pereira
              </a>
            </p>
            <p>Email: ap4672 at columbia dot edu</p>
            <p className="mt-2">New York, NY</p>
          </div>

          <img
            src="/assets/BE68F8ED-DDDD-4751-8EE8-AC04FDA8FBF1_1_105_c.jpeg"
            alt="Aedin Pereira"
            width={196}
            height={186}
            className="object-cover shrink-0"
            style={{ width: "196px", height: "186px", border: "0" }}
          />
        </div>
      </div>

      <nav className="mt-2">
        [{" "}
        <a href="#about" style={linkStyle}>
          about
        </a>{" "}
        &ndash;{" "}
        <a href="#experience" style={linkStyle}>
          experience
        </a>{" "}
        &ndash;{" "}
        <a href="#projects" style={linkStyle}>
          projects
        </a>{" "}
        &ndash;{" "}
        <a href="#bucketlist" style={linkStyle}>
          bucket list
        </a>{" "}
        &ndash;{" "}
        <a href="#pictures" style={linkStyle}>
          pictures
        </a>{" "}
        &ndash;{" "}
        <a href="#contact" style={linkStyle}>
          contact
        </a>{" "}
        ]
      </nav>
    </header>
  );
};
