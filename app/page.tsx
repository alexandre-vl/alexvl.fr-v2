import { Suspense } from "react";
import SkeletonImage from "./components/SkeletonImage";
import { projects } from "./data/projects";
import HomeClient from "./components/HomeClient";
import {
    GithubIcon,
    LinkedinIcon,
    XIcon,
    MailIcon,
} from "./components/Icons";
import type { Project } from "./data/projects";

function ProjectTile({ project, featured = false }: { project: Project; featured?: boolean }) {
    return (
        <article
            className={`tile tile-interactive tile-project ${featured ? "tile-project-featured" : ""}`}
            style={{ background: project.tileColor }}
            data-project-id={project.id}
            tabIndex={0}
            role="button"
            aria-label={`View project: ${project.name} — ${project.shortDesc}`}
        >
            <span className="tile-project-icon" aria-hidden="true">{project.icon}</span>
            <div className="tile-project-line" aria-hidden="true" />
            <div>
                <h2 className="tile-project-name">{project.name}</h2>
                <p className="tile-project-type">{project.type}</p>
                <p className="tile-project-desc">{project.shortDesc}</p>
            </div>
        </article>
    );
}

export default function Home() {
    return (
        <Suspense>
            <HomeClient projects={projects}>
                <div className="bento-wrapper">
                    <main className="bento-grid" role="main">
                        {/* ── Intro tile ── */}
                        <header className="tile tile-intro">
                            <SkeletonImage
                                src="/logo.webp"
                                alt="Alexandre Vargas Lopez — Logo"
                                width={32}
                                height={32}
                                className="intro-logo"
                                priority
                                wrapperClassName="intro-logo-wrapper"
                            />
                            <div>
                                <h1 className="intro-name">Alexandre V.L</h1>
                                <p className="intro-title">Fullstack Developer</p>
                                <div className="intro-badge">
                                    <span className="intro-badge-dot" aria-hidden="true" />
                                    Available
                                </div>
                            </div>
                        </header>

                        {/* ── Featured: Devolab ── */}
                        <ProjectTile project={projects[0]} featured />

                        {/* ── Socials ── */}
                        <nav className="tile tile-socials" aria-label="Social links">
                            <span className="socials-label">Connect</span>
                            <div className="socials-links">
                                <a href="https://github.com/alexandre-vl" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                                    <GithubIcon />
                                </a>
                                <a href="https://www.linkedin.com/in/alexandre-vargas-lopez-1b6450233/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                    <LinkedinIcon />
                                </a>
                                <a href="https://twitter.com/alexx_vrgs" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X">
                                    <XIcon />
                                </a>
                            </div>
                        </nav>

                        {/* ── Featured: Ontrace ── */}
                        <ProjectTile project={projects[1]} featured />

                        {/* ── Upsky ── */}
                        <ProjectTile project={projects[2]} />

                        {/* ── Yaprof ── */}
                        <ProjectTile project={projects[3]} />

                        {/* ── Homeflix ── */}
                        <ProjectTile project={projects[4]} />

                        {/* ── Playbot ── */}
                        <ProjectTile project={projects[5]} />

                        {/* ── Tech tile ── */}
                        <section className="tile tile-tech" aria-label="Technical skills">
                            <span className="tech-label">Tech Stack</span>
                            <div className="tech-pills">
                                {["React", "Next.js", "Vue.js", "TypeScript", "Go", "Node.js", "PostgreSQL", "Redis", "Docker"].map((t) => (
                                    <span key={t} className="tech-pill">{t}</span>
                                ))}
                            </div>
                        </section>

                        {/* ── Contact tile ── */}
                        <section className="tile tile-contact" aria-label="Contact information">
                            <span className="contact-label">Get in touch</span>
                            <a href="mailto:alexandre.vargas.lopez@gmail.com" className="contact-email">
                                <MailIcon />
                                Say hello
                            </a>
                            <span className="contact-hint">alexandre.vargas.lopez@gmail.com</span>
                        </section>
                    </main>
                </div>
            </HomeClient>
        </Suspense>
    );
}
