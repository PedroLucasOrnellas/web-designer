import Image from "next/image";
import type { Project } from "@/types/portfolio";

function CatalogScene() {
  return <div className="scene-ui scene-catalog">
    <header><b>CATÁLOGO.</b><span>Produtos</span><span>Categorias</span><i /></header>
    <div className="scene-catalog-main"><div><small>COLEÇÃO EM DESTAQUE</small><strong>Escolha.<br />Peça. Pronto.</strong><p>Produtos organizados para uma decisão simples.</p><button>Ver catálogo</button></div><div className="scene-products"><i /><i /><i /><i /></div></div>
    <aside><span>Seu pedido</span><b>3 itens selecionados</b><button>Continuar no WhatsApp ↗</button></aside>
  </div>;
}

function ArpoadorScene() {
  return <div className="scene-ui scene-arpoador">
    <header><b>ARPOADOR</b><span>Cortes</span><span>Combos</span><span>Contato</span></header>
    <div className="scene-arpoador-hero"><small>SELEÇÃO DA CASA</small><strong>Qualidade que<br />chega à mesa.</strong><button>Fazer pedido ↗</button></div>
    <div className="scene-cuts"><article><i /><span>Cortes especiais</span></article><article><i /><span>Para o churrasco</span></article><article><i /><span>Seleção do dia</span></article></div>
  </div>;
}

function FipeScene() {
  return <div className="scene-ui scene-fipe">
    <header><b>FIPE × IPCA</b><span>Visão geral</span><span>Comparar</span><i /></header>
    <div className="scene-fipe-grid"><aside><small>VEÍCULO</small><strong>Selecione um modelo</strong><span>Período analisado</span><span>Índice de referência</span><button>Atualizar análise</button></aside><div className="scene-fipe-main"><div className="scene-data-head"><div><small>SÉRIE COMPARATIVA</small><strong>Evolução no período</strong></div><span>FIPE</span><span>IPCA</span></div><div className="scene-chart"><i /><i /><i /><i /><i /><b /><b /><b /><b /></div><div className="scene-data-cards"><span>Variação acumulada</span><span>Diferença relativa</span><span>Leitura temporal</span></div></div></div>
  </div>;
}

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const scene = project.className === "visual-catalogo" ? <CatalogScene /> : project.className === "visual-arpoador" ? <ArpoadorScene /> : project.className === "visual-fipe" ? <FipeScene /> : null;

  return (
    <div className={`project-visual ${project.className} ${compact ? "project-visual-compact" : ""}`} aria-label={`Prévia visual do projeto ${project.name}`} role="img" data-project-visual>
      <div className="visual-grid" />
      <div className="browser-shell" data-project-visual-inner>
        <div className="browser-bar"><i /><i /><i /><span>{project.slug}</span></div>
        <div className="project-image-frame">
          {scene ?? (project.image && <Image src={project.image} alt={project.imageAlt ?? project.name} fill sizes={compact ? "86vw" : "(max-width: 900px) 90vw, 52vw"} className="project-image" priority={project.index === "01"} />)}
          <div className="project-image-shade" />
        </div>
      </div>
      <div className="visual-code">PL / {project.index}</div>
    </div>
  );
}
