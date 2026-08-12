"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

export function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const toggleProject = (slug: string) => {
    setActiveProject((current) => current === slug ? null : slug);
  };

  return (
    <section className="projects-accordion-section" id="projetos" data-projects-accordion>
      <header className="projects-accordion-heading">
        <p><span /> PROJETOS SELECIONADOS</p>
        <h2>Trabalhos que combinam design,<br />tecnologia e estratégia.</h2>
      </header>

      <div className={`projects-accordion${activeProject ? " has-active" : ""}`}>
        {projects.map((project) => {
          const isActive = activeProject === project.slug;
          const contentId = `project-panel-${project.slug}`;

          return (
            <article
              key={project.slug}
              className={`project-accordion-panel${isActive ? " is-active" : ""}`}
              style={{ "--project-accent": project.accent } as React.CSSProperties}
            >
              <button
                type="button"
                className="project-accordion-trigger"
                aria-expanded={isActive}
                aria-controls={contentId}
                aria-label={`${isActive ? "Fechar" : "Abrir"} projeto ${project.name}`}
                onClick={() => toggleProject(project.slug)}
              >
                <span className="project-accordion-index">{project.index}</span>
                <span className="project-accordion-toggle" aria-hidden="true">{isActive ? "−" : "+"}</span>
              </button>

              <div
                className="project-accordion-content"
                id={contentId}
                aria-hidden={!isActive}
              >
                <div className="project-accordion-visual">
                  <ProjectVisual project={project} />
                </div>

                <div className="project-morph-title">
                  <h3>{project.name}</h3>
                  <small>{project.shortCategory}</small>
                </div>

                <div className="project-accordion-details">
                  <p className="project-detail project-reveal-description">{project.description}</p>
                  <div className="project-detail project-accordion-meta">
                    <div>
                      <small>CATEGORIAS</small>
                      {project.categories.map((category) => <span key={category}>{category}</span>)}
                    </div>
                    <div>
                      <small>TECNOLOGIAS</small>
                      {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                  </div>
                  <div className="project-detail project-accordion-actions">
                    <Link href={`/projetos/${project.slug}`} className="project-case-cta" tabIndex={isActive ? 0 : -1}>
                      Ver case <span aria-hidden="true">→</span>
                    </Link>
                    {project.liveUrl ? (
                      project.liveUrlExternal ? (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" tabIndex={isActive ? 0 : -1}>
                          Visitar site <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" tabIndex={isActive ? 0 : -1}>
                          Visitar site <span aria-hidden="true">↗</span>
                        </Link>
                      )
                    ) : <span className="project-link-placeholder">Site em breve</span>}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
