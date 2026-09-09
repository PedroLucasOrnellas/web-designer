"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { contactUrl } from "@/data/portfolio";
import styles from "./HeroConcept.module.css";

const services = [
  { title: "Estratégia", description: "Objetivos e escopo claros." },
  { title: "Design", description: "Clareza em cada tela." },
  { title: "Desenvolvimento", description: "Interfaces rápidas e responsivas." },
];

export function HeroConcept() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let cleanup = () => {};

    const initialize = async () => {
      const { gsap } = await import("gsap");
      await document.fonts.ready;
      if (cancelled) return;

      const image = root.querySelector<HTMLElement>("[data-hero-image]");
      const content = root.querySelector<HTMLElement>("[data-hero-content]");
      const note = root.querySelector<HTMLElement>("[data-hero-note]");
      const serviceRow = root.querySelector<HTMLElement>("[data-hero-services]");
      const siteHeader = document.querySelector<HTMLElement>('[data-header][data-after-hero="true"]');
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const entrance = root.querySelectorAll<HTMLElement>("[data-hero-entry]");
      const headlineLines = root.querySelectorAll<HTMLElement>("[data-hero-line]");

      if (!reducedMotion) {
        gsap.set(entrance, { opacity: 0, y: 14 });
        gsap.set(headlineLines, { yPercent: 108 });
        gsap.set(image, { scale: 1.035, opacity: 0 });

        gsap.timeline({ defaults: { ease: "power3.out" } })
          .to(image, { scale: 1, opacity: 1, duration: 1.35 }, 0)
          .to('[data-hero-entry="header"]', { opacity: 1, y: 0, duration: 0.75 }, 0.08)
          .to('[data-hero-entry="eyebrow"]', { opacity: 1, y: 0, duration: 0.7 }, 0.18)
          .to(headlineLines, { yPercent: 0, duration: 0.9, stagger: 0.09 }, 0.28)
          .to('[data-hero-entry="cta"]', { opacity: 1, y: 0, duration: 0.7 }, 0.54)
          .to('[data-hero-entry="note"]', { opacity: 1, y: 0, duration: 0.7 }, 0.62)
          .to('[data-hero-entry="service"]', { opacity: 1, y: 0, duration: 0.72, stagger: 0.07 }, 0.72)
          .to('[data-hero-entry="scroll"]', { opacity: 1, y: 0, duration: 0.65 }, 0.82);
      }

      let pointerFrame = 0;
      const handlePointer = (event: PointerEvent) => {
        if (reducedMotion || event.pointerType === "touch" || !image) return;
        window.cancelAnimationFrame(pointerFrame);
        pointerFrame = window.requestAnimationFrame(() => {
          const x = (event.clientX / window.innerWidth - 0.5) * 8;
          const y = (event.clientY / window.innerHeight - 0.5) * 5;
          image.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.012)`;
        });
      };

      let scrollFrame = 0;
      const handleScroll = () => {
        window.cancelAnimationFrame(scrollFrame);
        scrollFrame = window.requestAnimationFrame(() => {
          const progress = Math.min(window.scrollY / 300, 1);
          if (!reducedMotion) {
            if (content) {
              content.style.transform = `translate3d(0, ${progress * -28}px, 0)`;
              content.style.opacity = String(1 - progress * 0.36);
            }
            if (note) note.style.transform = `translate3d(0, ${progress * -12}px, 0)`;
            if (serviceRow) serviceRow.style.transform = `translate3d(0, ${progress * -10}px, 0)`;
          }
          siteHeader?.classList.toggle("is-hero-passed", window.scrollY > root.offsetHeight * 0.76);
        });
      };

      root.addEventListener("pointermove", handlePointer, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      document.documentElement.dataset.heroConceptReady = "true";
      window.dispatchEvent(new Event("hero-concept-ready"));

      cleanup = () => {
        window.cancelAnimationFrame(pointerFrame);
        window.cancelAnimationFrame(scrollFrame);
        root.removeEventListener("pointermove", handlePointer);
        window.removeEventListener("scroll", handleScroll);
        delete document.documentElement.dataset.heroConceptReady;
        gsap.killTweensOf([image, entrance, headlineLines]);
      };
    };

    void initialize();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={rootRef} id="topo" className={styles.hero} data-hero-concept>
      <div className={styles.heroImage} data-hero-image aria-hidden="true" />
      <div className={styles.heroShade} aria-hidden="true" />

      <header className={styles.heroHeader} data-hero-entry="header">
        <Link href="/" className={styles.brand} aria-label="Pedro Lucas — início">PL<span>.</span></Link>
        <nav aria-label="Navegação principal">
          <Link href="/#servicos">Soluções</Link>
          <Link href="/#projetos">Projetos</Link>
          <Link href="/#sobre">Sobre</Link>
          <Link href="/#contato">Contato</Link>
        </nav>
      </header>

      <div className={styles.heroContent} data-hero-content>
        <p className={styles.eyebrow} data-hero-entry="eyebrow">WEB DESIGN &amp; DESENVOLVIMENTO<span /></p>
        <h1>
          <span className={styles.lineMask}><span data-hero-line>Sites e sistemas</span></span>
          <span className={styles.lineMask}><span data-hero-line>para transformar ideias</span></span>
          <span className={styles.lineMask}><span data-hero-line>em negócios digitais<span className={styles.accent}>.</span></span></span>
        </h1>
        <p className={styles.support}>Projeto e desenvolvo experiências rápidas e estratégicas para apresentar sua oferta, organizar operações e fortalecer sua marca.</p>
        <div className={styles.actions} data-hero-entry="cta">
          <Link href={contactUrl} className={styles.cta}><span>Solicitar um projeto</span><i aria-hidden="true">→</i></Link>
          <Link href="/#servicos" className={styles.secondary}>Ver soluções <span aria-hidden="true">↓</span></Link>
        </div>
      </div>

      <aside className={styles.heroNote} data-hero-note data-hero-entry="note">
        Seu negócio.<br />Uma experiência<br />feita para ele.
      </aside>

      <div className={styles.heroBottom}>
        <div className={styles.scrollCue} data-hero-entry="scroll" aria-hidden="true">
          <span>SCROLL</span><i>↓</i>
        </div>
        <div className={styles.services} data-hero-services>
          {services.map((service) => (
            <Link key={service.title} href="/#servicos" data-hero-entry="service">
              <strong>{service.title}</strong>
              <span>{service.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
