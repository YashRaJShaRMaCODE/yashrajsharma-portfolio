import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import WorkShelf, { type PortfolioProject } from "../components/work-shelf";
import { CopyEmail, SharePortfolio } from "../components/portfolio-actions";
import { buildEnquiryHref, serviceEnquiryLabel } from "../lib/enquiry-link.mjs";
import { siteUrl } from "../lib/site";

const projects: PortfolioProject[] = [
  {
    name: "SUB/WAVE",
    type: "Live radio platform",
    description:
      "A self-hosted radio station where every listener hears the same broadcast, guided by an AI DJ and a shared request queue.",
    stack: "TypeScript · Next.js · Liquidsoap",
    category: "Media",
    href: "https://github.com/YashRaJShaRMaCODE/nightshift-radio",
    liveHref: "https://nightshift-radio-orpin.vercel.app",
  },
  {
    name: "UNNATI",
    type: "Farmer finance platform",
    description:
      "A bilingual platform for farmer trust and financial access, with focused tools for farmers, buyers, banks, and public agencies.",
    stack: "Django REST · Next.js · PostgreSQL",
    category: "Platforms",
    href: "https://github.com/YashRaJShaRMaCODE/unnati-farmer-platform",
    liveHref: "https://unnati-farmer-platform.vercel.app",
  },
  {
    name: "Clear Writing",
    type: "Writing workspace",
    description:
      "A focused workspace for rewriting or summarising professional drafts through a Django API and Gemini.",
    stack: "Django · React · Gemini API",
    category: "AI & writing",
    href: "https://github.com/YashRaJShaRMaCODE/ai-writing-assistant",
    liveHref: "https://clear-writing-studio.onrender.com",
  },
  {
    name: "CineScope",
    type: "Movie discovery",
    description:
      "A movie discovery and review experience with searchable titles, useful filters, ratings, and curated collections.",
    stack: "Django · MySQL · JavaScript",
    category: "Media",
    href: "https://github.com/YashRaJShaRMaCODE/Cinescope",
    liveHref: "https://cinescope-3pc5.onrender.com",
  },
  {
    name: "JobMail Tracker",
    type: "Inbox automation",
    description:
      "Turns job-related Gmail messages into duplicate-safe Google Sheets records, with focused filtering and OAuth access.",
    stack: "Python · Gmail API · Google Sheets API",
    category: "Automation",
    href: "https://github.com/YashRaJShaRMaCODE/JobMail-tracker",
  },
];

const experience = [
  {
    role: "Full Stack Developer",
    company: "ElevateCareer.ai",
    period: "May 2026 to present",
    detail:
      "Building AI-powered learning products, including coding challenges, communication tools, and shared platform services.",
  },
  {
    role: "Backend Developer",
    company: "Bhumi Tech Pvt. Ltd.",
    period: "Dec 2025 to May 2026",
    detail:
      "Built and scaled an LMS across 15+ modules and automated monthly reporting to reduce manual work.",
  },
  {
    role: "Data Analytics Intern",
    company: "Cognetix Technology",
    period: "Jul 2025 to Dec 2025",
    detail: "Worked on data pipelines and dashboards for operational reporting.",
  },
  {
    role: "Software Intern",
    company: "Yhills Data Tech",
    period: "Aug 2024 to Jan 2025",
    detail: "Built Python and SQL applications and helped tune database queries.",
  },
];

const capabilities = [
  { title: "Product builds", items: "Shape a defined product flow, from a working first version to release." },
  { title: "Workflow automation", items: "Connect existing tools and remove repetitive manual handoffs." },
  { title: "Data and reporting", items: "Turn product or operations data into clear, usable reports." },
  { title: "Monthly engineering", items: "Plan a focused monthly scope for product delivery and maintenance." },
];

const enquiryHref = buildEnquiryHref();

export default function PortfolioPage() {
  const personSchema = {
    "@type": "Person",
    name: "Yash Raj Sharma",
    jobTitle: "Full-Stack Developer",
    url: siteUrl.toString(),
    email: "mailto:yashrajsharma786jmd@gmail.com",
    sameAs: [
      "https://github.com/YashRaJShaRMaCODE",
      "https://www.linkedin.com/in/yash-raj-sharma-4627bb212",
    ],
    knowsAbout: ["Product engineering", "Workflow automation", "Data reporting", "Backend systems"],
  };
  const projectsSchema = {
    "@type": "ItemList",
    name: "Selected projects by Yash Raj Sharma",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        description: project.description,
        url: project.liveHref ?? project.href,
      },
    })),
  };

  return (
    <main id="top">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [personSchema, projectsSchema],
          }).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a aria-label="Yash Raj Sharma, home" className="wordmark" href="#top">
          YS<span>.</span>
        </a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-contact" href={enquiryHref}>
          Let’s talk <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </header>

      <section aria-labelledby="hero-title" className="hero section-wrap" id="main-content" tabIndex={-1}>
        <div className="hero-copy">
          <p className="eyebrow">Full-stack developer · Product builder</p>
          <h1 id="hero-title">
            I build <em>useful software.</em>
          </h1>
          <p className="hero-summary">
            I’m Yash Raj Sharma. I turn real problems into clear interfaces,
            dependable systems, and shipped products.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              Explore my work <ArrowDownRight aria-hidden="true" size={17} />
            </a>
            <a className="text-link" href="/Yash_Raj_Sharma_Resume.pdf" download>
              Download résumé <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
          <p className="hero-note"><span aria-hidden="true" /> Selected work · 2024—26</p>
        </div>
        <figure className="hero-visual">
          <Image
            alt="SUB/WAVE radio control center showing the live station dashboard and broadcast tools"
            className="hero-image"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 44vw"
            src="/projects/subwave-dashboard.webp"
          />
          <figcaption><span>01 / 05</span> SUB/WAVE · live radio platform</figcaption>
        </figure>
      </section>

      <section aria-labelledby="work-title" className="work-section" id="work">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 id="work-title">A few things I’ve built.</h2>
            </div>
            <a
              className="text-link"
              href="https://github.com/YashRaJShaRMaCODE?tab=repositories"
              rel="noreferrer"
              target="_blank"
            >
              All repositories <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>

          <WorkShelf projects={projects} />
        </div>
      </section>

      <section aria-labelledby="experience-title" className="section-wrap experience-section" id="experience">
        <div className="experience-heading">
          <h2 id="experience-title">Built with teams, learned by shipping.</h2>
          <p className="heading-note">Product work across learning, software, and data.</p>
        </div>
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-row" key={`${item.company}-${item.role}`}>
              <div className="experience-period">{item.period}</div>
              <div>
                <h3>{item.role} <span>· {item.company}</span></h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="about-title" className="about-section" id="about">
        <div className="section-wrap about-layout">
          <div>
            <h2 id="about-title">Engineering support built around the work.</h2>
          </div>
          <div className="about-copy">
            <p>
              I work with small teams to turn a defined product or operations problem
              into dependable software. We agree the scope, timeline, and
              availability before starting; work can be a focused build or an
              ongoing monthly partnership.
            </p>
            <div className="capability-grid">
              {capabilities.map((capability) => (
                <div className="capability" key={capability.title}>
                  <h3>{capability.title}</h3>
                  <p>{capability.items}</p>
                  <a aria-label={serviceEnquiryLabel(capability.title)} className="capability-enquiry" href={buildEnquiryHref(capability.title)}>
                    Discuss this service <ArrowUpRight aria-hidden="true" size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="section-wrap site-footer" id="contact">
        <div>
          <p className="eyebrow">Have a good problem?</p>
          <h2>Let’s make something useful.</h2>
          <p className="contact-guidance">A useful first note includes the problem, desired outcome, timing, and tools in use. Please leave out passwords and private customer data.</p>
          <a className="email-link" href={enquiryHref}>
            yashrajsharma786jmd@gmail.com <ArrowUpRight aria-hidden="true" size={18} />
          </a>
          <CopyEmail email="yashrajsharma786jmd@gmail.com" />
        </div>
        <div className="footer-links">
          <a href="https://github.com/YashRaJShaRMaCODE" rel="noreferrer" target="_blank">
            <Github aria-hidden="true" size={17} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/yash-raj-sharma-4627bb212" rel="noreferrer" target="_blank">
            <Linkedin aria-hidden="true" size={17} /> LinkedIn
          </a>
          <a href="mailto:yashrajsharma786jmd@gmail.com">
            <Mail aria-hidden="true" size={17} /> Email
          </a>
          <SharePortfolio />
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Yash Raj Sharma</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
