"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import styles from "./HeroConcept.module.css";

function SiteViewport() {
  return (
    <div className={styles.siteViewport} data-site-viewport>
      <header className={styles.screenHeader}>
        <Link href="/" className={styles.screenBrand} aria-label="Pedro Lucas — início">
          PL<span>.</span>
        </Link>
        <nav aria-label="Navegação do portfólio">
          <Link href="/#projetos">Projetos</Link>
          <Link href="/#servicos">Serviços</Link>
          <Link href="/#sobre">Sobre</Link>
          <Link href="/#contato">Contato</Link>
        </nav>
        <span className={styles.screenIndex}>01 / 04</span>
      </header>

      <div className={styles.screenMain}>
        <div className={styles.screenLabel}>
          <i /> Web Design &amp; Desenvolvimento
        </div>
        <div className={styles.screenHeroGrid}>
          <h1>
            Design digital
            <br />
            com propósito<span>.</span>
          </h1>
          <div className={styles.screenIntro}>
            <p>
              Estratégia, direção visual e desenvolvimento unidos para transformar ideias em experiências digitais claras e memoráveis.
            </p>
            <Link href="/#projetos">Explorar projetos <span>↗</span></Link>
          </div>
        </div>
        <div className={styles.screenPreview} aria-label="Prévia das áreas de atuação">
          <article><span>01</span><strong>Estratégia</strong><small>Clareza antes da interface.</small></article>
          <article><span>02</span><strong>Design</strong><small>Sistemas visuais com intenção.</small></article>
          <article><span>03</span><strong>Desenvolvimento</strong><small>Experiências rápidas e precisas.</small></article>
        </div>
      </div>
    </div>
  );
}

function LetterText({ text, accentLast = false }: { text: string; accentLast?: boolean }) {
  return Array.from(text).map((character, index) => (
    <span
      key={`${character}-${index}`}
      className={`${styles.copyLetter}${accentLast && index === text.length - 1 ? ` ${styles.copyAccent}` : ""}`}
      data-copy-letter
      aria-hidden="true"
    >
      {character === " " ? "\u00a0" : character}
    </span>
  ));
}

export function HeroConcept() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let cleanup = () => {};

    const initialize = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      await document.fonts.ready;
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const debug = new URLSearchParams(window.location.search).has("debug-motion");
      {
        const laptop = root.querySelector<HTMLElement>("[data-concept-laptop]");
        const laptopRig = root.querySelector<HTMLElement>("[data-laptop-rig]");
        const sideCopy = root.querySelectorAll<HTMLElement>("[data-side-copy]");
        const sideTraces = root.querySelectorAll<HTMLElement>("[data-side-trace-line]");
        const sideTraceDots = root.querySelectorAll<HTMLElement>("[data-side-trace-dot]");
        const topIndicator = root.querySelector<HTMLElement>("[data-top-indicator]");
        const scrollIndicator = root.querySelector<HTMLElement>("[data-scroll-indicator]");
        const frame = root.querySelector<HTMLElement>("[data-screen-frame]");
        const base = root.querySelector<HTMLElement>("[data-laptop-base]");
        const laptopLid = root.querySelector<HTMLElement>("[data-laptop-lid]");
        const laptopScreen = laptop?.querySelector<HTMLElement>("[data-site-viewport]");
        const screenPower = root.querySelector<HTMLElement>("[data-screen-power]");
        const mobilePhone = root.querySelector<HTMLElement>("[data-mobile-phone]");
        const mobileFrame = root.querySelector<HTMLElement>("[data-mobile-frame]");
        const mobileScreen = root.querySelector<HTMLElement>("[data-mobile-screen]");
        const mobileCopy = root.querySelector<HTMLElement>("[data-mobile-copy]");
        const mobileSupport = root.querySelector<HTMLElement>("[data-mobile-support]");
        const mobileScroll = root.querySelector<HTMLElement>("[data-mobile-scroll]");
        const siteHeader = document.querySelector<HTMLElement>('[data-header][data-after-hero="true"]');
        if (!laptop || !laptopRig || !frame || !base) return;

        const hideSiteHeader = () => siteHeader?.classList.remove("is-hero-passed");
        const showSiteHeader = () => siteHeader?.classList.add("is-hero-passed");
        const media = gsap.matchMedia();
        const createTakeover = (initialScale: number, end: string, scrub: number) => {
          gsap.set(laptop, { scale: initialScale, force3D: true });
          gsap.set(laptopRig, { y: 0, force3D: true });
          gsap.set([frame, base], { opacity: 1 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end,
              pin: root.querySelector<HTMLElement>("[data-hero-stage]"),
              scrub,
              anticipatePin: 1,
              invalidateOnRefresh: false,
              refreshPriority: 10,
              markers: debug,
              onEnter: hideSiteHeader,
              onEnterBack: hideSiteHeader,
              onLeave: showSiteHeader,
              onLeaveBack: hideSiteHeader,
            },
          });

          timeline
            .to({}, { duration: 0.15 })
            .to(sideCopy, { opacity: 0, xPercent: (index) => index === 0 ? -8 : 8, duration: 0.2, ease: "power2.inOut" }, 0.15)
            .to([topIndicator, scrollIndicator], { opacity: 0, duration: 0.2 }, 0.15)
            .to(laptop, { scale: initialScale * 1.16, duration: 0.2, ease: "power2.inOut" }, 0.15)
            .to(laptop, { scale: 1, duration: 0.4, ease: "power1.inOut" }, 0.35)
            .to(frame, { opacity: 0, borderRadius: 0, duration: 0.15, ease: "power2.out" }, 0.75)
            .to(base, { opacity: 0, yPercent: 180, duration: 0.15, ease: "power2.in" }, 0.75)
            .to(laptop, { scale: 1, duration: 0.1 }, 0.9);
        };

        const createMobileTakeover = () => {
          if (!mobilePhone || !mobileFrame || !mobileScreen || !mobileCopy || !mobileSupport || !mobileScroll) return;
          gsap.set(mobilePhone, { scale: 0.48, force3D: true });
          gsap.set(mobileFrame, { opacity: 1 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=70%",
              pin: root.querySelector<HTMLElement>("[data-hero-stage]"),
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: false,
              refreshPriority: 10,
              markers: debug,
              onEnter: hideSiteHeader,
              onEnterBack: hideSiteHeader,
              onLeave: showSiteHeader,
              onLeaveBack: hideSiteHeader,
            },
          });

          timeline
            .to([mobileCopy, mobileSupport], { opacity: 0, y: (index) => index === 0 ? -18 : 18, duration: 0.22, ease: "power2.inOut" }, 0)
            .to(mobileScroll, { opacity: 0, duration: 0.16 }, 0)
            .to(mobilePhone, { scale: 1, duration: 0.7, ease: "power1.inOut" }, 0.15)
            .to(mobileFrame, { opacity: 0, duration: 0.17, ease: "power2.out" }, 0.78)
            .to(mobileScreen, { borderRadius: 0, duration: 0.17, ease: "power2.out" }, 0.78)
            .to(mobilePhone, { scale: 1, duration: 0.05 }, 0.95);
        };

        const createLaptopIntro = (startAngle: number, perspective: number) => {
          if (!laptopLid || !laptopScreen || !screenPower) return;
          const openingPerspective = Math.min(5200, perspective * 2.35);
          gsap.set(laptopRig, { perspective: openingPerspective, perspectiveOrigin: "50% 100%" });
          gsap.set(laptopLid, { transformOrigin: "50% 100%", rotationX: startAngle, force3D: true });
          gsap.set(laptopScreen, { opacity: 0.16, filter: "brightness(0.08)" });
          gsap.set(screenPower, { opacity: 1 });
          gsap.set(base, { opacity: 0, y: 14 });
          gsap.set(sideTraces, { scaleX: 0 });
          gsap.set(sideTraceDots, { opacity: 0, scale: 0.45 });
          sideCopy.forEach((copy) => {
            gsap.set(copy.querySelectorAll<HTMLElement>("[data-copy-letter]"), {
              opacity: 0,
              y: "0.35em",
              filter: "blur(10px)",
            });
          });

          const traceStart = 1.18;
          const traceDuration = 0.7728;
          const traceEnd = traceStart + traceDuration;
          const lettersStart = traceStart + traceDuration * 0.95;
          const letterDuration = 0.5796;
          const letterStagger = 0.03588;

          const timeline = gsap.timeline();
          timeline
            .to(base, { opacity: 1, y: 0, duration: 0.34, ease: "power2.out" }, 0)
            .to(laptopLid, { rotationX: 0, duration: 1.18, ease: "power3.out" }, 0)
            .to(laptopRig, { perspective, duration: 0.24, ease: "power2.out" }, 0.94)
            .to(laptopScreen, { opacity: 1, filter: "brightness(1)", duration: 0.48, ease: "power2.out" }, 1.02)
            .to(screenPower, { opacity: 0, duration: 0.42, ease: "power2.out" }, 1.04)
            .to(sideTraces, { scaleX: 1, duration: traceDuration, ease: "power3.inOut" }, traceStart)
            .to(sideTraceDots, { opacity: 1, scale: 1, duration: 0.276, ease: "back.out(2)" }, traceEnd);

          let nextCopyStart = lettersStart;
          sideCopy.forEach((copy) => {
            const letters = copy.querySelectorAll<HTMLElement>("[data-copy-letter]");
            timeline.to(letters, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: letterDuration,
              stagger: letterStagger,
              ease: "power2.inOut",
            }, nextCopyStart);
            nextCopyStart += letterDuration + Math.max(0, letters.length - 1) * letterStagger;
          });
        };

        media.add("(min-width: 1200px) and (prefers-reduced-motion: no-preference)", () => createTakeover(0.38, "+=200%", 0.85));
        media.add("(min-width: 768px) and (max-width: 1199px) and (prefers-reduced-motion: no-preference)", () => createTakeover(0.53, "+=135%", 0.75));
        media.add("(min-width: 1200px) and (prefers-reduced-motion: no-preference)", () => {
          const adaptivePerspective = Math.min(2400, Math.max(1600, window.innerWidth * (1600 / 1440)));
          createLaptopIntro(-102, adaptivePerspective);
        });
        media.add("(min-width: 768px) and (max-width: 1199px) and (prefers-reduced-motion: no-preference)", () => createLaptopIntro(-95, 1600));
        media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", createMobileTakeover);
        media.add("(prefers-reduced-motion: reduce)", () => {
          showSiteHeader();
          gsap.set([sideCopy, topIndicator, scrollIndicator, laptopRig, laptop, frame, base], { clearProps: "all" });
          if (mobilePhone && mobileFrame && mobileScreen && mobileCopy && mobileSupport && mobileScroll) {
            gsap.set([mobilePhone, mobileFrame, mobileScreen, mobileCopy, mobileSupport, mobileScroll], { clearProps: "all" });
          }
        });

        cleanup = () => media.revert();
      }

      requestAnimationFrame(() => ScrollTrigger.refresh(true));
      document.documentElement.dataset.heroConceptReady = "true";
      window.dispatchEvent(new Event("hero-concept-ready"));
      cleanup = ((previous) => () => {
        delete document.documentElement.dataset.heroConceptReady;
        previous();
      })(cleanup);
    };

    void initialize();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={rootRef} id="topo" className={styles.heroTakeover} data-hero-concept>
      <section className={styles.heroStage} data-hero-stage aria-label="Hero conceitual">
        <div className={styles.ambientLight} aria-hidden="true" />

        <div className={styles.topIndicator} data-top-indicator aria-hidden="true">
          <i /><span>01</span><b />
        </div>

        <div className={`${styles.sideCopy} ${styles.sideCopyLeft}`} data-side-copy>
          <span className={styles.sideTrace} data-side-trace aria-hidden="true"><i data-side-trace-line /><b data-side-trace-dot /></span>
          <span aria-label="SITES"><LetterText text="SITES" /></span>
          <small aria-label="que"><LetterText text="que" /></small>
          <strong aria-label="TRANSFORMAM."><LetterText text="TRANSFORMAM." accentLast /></strong>
        </div>

        <div className={styles.laptopRig} data-laptop-rig>
          <div className={styles.laptop} data-concept-laptop>
            <div className={styles.laptopLid} data-laptop-lid>
              <div className={styles.laptopLidBack} aria-hidden="true" />
              <div className={styles.laptopLidEdge} aria-hidden="true" />
              <div className={styles.screenFrame} data-screen-frame aria-hidden="true"><i /></div>
              <SiteViewport />
              <div className={styles.screenPower} data-screen-power aria-hidden="true" />
            </div>
            <div className={styles.laptopBase} data-laptop-base aria-hidden="true"><i /></div>
          </div>
        </div>

        <div className={`${styles.sideCopy} ${styles.sideCopyRight}`} data-side-copy>
          <span className={styles.sideTrace} data-side-trace aria-hidden="true"><i data-side-trace-line /><b data-side-trace-dot /></span>
          <span aria-label="IDEIAS"><LetterText text="IDEIAS" /></span>
          <small aria-label="em"><LetterText text="em" /></small>
          <strong aria-label="EXPERIÊNCIAS."><LetterText text="EXPERIÊNCIAS." accentLast /></strong>
        </div>

        <div className={styles.scrollIndicator} data-scroll-indicator aria-hidden="true">
          <span>ROLE PARA EXPLORAR</span><i /><b>⌄</b>
        </div>

        <div className={styles.mobileCopy} data-mobile-copy>
          <span>WEB DESIGN &amp; DESENVOLVIMENTO</span>
          <h1>Sites que transformam ideias<span>.</span></h1>
        </div>

        <div className={styles.mobilePhoneRig}>
          <div className={styles.mobilePhone} data-mobile-phone>
            <div className={styles.mobilePhoneScreen} data-mobile-screen>
              <SiteViewport />
            </div>
            <div className={styles.mobilePhoneFrame} data-mobile-frame aria-hidden="true"><i /></div>
          </div>
        </div>

        <p className={styles.mobileSupport} data-mobile-support>
          Uma experiência digital pensada para caber na sua mão — e crescer além da tela.
        </p>

        <div className={styles.mobileScroll} data-mobile-scroll aria-hidden="true">
          <span>ROLE PARA ENTRAR</span><i /><b>⌄</b>
        </div>
      </section>
    </div>
  );
}
