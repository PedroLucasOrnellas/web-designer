"use client";

import Link from "next/link";
import Image from "next/image";
import Lenis from "lenis";
import { useCallback, useEffect, useRef, useState } from "react";
import { benefits, contactUrl, faqs, processSteps, projects, services } from "@/data/portfolio";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import styles from "./ProgressiveHome.module.css";

const heroProjects = ["epimoni-veiculos", "o-catalogo", "julie-doceria", "the-human-dataset"]
  .map((slug) => projects.find((item) => item.slug === slug)!);

const solutionProblems = [
  "Sua presença existe, mas ainda não explica com clareza o valor do negócio.",
  "A oferta chama atenção, mas não conduz naturalmente à próxima ação.",
  "A operação cresceu, mas as ferramentas não acompanharam a rotina.",
  "A experiência funciona, mas já não representa a evolução da marca.",
];
const lastService = services[services.length - 1];

const cinematicScrollEasing = (progress: number) => {
  const sample = (time: number, first: number, second: number) =>
    ((1 - 3 * second + 3 * first) * time + (3 * second - 6 * first)) * time * time + 3 * first * time;
  const slope = (time: number, first: number, second: number) =>
    3 * (1 - 3 * second + 3 * first) * time * time + 2 * (3 * second - 6 * first) * time + 3 * first;

  let time = progress;
  for (let iteration = 0; iteration < 5; iteration += 1) {
    const currentSlope = slope(time, 0.3, 0.3);
    if (Math.abs(currentSlope) < 0.0001) break;
    time -= (sample(time, 0.3, 0.3) - progress) / currentSlope;
  }

  return sample(Math.min(1, Math.max(0, time)), 0.5, 1);
};

function StepLabel({ children }: { children: React.ReactNode }) {
  return <p className={styles.stepLabel}>{children}</p>;
}

export function ProgressiveHome() {
  const [activeService, setActiveService] = useState(0);
  const [servicePhase, setServicePhase] = useState<"idle" | "leaving" | "entering">("idle");
  const [activeProject, setActiveProject] = useState(0);
  const [projectDirection, setProjectDirection] = useState(1);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const openingRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const activeServiceRef = useRef(0);
  const desiredServiceRef = useRef(0);
  const serviceTransitioningRef = useRef(false);
  const serviceTimersRef = useRef<number[]>([]);
  const project = projects[activeProject];

  const requestService = useCallback((requestedIndex: number) => {
    const index = Math.max(0, Math.min(services.length - 1, requestedIndex));
    desiredServiceRef.current = index;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || window.innerWidth < 981) {
      serviceTimersRef.current.forEach(window.clearTimeout);
      serviceTimersRef.current = [];
      serviceTransitioningRef.current = false;
      activeServiceRef.current = index;
      setActiveService(index);
      setServicePhase("idle");
      return;
    }

    if (serviceTransitioningRef.current || index === activeServiceRef.current) return;

    const runTransition = () => {
      const target = desiredServiceRef.current;
      if (target === activeServiceRef.current) {
        serviceTransitioningRef.current = false;
        setServicePhase("idle");
        return;
      }

      serviceTransitioningRef.current = true;
      setServicePhase("leaving");

      const swapTimer = window.setTimeout(() => {
        const nextService = desiredServiceRef.current;
        activeServiceRef.current = nextService;
        setActiveService(nextService);
        setServicePhase("entering");

        const settleTimer = window.setTimeout(() => {
          serviceTransitioningRef.current = false;
          setServicePhase("idle");
          if (desiredServiceRef.current !== activeServiceRef.current) runTransition();
        }, 520);
        serviceTimersRef.current.push(settleTimer);
      }, 180);
      serviceTimersRef.current.push(swapTimer);
    };

    runTransition();
  }, []);

  useEffect(() => () => {
    serviceTimersRef.current.forEach(window.clearTimeout);
    serviceTimersRef.current = [];
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const easing = (value: number) => Math.min(1, 1.001 - Math.pow(2, -10 * value));

    const start = () => {
      if (reducedMotion.matches || lenisRef.current) return;
      lenisRef.current = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        duration: 0.95,
        easing,
        wheelMultiplier: 0.82,
        touchMultiplier: 1,
        syncTouch: false,
        anchors: { duration: 0.9, easing },
      });
    };

    const syncPreference = () => {
      if (reducedMotion.matches) {
        lenisRef.current?.destroy();
        lenisRef.current = null;
        return;
      }
      start();
    };

    start();
    reducedMotion.addEventListener("change", syncPreference);
    return () => {
      reducedMotion.removeEventListener("change", syncPreference);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

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
      const section = faqRef.current;
      if (!section || window.innerWidth < 981) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const exitProgress = Math.min(1, Math.max(0, (progress - 0.64) / 0.32));
      section.style.setProperty("--faq-content-opacity", String(1 - exitProgress * 1.1));
      section.style.setProperty("--faq-content-scale", String(1 - exitProgress * 0.07));
      section.style.setProperty("--faq-content-y", `${exitProgress * -7}vh`);
      section.style.setProperty("--faq-content-blur", `${exitProgress * 5}px`);
      section.style.setProperty("--faq-darkness", String(exitProgress));
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

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let frame = 0;
    let chapterIsExiting = false;
    const update = () => {
      frame = 0;
      const section = projectsRef.current;
      if (!section) return;
      section.style.removeProperty("--projects-exit-opacity");
      section.style.removeProperty("--projects-exit-scale");
      section.style.removeProperty("--projects-exit-y");
      section.style.removeProperty("--projects-exit-blur");
      if (window.innerWidth < 981) {
        chapterIsExiting = false;
        section.dataset.chapterTransition = "rest";
        return;
      }
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      if (!chapterIsExiting && progress >= 0.56) chapterIsExiting = true;
      else if (chapterIsExiting && progress <= 0.48) chapterIsExiting = false;
      section.dataset.chapterTransition = chapterIsExiting ? "exiting" : "rest";
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

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = solutionsRef.current;
      if (!section || window.innerWidth < 981) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(0.999, Math.max(0, -rect.top / travel));
      const chapterProgress = Math.min(0.999, progress / 0.76);
      const exitProgress = Math.min(1, Math.max(0, (progress - 0.76) / 0.24));
      const headingProgress = Math.min(1, Math.max(0, (exitProgress - 0.2) / 0.62));
      section.style.setProperty("--solutions-content-opacity", String(Math.max(0, 1 - exitProgress * 1.35)));
      section.style.setProperty("--solutions-content-scale", String(1 - exitProgress * 0.38));
      section.style.setProperty("--solutions-content-y", `${exitProgress * -18}vh`);
      section.style.setProperty("--solutions-darkness", String(exitProgress));
      section.style.setProperty("--exit-line-scale", String(exitProgress));
      section.style.setProperty("--exit-caption-opacity", String(Math.min(1, exitProgress * 2.2)));
      section.style.setProperty("--project-heading-opacity", String(Math.min(1, headingProgress * 1.65)));
      section.style.setProperty("--project-heading-x", `${(1 - headingProgress) * -70}px`);
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        requestService(Math.min(services.length - 1, Math.floor(chapterProgress * services.length)));
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
  }, [requestService]);

  useEffect(() => {
    const opening = openingRef.current;
    if (!opening) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let currentScene = "";

    const update = () => {
      frame = 0;
      const staticLayout = reducedMotion.matches || window.innerWidth < 981;

      if (staticLayout) {
        opening.dataset.openingScene = "static";
        opening.style.removeProperty("--hero-scale");
        opening.style.removeProperty("--hero-y");
        opening.style.removeProperty("--hero-opacity");
        opening.style.removeProperty("--hero-blur");
        opening.style.removeProperty("--scene-scale");
        opening.style.removeProperty("--scene-y");
        opening.style.removeProperty("--scene-z");
        opening.style.removeProperty("--scene-rotate");
        opening.style.removeProperty("--scene-opacity");
        opening.style.removeProperty("--scene-radius");
        opening.style.removeProperty("--message-progress");
        opening.style.removeProperty("--message-y");
        opening.style.removeProperty("--message-late-progress");
        opening.style.removeProperty("--message-late-y");
        opening.style.removeProperty("--signals-progress");
        opening.style.removeProperty("--signals-y");
        return;
      }

      const rect = opening.getBoundingClientRect();
      const travel = Math.max(1, opening.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const sceneProgress = Math.min(1, Math.max(0, (progress - 0.08) / 0.72));
      const messageProgress = Math.min(1, Math.max(0, (progress - 0.42) / 0.3));
      const messageLateProgress = Math.min(1, Math.max(0, (progress - 0.5) / 0.28));
      const signalsProgress = Math.min(1, Math.max(0, (progress - 0.68) / 0.24));
      const nextScene = progress > 0.62 ? "conflict" : "hero";

      opening.style.setProperty("--hero-scale", String(1 - progress * 0.12));
      opening.style.setProperty("--hero-y", `${progress * -9}vh`);
      opening.style.setProperty("--hero-opacity", String(Math.max(0, 1 - progress * 1.38)));
      opening.style.setProperty("--hero-blur", `${progress * 14}px`);
      opening.style.setProperty("--scene-scale", String(1.08 - sceneProgress * 0.08));
      opening.style.setProperty("--scene-y", `${(1 - sceneProgress) * -8}vh`);
      opening.style.setProperty("--scene-z", `${(1 - sceneProgress) * 420}px`);
      opening.style.setProperty("--scene-rotate", `${(1 - sceneProgress) * -5}deg`);
      opening.style.setProperty("--scene-opacity", String(Math.min(1, sceneProgress * 1.7)));
      opening.style.setProperty("--scene-radius", `${(1 - sceneProgress) * 38}px`);
      opening.style.setProperty("--message-progress", String(messageProgress));
      opening.style.setProperty("--message-y", `${(1 - messageProgress) * 54}px`);
      opening.style.setProperty("--message-late-progress", String(messageLateProgress));
      opening.style.setProperty("--message-late-y", `${(1 - messageLateProgress) * 54}px`);
      opening.style.setProperty("--signals-progress", String(signalsProgress));
      opening.style.setProperty("--signals-y", `${(1 - signalsProgress) * 24}px`);

      if (nextScene !== currentScene) {
        opening.dataset.openingScene = nextScene;
        currentScene = nextScene;
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let frame = 0;
    let chapterHasArrived = false;
    let chapterIsDeparting = false;
    let chapterSnapArmed = true;
    let chapterSnapInProgress = false;
    let nativeUnlockTimer = 0;
    let lastScrollY = window.scrollY;
    const update = () => {
      frame = 0;
      const section = processRef.current;
      if (!section) return;
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY + 0.5;
      section.style.removeProperty("--process-entry-opacity");
      section.style.removeProperty("--process-heading-y");
      section.style.removeProperty("--process-line-scale");
      section.style.removeProperty("--process-system-opacity");
      section.style.removeProperty("--process-system-scale");
      section.style.removeProperty("--process-system-y");
      section.style.removeProperty("--process-system-blur");
      section.querySelectorAll<HTMLElement>("[data-process-step]").forEach((step) => {
        step.style.removeProperty("--assemble-y");
        step.style.removeProperty("--assemble-rotate");
      });
      if (window.innerWidth < 981) {
        chapterHasArrived = false;
        chapterIsDeparting = false;
        section.dataset.chapterArrival = "waiting";
        section.dataset.chapterDeparture = "rest";
        lastScrollY = currentScrollY;
        return;
      }
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(0.999, Math.max(0, -rect.top / travel));
      const chapterProgress = Math.min(0.999, Math.max(0, (progress - 0.18) / 0.82));
      if (!chapterHasArrived && rect.top <= window.innerHeight * 0.9) chapterHasArrived = true;
      else if (chapterHasArrived && rect.top >= window.innerHeight * 1.02) chapterHasArrived = false;
      if (!chapterIsDeparting && progress >= 0.87) chapterIsDeparting = true;
      else if (chapterIsDeparting && progress <= 0.8) chapterIsDeparting = false;
      if (progress <= 0.72) chapterSnapArmed = true;
      section.dataset.chapterArrival = chapterHasArrived ? "arrived" : "waiting";
      section.dataset.chapterDeparture = chapterIsDeparting ? "departing" : "rest";
      if (scrollingDown && progress >= 0.87 && chapterSnapArmed && !chapterSnapInProgress) {
        const nextSection = trustRef.current;
        if (nextSection) {
          chapterSnapArmed = false;
          chapterSnapInProgress = true;
          const target = currentScrollY + nextSection.getBoundingClientRect().top;
          if (lenisRef.current) {
            lenisRef.current.scrollTo(target, {
              duration: 2.16,
              easing: cinematicScrollEasing,
              lock: true,
              onComplete: () => { chapterSnapInProgress = false; },
            });
          } else {
            window.scrollTo({ top: target, behavior: "smooth" });
            nativeUnlockTimer = window.setTimeout(() => { chapterSnapInProgress = false; }, 2200);
          }
        }
      }
      lastScrollY = currentScrollY;
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        setActiveProcess(Math.min(processSteps.length - 1, Math.floor(chapterProgress * processSteps.length)));
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
      if (nativeUnlockTimer) window.clearTimeout(nativeUnlockTimer);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let frame = 0;
    let chapterHasArrived = false;
    const update = () => {
      frame = 0;
      const section = trustRef.current;
      if (!section) return;
      section.style.removeProperty("--trust-heading-opacity");
      section.style.removeProperty("--trust-heading-x");
      section.style.removeProperty("--trust-line-scale");
      section.style.removeProperty("--trust-signature-opacity");
      section.style.removeProperty("--trust-signature-y");
      section.querySelectorAll<HTMLElement>("[data-trust-benefit]").forEach((benefit) => {
        benefit.style.removeProperty("--benefit-opacity");
        benefit.style.removeProperty("--benefit-y");
        benefit.style.removeProperty("--benefit-blur");
      });
      if (window.innerWidth < 981) {
        chapterHasArrived = false;
        section.dataset.chapterArrival = "waiting";
        return;
      }
      const rect = section.getBoundingClientRect();
      if (!chapterHasArrived && rect.top <= window.innerHeight * 0.68) chapterHasArrived = true;
      else if (chapterHasArrived && rect.top >= window.innerHeight * 0.8) chapterHasArrived = false;
      section.dataset.chapterArrival = chapterHasArrived ? "arrived" : "waiting";
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

  const selectProject = (index: number) => {
    const normalizedIndex = (index + projects.length) % projects.length;
    if (normalizedIndex !== activeProject) {
      setProjectDirection(normalizedIndex > activeProject ? 1 : -1);
      setActiveProject(normalizedIndex);
    }
  };

  const changeProject = (direction: number) => selectProject(activeProject + direction);

  const selectProcess = (index: number) => {
    setActiveProcess(index);
    const section = processRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!section || reducedMotion || window.innerWidth < 981) return;
    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const targetProgress = 0.18 + (index / processSteps.length) * 0.82;
    const target = sectionTop + targetProgress * travel + 1;
    if (lenisRef.current) lenisRef.current.scrollTo(target, { duration: 0.9 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const selectService = (index: number) => {
    requestService(index);
    const section = solutionsRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!section || reducedMotion || window.innerWidth < 981) return;
    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const target = sectionTop + (index / services.length) * travel + 1;
    if (lenisRef.current) lenisRef.current.scrollTo(target, { duration: 0.9 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return <>
    <main className={styles.page} data-progressive-home>
      <div ref={openingRef} className={styles.storyOpening} data-opening-scene="hero">
      <div className={styles.openingSticky}>
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
        <div className={styles.pauseInner}>
          <StepLabel>02 / O PROBLEMA</StepLabel>
          <h2><span>Antes da interface,</span><span>clareza sobre o problema.</span></h2>
          <p className={styles.pauseLead}>Quando a experiência não deixa claro o valor, o próximo passo também deixa de ser claro.</p>
          <div className={styles.problemSignals} aria-label="Problemas que orientam o projeto">
            <span>A oferta não fica clara.</span>
            <span>O site não representa mais o negócio.</span>
            <span>As ferramentas não acompanharam o crescimento.</span>
          </div>
        </div>
      </section>
      </div>
      </div>

      <section ref={solutionsRef} className={styles.solutions} id="servicos" aria-labelledby="solutions-title" data-service-accordion data-service-phase={servicePhase}>
        <div className={styles.solutionsInner}>
        <div className={styles.sectionIntro}>
          <StepLabel>03 / ENCONTRAR DIREÇÃO</StepLabel>
          <h2 id="solutions-title">O problema raramente<br />é apenas visual.</h2>
          <p>Estratégia, conteúdo, design e tecnologia precisam responder à mesma necessidade.</p>
          <div className={styles.problemResponse}>
            <small>O QUE PRECISA MUDAR</small>
            <strong key={`problem-copy-${activeService}`}>{solutionProblems[activeService]}</strong>
            <span key={`problem-response-${activeService}`}><i /> RESPOSTA {services[activeService].index}</span>
          </div>
        </div>
        <div className={styles.solutionStage}>
          <div className={styles.solutionProgress} aria-hidden="true"><span>{services[activeService].index} / {String(services.length).padStart(2, "0")}</span><i><b style={{ width: `${((activeService + 1) / services.length) * 100}%` }} /></i></div>
          <div className={styles.serviceAccordion}>
          {services.map((service, index) => {
            const active = activeService === index;
            const panelId = `service-panel-${index}`;
            return <article className={active ? styles.isActive : undefined} key={service.index}>
              <button type="button" onClick={() => selectService(index)} aria-expanded={active} aria-controls={panelId}>
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
          <div className={styles.desktopServiceDetails} key={`desktop-service-${activeService}`} aria-live="polite">
            <p>{services[activeService].description}</p>
            <div className={styles.serviceDetails}><div><small>O QUE É ENTREGUE</small><span>{services[activeService].delivery}</span></div><div><small>PARA O SEU NEGÓCIO</small><span>{services[activeService].benefit}</span></div></div>
            <Link href={contactUrl}>Conversar sobre esta solução <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className={styles.solutionExitLayer} aria-hidden="true">
          <div className={styles.solutionExitLine} />
          <div className={styles.solutionExitHeading}>
            <StepLabel>04 / VER NA PRÁTICA</StepLabel>
            <h2>Ideias ganham forma.</h2>
            <p>Cada projeto conecta um problema real a decisões de experiência e desenvolvimento.</p>
          </div>
          <div className={styles.solutionExitCaption}><small>DA DIREÇÃO À PROVA</small><strong><span>{lastService.index}</span>{lastService.title}</strong></div>
        </div>
        </div>
      </section>

      <section ref={projectsRef} className={styles.projects} id="projetos" aria-labelledby="projects-title" data-project-carousel>
        <div className={styles.projectsInner}>
        <div className={styles.projectsHeading}>
          <StepLabel>04 / VER NA PRÁTICA</StepLabel>
          <h2 id="projects-title">Ideias ganham forma.</h2>
          <p>Cada projeto conecta um problema real a decisões de experiência e desenvolvimento.</p>
        </div>
        <div className={styles.projectChapter} style={{ "--project-color": project.accent } as React.CSSProperties}>
        <article className={styles.projectCard} data-direction={projectDirection} aria-live="polite">
          <div className={styles.projectCopy} key={`copy-${project.slug}`}>
            <span>{project.index} / {String(projects.length).padStart(2, "0")} · {project.shortCategory}</span>
            <h3>{project.name}</h3>
            <p className={styles.projectLead}>{project.description}</p>
            <Link href={`/projetos/${project.slug}`}>Ver case <span aria-hidden="true">→</span></Link>
          </div>
          <div className={styles.projectVisual} key={`visual-${project.slug}`}><ProjectVisual project={project} /></div>
          <div className={styles.projectNav} aria-label="Selecionar projeto">
            <button type="button" onClick={() => changeProject(-1)} aria-label="Projeto anterior">←</button>
            <button type="button" onClick={() => changeProject(1)} aria-label="Próximo projeto">→</button>
          </div>
        </article>
        </div>
        <div className={styles.projectPreviewRail} aria-label="Escolher projeto">
          {projects.map((item, index) => <button
            key={`preview-${item.slug}`}
            type="button"
            className={index === activeProject ? styles.isActive : undefined}
            style={{ "--preview-color": item.accent } as React.CSSProperties}
            onMouseEnter={() => selectProject(index)}
            onFocus={() => selectProject(index)}
            onClick={() => selectProject(index)}
            aria-label={`Mostrar ${item.name}`}
            aria-pressed={index === activeProject}
          >
            {item.image && <Image src={item.image} alt="" fill sizes="(max-width: 980px) 0px, 22vw" />}
            <span><small>{item.index}</small>{item.name}</span>
          </button>)}
        </div>
        </div>
        <div className={styles.mobileProjectChapters}>
          <div className={styles.mobileProjectsHeading}><StepLabel>04 / VER NA PRÁTICA</StepLabel><h2>Ideias ganham forma.</h2><p>Cada projeto conecta um problema real a decisões de experiência e desenvolvimento.</p></div>
          {projects.map((item) => <article className={styles.mobileProjectChapter} key={`mobile-${item.slug}`} style={{ "--project-color": item.accent } as React.CSSProperties}>
            <span>{item.index} / {String(projects.length).padStart(2, "0")} · {item.shortCategory}</span>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className={styles.mobileProjectVisual}><ProjectVisual project={item} /></div>
            <Link href={`/projetos/${item.slug}`}>Ver case <span aria-hidden="true">→</span></Link>
          </article>)}
        </div>
        <nav className={styles.allProjectLinks} aria-label="Todos os projetos">
          {projects.map((item) => <Link key={item.slug} href={`/projetos/${item.slug}`}>{item.name}</Link>)}
        </nav>
      </section>

      <section ref={processRef} className={styles.process} id="processo" aria-labelledby="process-title" data-process-tabs>
        <div className={styles.processInner}>
          <div className={styles.processSystem}>
          <div className={styles.processHeading}>
            <StepLabel>05 / COMO FUNCIONA</StepLabel>
            <h2 id="process-title">Você sabe onde está<br />e o que vem depois.</h2>
            <p>Cada etapa reduz incertezas sem exigir que você absorva o processo inteiro de uma vez.</p>
          </div>
          <div className={styles.processProgress} aria-hidden="true"><i style={{ width: `${((activeProcess + 1) / processSteps.length) * 100}%` }} /></div>
          <div className={styles.processSteps}>
            {processSteps.map((step, index) => {
              const active = activeProcess === index;
              const state = active ? "active" : index < activeProcess ? "complete" : "upcoming";
              return <button type="button" className={active ? styles.isActive : undefined} data-process-step data-state={state} key={step.index} onClick={() => selectProcess(index)} aria-pressed={active}>
                <span>{step.index}</span><strong>{step.title}</strong><span className={styles.processDescription}>{step.description}</span>
              </button>;
            })}
          </div>
          <p className={styles.reassurance}><i /> REVISÕES E DECISÕES COMPARTILHADAS EM CADA MARCO</p>
          </div>
        </div>
      </section>

      <section ref={trustRef} className={styles.trust} id="sobre" aria-labelledby="trust-title">
        <div className={styles.trustInner}>
        <div className={styles.trustContinuity} aria-hidden="true"><span>UM SISTEMA · UMA RESPONSABILIDADE</span><i /></div>
        <div className={styles.trustHeading}>
          <StepLabel>06 / POR QUE TRABALHAR COMIGO</StepLabel>
          <h2 id="trust-title">O projeto inteiro,<br />sem ruído.</h2>
          <p>Você fala diretamente com quem entende o negócio, desenha a experiência e constrói a interface.</p>
        </div>
        <div className={styles.benefitList}>
          {benefits.slice(0, 3).map((benefit, index) => <article key={benefit.title} data-trust-benefit><span>{String(index + 1).padStart(2, "0")}</span><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}
        </div>
        <div className={styles.signature}><strong>Pedro Lucas<span>.</span></strong><p>Estratégia · Design · Frontend</p></div>
        </div>
      </section>

      <section ref={faqRef} className={styles.faq} id="faq" aria-labelledby="faq-title" data-faq-accordion>
        <div className={styles.faqInner}>
        <div className={styles.faqIntro}><StepLabel>07 / TIRAR DÚVIDAS</StepLabel><h2 id="faq-title">Só o que você<br />quiser abrir.</h2><p>As respostas ficam disponíveis sem interromper o fluxo principal.</p></div>
        <div className={styles.faqList} data-has-active={activeFaq >= 0}>
          {faqs.map((faq, index) => {
            const active = activeFaq === index;
            return <article className={active ? styles.isActive : undefined} key={faq.question}>
              <button type="button" onClick={() => setActiveFaq(active ? -1 : index)} aria-expanded={active} aria-controls={`faq-answer-${index}`}><span>{faq.question}</span><i aria-hidden="true">+</i></button>
              <div id={`faq-answer-${index}`} className={styles.faqAnswer} data-open={active} aria-hidden={!active}><div><p>{faq.answer}</p></div></div>
            </article>;
          })}
        </div>
        </div>
      </section>

      <section className={styles.contact} id="contato" aria-labelledby="contact-title">
        <StepLabel>08 / CONVERSAR</StepLabel>
        <h2 id="contact-title"><span>Tem um site, sistema</span><span>ou ideia para tirar</span><span>do papel?</span></h2>
        <p>Conte brevemente o que você precisa e receba uma direção inicial para o projeto.</p>
        <Link href={contactUrl}>Conversar sobre o projeto <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
    <footer className={styles.footer}><span>PL.</span><p>© {new Date().getFullYear()} Pedro Lucas</p><a href="#topo">Voltar ao topo ↑</a></footer>
  </>;
}
