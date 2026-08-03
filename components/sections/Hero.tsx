import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero-orbit orbit-one" data-parallax /><div className="hero-orbit orbit-two" />
      <div className="hero-copy">
        <p className="section-kicker" data-hero-meta><span /> WEB DESIGN &amp; DESENVOLVIMENTO</p>
        <h1 aria-label="Sites que transformam ideias em experiências digitais.">
          <span className="line-mask"><span data-hero-line>Sites que</span></span>
          <span className="line-mask"><span data-hero-line>transformam <em>ideias</em></span></span>
          <span className="line-mask"><span data-hero-line>em experiências.</span></span>
        </h1>
        <p className="hero-support" data-hero-meta>Design estratégico, desenvolvimento moderno e interações que conectam, encantam e convertem.</p>
        <div className="hero-actions" data-hero-meta>
          <Link className="button button-primary" href="#projetos" data-magnetic>Ver projetos <ArrowIcon diagonal /></Link>
          <Link className="button button-secondary" href="#contato" data-magnetic>Solicitar orçamento <ArrowIcon /></Link>
        </div>
        <div className="hero-status" data-hero-meta><span className="status-dot" /><span>Disponível para novos projetos</span><small>BR · TRABALHO REMOTO</small></div>
      </div>
      <div className="hero-scene" data-hero-visual>
        <div className="scene-glow" /><div className="scene-sphere"><i /><i /><i /></div>
        <div className="hero-window window-back"><header><span /><span /><span /><b>pedrolucas.design</b></header><div className="window-content"><small>ESTRATÉGIA DIGITAL</small><strong>Forma que<br />move negócios.</strong><div className="window-rule" /></div></div>
        <div className="hero-window window-front"><header><span /><span /><span /><b>o-catalogo.app</b></header><div className="mini-app"><aside><b>OC</b><i /><i /><i /></aside><main><small>SEU CATÁLOGO</small><h3>Encontre o que<br />você precisa.</h3><div><span /><span /><span /></div></main></div></div>
        <div className="hero-phone"><div className="phone-notch" /><small>PROJETO 02</small><strong>Arpoador</strong><i /><span>Explorar ↗</span></div>
        <div className="scene-label label-a">DESIGN<br />SYSTEM</div><div className="scene-label label-b">MOTION / 01</div>
      </div>
      <div className="scroll-cue"><span>SCROLL</span><i /></div>
    </section>
  );
}
