import Image from "next/image";
import type { Project } from "@/types/portfolio";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`project-visual ${project.className} ${compact ? "project-visual-compact" : ""}`} aria-label={`Prévia visual do projeto ${project.name}`} role="img">
      <div className="visual-grid" />
      <div className="browser-shell">
        <div className="browser-bar"><i /><i /><i /><span>{project.slug}</span></div>
        <div className="project-image-frame">
          <Image src={project.image} alt={project.imageAlt} fill sizes={compact ? "86vw" : "(max-width: 900px) 90vw, 52vw"} className="project-image" priority={project.index === "01"} />
          <div className="project-image-shade" />
          <div className="project-image-label"><span>{project.eyebrow}</span><strong>{project.name}</strong></div>
        </div>
      </div>
      {!compact && <div className="phone-shell"><i /><b>{project.index}</b><span>{project.name}</span><small>Ver projeto</small></div>}
      <div className="visual-code">PL / {project.index}</div>
    </div>
  );
}
