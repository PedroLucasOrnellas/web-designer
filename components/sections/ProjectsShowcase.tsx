import Link from "next/link";
import { projects } from "@/data/portfolio";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function ProjectsShowcase() {
  return <section className="projects-section" id="projetos">
    <div className="projects-heading" data-reveal><p className="section-kicker"><span /> PROJETOS SELECIONADOS</p><h2>Trabalhos que<br /><em>geram impacto.</em></h2><p>Uma seleção de interfaces que equilibram clareza, presença visual e intenção de negócio.</p></div>
    <div className="projects-stack">{projects.map((project) => <article className="project-row" key={project.slug} style={{ "--project-accent": project.accent } as React.CSSProperties}><div className="project-index">{project.index}<span>/ 03</span></div><div className="project-copy" data-reveal><p>{project.eyebrow}</p><h3>{project.name}</h3><span>{project.description}</span><div className="tag-list">{project.technologies.map((tech) => <small key={tech}>{tech}</small>)}</div><Link href={`/projetos/${project.slug}`} className="text-link">Ver case <ArrowIcon diagonal /></Link></div><Link href={`/projetos/${project.slug}`} className="project-visual-link" aria-label={`Ver case ${project.name}`}><ProjectVisual project={project} /></Link></article>)}</div>
  </section>;
}
