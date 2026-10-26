import DigitalTwinChat from "./components/DigitalTwinChat";
import MobileNav from "./components/MobileNav";

const linkedin = "https://www.linkedin.com/in/abdullahfareedeng";
const email = "mailto:abdullahfareedssuet@gmail.com";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span className="section-label-number">{number}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <div className="shell header-inner">
          <a
            href="#top"
            className="brand"
            aria-label="Abdullah Fareed, back to top"
          >
            <span className="brand-mark">
              AF<span>.</span>
            </span>
            <span className="brand-divider" />
            <span className="brand-name">
              ABDULLAH
              <br />
              FAREED
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#journey">Journey</a>
            <a href="#work">Selected work</a>
            <a href="#portfolio">Portfolio</a>
          </nav>
          <a className="header-contact" href={email}>
            Let&apos;s connect <Arrow diagonal />
          </a>
          <MobileNav />
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="shell hero-content">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="live-dot" /> AI ENGINEER{" "}
              <span className="eyebrow-slash">/</span> KARACHI, PK
            </div>
            <h1 id="hero-title">
              Digital thinking.
              <br />
              <span>Human impact.</span>
            </h1>
            <p className="hero-lede">
              I&apos;m Abdullah Fareed. I build considered interfaces and
              explore how emerging technology can make everyday experiences
              better.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-primary">
                Explore my work <Arrow diagonal />
              </a>
              <a href="#about" className="text-link">
                Get to know me <Arrow />
              </a>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Abstract graphic representing design and engineering"
          >
            <div className="art-corner art-corner-tl" />
            <div className="art-corner art-corner-br" />
            <div className="art-topline">
              <span>DESIGN × ENGINEERING</span>
              <span>001 / AF</span>
            </div>
            <div className="art-rings">
              <div className="ring ring-one" />
              <div className="ring ring-two" />
              <div className="ring ring-three" />
              <div className="ring-cross ring-cross-h" />
              <div className="ring-cross ring-cross-v" />
              <div className="ring-core">
                A<span>F</span>
                <i>.</i>
              </div>
              <span className="orbit-point orbit-point-one" />
              <span className="orbit-point orbit-point-two" />
            </div>
            <div className="art-bottomline">
              <span>CURIOUS BY DEFAULT</span>
              <span>37° N / WHAT&apos;S NEXT →</span>
            </div>
          </div>
          <div className="hero-bottom">
            <span>
              SOFTWARE ENGINEERING STUDENT
              <br />
              SIR SYED UNIVERSITY
            </span>
            <span className="hero-scroll">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </span>
            <span>
              AVAILABLE FOR INTERNSHIP
              <br />
              OPPORTUNITIES
            </span>
          </div>
        </div>
      </section>

      <section id="about" className="about section-pad">
        <div className="shell">
          <SectionLabel number="01">THE PERSON BEHIND THE PIXELS</SectionLabel>
          <div className="about-layout">
            <div className="about-heading">
              <h2>
                Curiosity is
                <br />
                my{" "}
                <em>
                  operating
                  <br />
                  system.
                </em>
              </h2>
              <div className="heading-rule">
                <span>AF / 2026</span>
                <span>↗</span>
              </div>
            </div>
            <div className="about-body">
              <p className="intro-paragraph">
                I&apos;I'm an AI Engineer and Developer passionate about
                building intelligent applications and innovative software
                solutions. I enjoy turning ambitious ideas into practical,
                user-friendly digital products.
              </p>
              <p>
                My work lives at the intersection of clean design and thoughtful
                engineering. I build responsive web applications with React.js
                and modern frontend tools, with a focus on making experiences
                feel intuitive from the first interaction.
              </p>
              <p>
                I&apos;m also learning AI engineering and exploring how
                intelligent systems can fit naturally into the products people
                use every day.
              </p>
              <a
                href={linkedin}
                className="inline-link"
                target="_blank"
                rel="noreferrer"
              >
                More about me on LinkedIn <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="about-facts">
            <div>
              <span className="fact-index">01 / BASE</span>
              <strong>Karachi, Pakistan</strong>
            </div>
            <div>
              <span className="fact-index">02 / FOCUS</span>
              <strong>Frontend &amp; product thinking</strong>
            </div>
            <div>
              <span className="fact-index">03 / NEXT</span>
              <strong>AI-powered experiences</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="journey" className="journey section-pad">
        <div className="shell">
          <div className="section-top">
            <SectionLabel number="02">THE JOURNEY SO FAR</SectionLabel>
            <span className="section-aside">
              LEARNING / BUILDING / EVOLVING
            </span>
          </div>
          <div className="journey-intro">
            <h2>
              Always in
              <br />
              <span>motion.</span>
            </h2>
            <p>
              A path shaped by engineering fundamentals, hands-on frontend work,
              and a growing interest in what AI can make possible.
            </p>
          </div>
          <div className="timeline">
            <article className="timeline-item">
              <div className="timeline-marker">
                <span>01</span>
              </div>
              <div className="timeline-meta">
                2022 — 2026
                <br />
                FOUNDATION
              </div>
              <div className="timeline-content">
                <h3>Software engineering</h3>
                <p>
                  Bachelor&apos;s degree at Sir Syed University of Engineering
                  &amp; Technology, building the technical foundation behind my
                  work.
                </p>
              </div>
              <span className="timeline-glyph">↗</span>
            </article>
            <article className="timeline-item">
              <div className="timeline-marker">
                <span>02</span>
              </div>
              <div className="timeline-meta">
                ONGOING
                <br />
                CRAFT
              </div>
              <div className="timeline-content">
                <h3>Frontend development</h3>
                <p>
                  Developing responsive, user-focused web experiences with
                  React.js, Tailwind CSS, Material UI, Firebase, and the MERN
                  stack.
                </p>
              </div>
              <span className="timeline-glyph">↗</span>
            </article>
            <article className="timeline-item">
              <div className="timeline-marker">
                <span>03</span>
              </div>
              <div className="timeline-meta">
                FINAL YEAR
                <br />
                APPLICATION
              </div>
              <div className="timeline-content">
                <h3>Neighbour Alerts</h3>
                <p>
                  Working on a community safety platform that brings
                  location-based incident reporting and interactive mapping into
                  one place.
                </p>
              </div>
              <span className="timeline-glyph">↗</span>
            </article>
            <article className="timeline-item">
              <div className="timeline-marker">
                <span>04</span>
              </div>
              <div className="timeline-meta">
                NOW
                <br />
                NEXT CHAPTER
              </div>
              <div className="timeline-content">
                <h3>Exploring AI engineering</h3>
                <p>
                  Learning how to connect intelligent systems with modern web
                  products while looking for an internship where I can
                  contribute and grow.
                </p>
              </div>
              <span className="timeline-glyph">↗</span>
            </article>
          </div>
        </div>
      </section>

      <section id="work" className="work section-pad">
        <div className="shell">
          <div className="section-top">
            <SectionLabel number="03">SELECTED WORK</SectionLabel>
            <span className="section-aside">ONE IDEA / REAL-WORLD PURPOSE</span>
          </div>
          <div className="work-intro">
            <div>
              <span className="project-count">
                PROJECT 001 / IN DEVELOPMENT
              </span>
              <h2>
                Neighbour
                <br />
                <em>Alerts.</em>
              </h2>
            </div>
            <p>
              A final-year project exploring a simpler way for neighbors to
              share local safety information and stay aware of what&apos;s
              happening around them.
            </p>
          </div>
          <div className="project-display">
            <div
              className="project-visual"
              aria-label="Illustrative interface concept for Neighbour Alerts"
            >
              <div className="map-grid" />
              <div className="map-road road-one" />
              <div className="map-road road-two" />
              <div className="map-road road-three" />
              <div className="map-ui map-ui-top">
                <span className="map-logo">
                  <span className="map-logo-dot" /> neighbour<span>alerts</span>
                </span>
                <span className="map-live">
                  <i /> COMMUNITY VIEW
                </span>
              </div>
              <div className="map-radar">
                <div className="radar-rings" />
                <div className="radar-core" />
              </div>
              <span className="map-pin pin-a">!</span>
              <span className="map-pin pin-b">!</span>
              <span className="map-pin pin-c">!</span>
              <div className="map-card">
                <span className="map-card-kicker">NEARBY ACTIVITY</span>
                <strong>
                  Know what&apos;s happening
                  <br />
                  around you.
                </strong>
                <span className="map-card-rule" />
                <span className="map-card-footer">
                  <span>
                    <i /> Location-aware updates
                  </span>
                  <span>↗</span>
                </span>
              </div>
              <span className="concept-note">
                ILLUSTRATIVE CONCEPT / NOT A LIVE PRODUCT SCREEN
              </span>
            </div>
            <div className="project-details">
              <div>
                <span className="detail-index">THE IDEA</span>
                <p>
                  Bring fragmented local safety information into one visual,
                  community-driven experience.
                </p>
              </div>
              <div>
                <span className="detail-index">THE EXPERIENCE</span>
                <p>
                  Real-time incident reports and interactive maps designed to
                  help people see and share nearby updates.
                </p>
              </div>
              <div className="tag-list">
                <span>WEB PLATFORM</span>
                <span>COMMUNITY SAFETY</span>
                <span>INTERACTIVE MAPPING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="capabilities section-pad"
        aria-labelledby="capabilities-title"
      >
        <div className="shell">
          <SectionLabel number="04">HOW I BUILD</SectionLabel>
          <div className="capabilities-layout">
            <h2 id="capabilities-title">
              The tools.
              <br />
              <em>The mindset.</em>
            </h2>
            <div className="capability-list">
              <div>
                <span>01</span>
                <h3>Frontend craft</h3>
                <p>
                  React.js, responsive interfaces, Tailwind CSS, and Material
                  UI.
                </p>
              </div>
              <div>
                <span>02</span>
                <h3>Connected products</h3>
                <p>
                  Firebase, MERN stack, and thoughtful integration of real-world
                  data.
                </p>
              </div>
              <div>
                <span>03</span>
                <h3>What&apos;s next</h3>
                <p>
                  AI engineering and more useful, human-centered digital
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio section-pad">
        <div className="shell">
          <div className="section-top">
            <SectionLabel number="05">PORTFOLIO</SectionLabel>
            <span className="section-aside">A SPACE FOR WHAT&apos;S NEXT</span>
          </div>
          <div className="portfolio-layout">
            <div>
              <h2>
                More work is
                <br />
                <em>on its way.</em>
              </h2>
              <p>
                I&apos;m building this portfolio as I go. For now, explore
                Neighbour Alerts and follow my journey on LinkedIn. This space
                will grow with future projects.
              </p>
              <div className="portfolio-actions">
                <a href="#work" className="button button-outline">
                  View selected work <Arrow diagonal />
                </a>
                <a
                  href={linkedin}
                  className="text-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Follow along <Arrow diagonal />
                </a>
              </div>
            </div>
            <div className="portfolio-card">
              <span className="portfolio-card-top">
                AF / PROJECT ARCHIVE <span>↗</span>
              </span>
              <div className="portfolio-card-middle">
                <span>01</span>
                <span>02</span>
                <span>03</span>
              </div>
              <strong>
                WORK IN
                <br />
                PROGRESS<span>.</span>
              </strong>
              <span className="portfolio-card-bottom">
                NEW PROJECTS WILL LIVE HERE <span>EST. 2026 →</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="shell">
          <SectionLabel number="06">LET&apos;S CONNECT</SectionLabel>
          <div className="contact-main">
            <div>
              <span className="contact-kicker">
                <i /> OPEN TO INTERNSHIP OPPORTUNITIES
              </span>
              <h2>
                Let&apos;s build
                <br />
                <em>what&apos;s next.</em>
              </h2>
            </div>
            <a
              className="contact-arrow"
              href={email}
              aria-label="Email Abdullah Fareed"
            >
              ↗
            </a>
          </div>
          <div className="contact-bottom">
            <p>
              Have an opportunity, a project, or an idea worth discussing?
              I&apos;d love to hear from you.
            </p>
            <a href={email}>
              abdullahfareedssuet@gmail.com <Arrow diagonal />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner">
          <a href="#top" className="footer-logo">
            AF<span>.</span>
          </a>
          <span>ABDULLAH FAREED © 2026</span>
          <div>
            <a href={linkedin} target="_blank" rel="noreferrer">
              LINKEDIN ↗
            </a>
            <a href={email}>EMAIL ↗</a>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </div>
      </footer>
      <DigitalTwinChat />
    </main>
  );
}
