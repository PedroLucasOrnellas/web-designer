import Link from "next/link";
import { projects } from "@/data/portfolio";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function ProjectsShowcase() {
  return (
    <section className="projects-showcase" id="projetos" data-projects-showcase>
      <header className="projects-showcase-header">
        <p><span /> TRABALHOS SELECIONADOS</p>
        <div className="projects-showcase-count" aria-live="polite">
          <strong data-projects-current>01</strong><span> / 03</span>
        </div>
      </header>

      <div className="projects-showcase-stage" data-projects-stage>
        <div className="projects-showcase-stack">
          {projects.map((project, index) => (
            <article
              className={`showcase-card${index === 0 ? " is-active" : ""}`}
              key={project.slug}
              data-project-card
              style={{ "--project-accent": project.accent } as React.CSSProperties}
            >
              <div className="showcase-card-copy" data-project-copy>
                <span className="showcase-card-number">{project.index}</span>
                <div className="showcase-title-mask"><h2>{project.name}</h2></div>
                <p>{project.description}</p>
                <div className="showcase-tags">
                  {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <Link href={`/projetos/${project.slug}`} className="showcase-cta" data-project-cta>
                  Ver case <ArrowIcon diagonal />
                </Link>
              </div>

              <Link href={`/projetos/${project.slug}`} className="showcase-visual-link" aria-label={`Ver case ${project.name}`}>
                <ProjectVisual project={project} />
              </Link>
            </article>
          ))}
        </div>

        <div className="projects-progress" aria-hidden="true">
          {projects.map((project, index) => <i key={project.slug} className={index === 0 ? "is-active" : undefined} data-project-progress />)}
        </div>
      </div>
    </section>
  );
}
