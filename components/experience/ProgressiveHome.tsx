"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { benefits, contactUrl, faqs, processSteps, projects, services } from "@/data/portfolio";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import styles from "./ProgressiveHome.module.css";

const heroProjects = ["epimoni-veiculos", "o-catalogo", "julie-doceria", "the-human-dataset"]
  .map((slug) => projects.find((item) => item.slug === slug)!);

function StepLabel({ children }: { children: React.ReactNode }) {
  return <p className={styles.stepLabel}>{children}</p>;
}

export function ProgressiveHome() {
  const [activeService, setActiveService] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [projectDirection, setProjectDirection] = useState(1);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const processRef = useRef<HTMLElement>(null);
  const project = projects[activeProject];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-progressive-reveal]"));
    if (reducedMotion) {
      targets.forEach((target) => target.dataset.visible = "true");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.visible = "true";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = processRef.current;
      if (!section || window.innerWidth < 981) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(0.999, Math.max(0, -rect.top / travel));
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        setActiveProcess(Math.min(processSteps.length - 1, Math.floor(progress * processSteps.length)));
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const changeProject = (direction: number) => {
    setProjectDirection(direction);
    setActiveProject((current) => (current + direction + projects.length) % projects.length);
  };

  const selectProject = (index: number) => {
    if (index === activeProject) return;
    setProjectDirection(index > activeProject ? 1 : -1);
    setActiveProject(index);
  };

  return <>
    <main className={styles.page} data-progressive-home>
      <section className={styles.hero} id="topo" aria-labelledby="hero-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <header className={styles.header} data-hero-item>
          <Link href="#topo" className={styles.brand} aria-label="Pedro Lucas — início">Pedro Lucas<span>.</span></Link>
          <nav aria-label="Navegação principal">
            <Link href="#servicos">Soluções</Link>
            <Link href="#projetos">Projetos</Link>
            <Link href="#processo">Processo</Link>
          </nav>
          <Link href={contactUrl} className={styles.headerCta}>Vamos conversar <span aria-hidden="true">↗</span></Link>
        </header>

        <div className={styles.heroLayout}>
        <div className={styles.heroCopy} data-hero-sequence>
          <StepLabel>WEB DESIGN · DESENVOLVIMENTO</StepLabel>
          <h1 id="hero-title">Sites e sistemas<br />que dão forma<br />ao seu próximo passo.</h1>
          <p>Estratégia, design e desenvolvimento para apresentar sua oferta, organizar operações e fortalecer sua marca.</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href={contactUrl}>Solicitar um projeto <span aria-hidden="true">↗</span></Link>
            <Link className={styles.secondaryButton} href="#servicos">Ver soluções <span aria-hidden="true">↓</span></Link>
          </div>
        </div>
        <div className={styles.heroGallery} aria-label="Seleção de projetos realizados">
          <div className={styles.galleryLabel}><span>IDEIAS QUE JÁ GANHARAM FORMA</span><span>01 — 04</span></div>
          <div className={styles.heroScreens}>
            {heroProjects.map((item, index) => <Link key={item.slug} href={`/projetos/${item.slug}`} className={styles.heroScreen}>
              <div className={styles.screenImage}><Image src={item.image!} alt={item.imageAlt ?? item.name} fill sizes="(max-width: 640px) 85vw, (max-width: 980px) 44vw, 28vw" priority={index < 2} /></div>
              <div className={styles.screenCaption}><span>{item.slug === "julie-doceria" ? "Julie Doceria" : item.name}</span><span aria-hidden="true">↗</span></div>
            </Link>)}
          </div>
          <a href="#projetos" className={styles.galleryFooter}>Conheça os projetos <span aria-hidden="true">↓</span></a>
        </div>
        </div>
        <a href="#servicos" className={styles.continueCue}>01 / CONTINUE PARA DESCOBRIR <span aria-hidden="true">↓</span></a>
      </section>

      <section className={styles.pause} aria-label="Princípio de trabalho">
        <div data-progressive-reveal data-reveal-style="slow"><StepLabel>02 / ENTENDER</StepLabel><h2>Antes da interface, clareza<br />sobre o problema.</h2></div>
      </section>

      <section className={styles.solutions} id="servicos" aria-labelledby="solutions-title" data-service-accordion>
        <div className={styles.sectionIntro} data-progressive-reveal data-reveal-style="title">
          <StepLabel>SOLUÇÕES</StepLabel>
          <h2 id="solutions-title">Escolha o ponto<br />de partida.</h2>
          <p>Uma solução de cada vez. Abra para entender o problema, a entrega e o benefício.</p>
        </div>
        <div className={styles.serviceAccordion}>
          {services.map((service, index) => {
            const active = activeService === index;
            const panelId = `service-panel-${index}`;
            return <article className={active ? styles.isActive : undefined} key={service.index} data-progressive-reveal>
              <button type="button" onClick={() => setActiveService(index)} aria-expanded={active} aria-controls={panelId}>
                <span>{service.index}</span><strong>{service.title}</strong><i aria-hidden="true">{active ? "−" : "+"}</i>
              </button>
              <div id={panelId} className={styles.servicePanel} data-open={active} aria-hidden={!active}>
                <div><p>{service.description}</p>
                  <div className={styles.serviceDetails}><div><small>O QUE É ENTREGUE</small><span>{service.delivery}</span></div><div><small>PARA O SEU NEGÓCIO</small><span>{service.benefit}</span></div></div>
                  <Link href={contactUrl}>Conversar sobre esta solução <span aria-hidden="true">↗</span></Link>
                </div>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className={styles.projects} id="projetos" aria-labelledby="projects-title" data-project-carousel>
        <div className={styles.projectsHeading} data-progressive-reveal data-reveal-style="title">
          <StepLabel>03 / VER NA PRÁTICA</StepLabel>
          <h2 id="projects-title">Um projeto de cada vez.</h2>
          <p>Menos miniaturas competindo pela atenção. Mais contexto para entender o raciocínio.</p>
        </div>
        <article className={styles.projectCard} data-direction={projectDirection} style={{ "--project-color": project.accent } as React.CSSProperties} aria-live="polite">
          <div className={styles.projectCopy} key={`copy-${project.slug}`}>
            <span>{project.index} / {String(projects.length).padStart(2, "0")}</span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <strong>{project.solution}</strong>
            <Link href={`/projetos/${project.slug}`}>Ver case <span aria-hidden="true">→</span></Link>
          </div>
          <div className={styles.projectVisual} key={`visual-${project.slug}`}><ProjectVisual project={project} /></div>
          <div className={styles.projectNav} aria-label="Selecionar projeto">
            <button type="button" onClick={() => changeProject(-1)} aria-label="Projeto anterior">←</button>
            <div>{projects.map((item, index) => <button key={item.slug} type="button" className={index === activeProject ? styles.currentDot : undefined} onClick={() => selectProject(index)} aria-label={`Mostrar ${item.name}`} aria-pressed={index === activeProject} />)}</div>
            <button type="button" onClick={() => changeProject(1)} aria-label="Próximo projeto">→</button>
          </div>
        </article>
        <nav className={styles.allProjectLinks} aria-label="Todos os projetos">
          {projects.map((item) => <Link key={item.slug} href={`/projetos/${item.slug}`}>{item.name}</Link>)}
        </nav>
      </section>

      <section ref={processRef} className={styles.process} id="processo" aria-labelledby="process-title" data-process-tabs>
        <div className={styles.processInner}>
          <div className={styles.processHeading} data-progressive-reveal data-reveal-style="title">
            <StepLabel>04 / COMO FUNCIONA</StepLabel>
            <h2 id="process-title">Você sabe onde está<br />e o que vem depois.</h2>
            <p>Cada etapa reduz incertezas sem exigir que você absorva o processo inteiro de uma vez.</p>
          </div>
          <div className={styles.processProgress} aria-hidden="true"><i style={{ width: `${((activeProcess + 1) / processSteps.length) * 100}%` }} /></div>
          <div className={styles.processSteps}>
            {processSteps.map((step, index) => {
              const active = activeProcess === index;
              return <button type="button" className={active ? styles.isActive : undefined} key={step.index} onClick={() => setActiveProcess(index)} aria-pressed={active}>
                <span>{step.index}</span><strong>{step.title}</strong><span className={styles.processDescription}>{step.description}</span>
              </button>;
            })}
          </div>
          <p className={styles.reassurance}><i /> REVISÕES E DECISÕES COMPARTILHADAS EM CADA MARCO</p>
        </div>
      </section>

      <section className={styles.trust} id="sobre" aria-labelledby="trust-title">
        <div className={styles.trustHeading} data-progressive-reveal>
          <StepLabel>05 / POR QUE TRABALHAR COMIGO</StepLabel>
          <h2 id="trust-title">O projeto inteiro,<br />sem ruído.</h2>
          <p>Você fala diretamente com quem entende o negócio, desenha a experiência e constrói a interface.</p>
        </div>
        <div className={styles.benefitList}>
          {benefits.slice(0, 3).map((benefit, index) => <article key={benefit.title} data-progressive-reveal data-reveal-style="cascade" style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}><span>{String(index + 1).padStart(2, "0")}</span><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}
        </div>
        <div className={styles.signature} data-progressive-reveal><strong>Pedro Lucas<span>.</span></strong><p>Estratégia · Design · Frontend</p></div>
      </section>

      <section className={styles.faq} id="faq" aria-labelledby="faq-title" data-faq-accordion>
        <div className={styles.faqIntro} data-progressive-reveal><StepLabel>06 / TIRAR DÚVIDAS</StepLabel><h2 id="faq-title">Só o que você<br />quiser abrir.</h2><p>As respostas ficam disponíveis sem interromper o fluxo principal.</p></div>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const active = activeFaq === index;
            return <article key={faq.question}>
              <button type="button" onClick={() => setActiveFaq(active ? -1 : index)} aria-expanded={active} aria-controls={`faq-answer-${index}`}><span>{faq.question}</span><i aria-hidden="true">+</i></button>
              <div id={`faq-answer-${index}`} className={styles.faqAnswer} data-open={active} aria-hidden={!active}><div><p>{faq.answer}</p></div></div>
            </article>;
          })}
        </div>
      </section>

      <section className={styles.contact} id="contato" aria-labelledby="contact-title">
        <StepLabel>07 / CONVERSAR</StepLabel>
        <h2 id="contact-title"><span>Tem um site, sistema</span><span>ou ideia para tirar</span><span>do papel?</span></h2>
        <p>Conte brevemente o que você precisa e receba uma direção inicial para o projeto.</p>
        <Link href={contactUrl}>Conversar sobre o projeto <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
    <footer className={styles.footer}><span>PL.</span><p>© {new Date().getFullYear()} Pedro Lucas</p><a href="#topo">Voltar ao topo ↑</a></footer>
  </>;
}
