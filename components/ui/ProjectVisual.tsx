import type { Project } from "@/types/portfolio";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`project-visual ${project.className} ${compact ? "project-visual-compact" : ""}`} aria-label={`Prévia visual conceitual do projeto ${project.name}`} role="img">
      <div className="visual-grid" />
      <div className="browser-shell">
        <div className="browser-bar"><i /><i /><i /><span>{project.slug}.studio</span></div>
        {project.slug === "o-catalogo" && (
          <div className="catalog-ui"><aside><b>OC</b><span /><span /><span /><small>catálogo</small></aside><main><header><em>Produtos</em><i /></header><div className="product-grid"><span /><span /><span /><span /></div></main></div>
        )}
        {project.slug === "acougue-arpoador" && (
          <div className="arpoador-ui"><div className="meat-photo"><strong>Arpoador</strong><small>Seleção especial</small></div><div className="order-pill">PEDIR AGORA <b>↗</b></div></div>
        )}
        {project.slug === "fipe-ipca" && (
          <div className="fipe-ui"><header><b>Valor real</b><small>FIPE × IPCA</small></header><div className="chart"><i /><i /><i /><i /><i /><span className="chart-line" /></div><footer><span>FIPE</span><span>INFLAÇÃO</span></footer></div>
        )}
      </div>
      {!compact && <div className="phone-shell"><i /><b>{project.index}</b><span>{project.name}</span><small>Ver projeto</small></div>}
      <div className="visual-code">PL / {project.index}</div>
    </div>
  );
}
