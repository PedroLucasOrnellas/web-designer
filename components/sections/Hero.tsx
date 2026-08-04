import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function Hero() {
  return (
    <section className="hero" id="topo" data-motion-hero>
      <div className="hero-pin" data-hero-pin>
        <div className="hero-content" data-hero-content>
          <h1 className="hero-title" aria-label="Sites que transformam ideias em experiências digitais.">
            Sites que transformam ideias em <em>experiências.</em>
          </h1>
          <p className="hero-support">Design estratégico, desenvolvimento moderno e interações que conectam, encantam e convertem.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#projetos">Ver projetos <ArrowIcon diagonal /></Link>
            <Link className="button button-secondary" href="#contato">Solicitar orçamento <ArrowIcon /></Link>
          </div>
          <div className="hero-status"><span className="status-dot" /><span>Disponível para novos projetos</span><small>BR · TRABALHO REMOTO</small></div>
        </div>

        <div className="laptop-wrapper" data-laptop-wrapper>
          <div className="laptop-shell" data-laptop-shell>
            <div className="laptop-frame" data-laptop-frame />
            <div className="laptop-camera" />
            <div className="laptop-screen" data-laptop-screen>
              <Image
                src="/projects/portfolio-dados/dashboard.png"
                alt="Interface do projeto The Human Dataset exibida na tela do notebook"
                fill
                priority
                sizes="(max-width: 768px) 92vw, 52vw"
                className="laptop-screen-image"
              />
              <div className="laptop-screen-shade" />
              <div className="laptop-screen-ui">
                <span>LIVE EXPERIENCE / 01</span>
                <strong>The Human Dataset</strong>
                <small>Explore o projeto</small>
              </div>
              <div className="takeover-content" data-takeover-content>
                <span>DESIGN · DADOS · DESENVOLVIMENTO</span>
                <strong>Experiências digitais construídas com clareza, profundidade e intenção.</strong>
                <small>Continue para explorar os projetos</small>
              </div>
            </div>
          </div>
          <div className="laptop-base" data-laptop-base><i /></div>
          <div className="laptop-shadow" />
        </div>
      </div>
    </section>
  );
}
