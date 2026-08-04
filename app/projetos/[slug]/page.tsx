import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { projects } from "@/data/portfolio";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: project.name, description: project.description } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return <><MotionEngine /><Header /><main className="case-page">
    <section className="case-hero" style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <Link href="/#projetos" className="case-back">← VOLTAR AOS PROJETOS</Link>
      <p className="section-kicker"><span /> CASE {project.index}</p>
      <h1>{project.name}</h1>
      <p className="case-lead">{project.description}</p>
      <div className="case-meta">
        <div><small>TIPO</small><span>{project.eyebrow}</span></div>
        <div><small>DISCIPLINAS</small><span>{project.technologies.join(" · ")}</span></div>
        <div><small>STATUS</small><span>{project.status}</span></div>
      </div>
      {project.liveUrl && (project.liveUrlExternal
        ? <a className="case-live-link" href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveUrlLabel ?? "Visitar site"} <span aria-hidden="true">↗</span></a>
        : <Link className="case-live-link" href={project.liveUrl}>{project.liveUrlLabel ?? "Visitar site"} <span aria-hidden="true">→</span></Link>)}
      <div className="case-project-visual"><ProjectVisual project={project} compact /></div>
    </section>
    <section className="case-story"><div><p className="section-kicker"><span /> CONTEXTO</p><h2>Clareza antes de <em>decoração.</em></h2></div><div className="case-columns"><article><small>O DESAFIO</small><p>{project.challenge}</p></article><article><small>A DIREÇÃO</small><p>{project.solution}</p></article></div></section>
    <section className="case-note"><span>NOTA DO CASE</span><p>{project.caseNote}</p></section>
    <Link href={`/projetos/${nextProject.slug}`} className="next-case"><small>PRÓXIMO CASE</small><span>{nextProject.name}</span><b>↗</b></Link>
  </main><Footer /></>;
}
