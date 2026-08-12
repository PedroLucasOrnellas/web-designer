"use client";

import { useLayoutEffect } from "react";

export function MotionEngine() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let dispose = () => {};

    const initialize = async () => {
      const [gsapModule, scrollModule] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      await document.fonts.ready;
      const conceptHero = document.querySelector<HTMLElement>("[data-hero-concept]");
      if (conceptHero && document.documentElement.dataset.heroConceptReady !== "true") {
        await new Promise<void>((resolve) => {
          const fallback = window.setTimeout(resolve, 2500);
          window.addEventListener("hero-concept-ready", () => {
            window.clearTimeout(fallback);
            resolve();
          }, { once: true });
        });
      }
      const criticalImages = Array.from(document.querySelectorAll<HTMLImageElement>("[data-hero-pin] img"));
      await Promise.allSettled(criticalImages.map((image) => image.decode?.()));
      if (cancelled) return;

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const markers = new URLSearchParams(window.location.search).has("debug-motion");

      const contexts: Array<{ revert(): void }> = [];
      const mediaQueries: Array<{ revert(): void }> = [];

      const hero = document.querySelector<HTMLElement>("[data-motion-hero]");
      const heroPin = hero?.querySelector<HTMLElement>("[data-hero-pin]");
      const heroContent = hero?.querySelector<HTMLElement>("[data-hero-content]");
      const laptop = hero?.querySelector<HTMLElement>("[data-laptop-wrapper]");
      const screen = hero?.querySelector<HTMLElement>("[data-laptop-screen]");
      const frame = hero?.querySelector<HTMLElement>("[data-laptop-frame]");
      const base = hero?.querySelector<HTMLElement>("[data-laptop-base]");
      const takeover = hero?.querySelector<HTMLElement>("[data-takeover-content]");

      if (hero && heroPin && heroContent && laptop && screen && frame && base && takeover) {
        const media = gsap.matchMedia();
        mediaQueries.push(media);
        {
          const createTimeline = (distance: string, scrub: number) => {
            const screenRect = screen.getBoundingClientRect();
            const targetScale = Math.max(window.innerWidth / screenRect.width, window.innerHeight / screenRect.height) * 1.06;
            const targetX = window.innerWidth / 2 - (screenRect.left + screenRect.width / 2);
            const targetY = window.innerHeight / 2 - (screenRect.top + screenRect.height / 2);

            gsap.set(takeover, { clipPath: "inset(100% 0 0 0)" });
            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: heroPin,
                start: "top top",
                end: distance,
                pin: true,
                scrub,
                anticipatePin: 1,
                invalidateOnRefresh: false,
                markers,
              },
            });

            timeline
              .to({}, { duration: 0.25 })
              .to(heroContent, { xPercent: -10, clipPath: "inset(0 100% 0 0)", duration: 0.3, ease: "power2.inOut" }, 0.25)
              .to(laptop, { x: targetX, y: targetY, scale: targetScale, duration: 0.4, ease: "power2.inOut" }, 0.25)
              .to(frame, { opacity: 0, duration: 0.2, ease: "power2.out" }, 0.65)
              .to(base, { opacity: 0, yPercent: 80, duration: 0.2, ease: "power2.in" }, 0.65)
              .to(screen, { borderRadius: 0, duration: 0.2, ease: "power2.out" }, 0.65)
              .to(takeover, { clipPath: "inset(0 0 0 0)", duration: 0.15, ease: "power3.out" }, 0.85);
          };

          media.add("(min-width: 1200px)", () => createTimeline("+=160%", 0.9));
          media.add("(min-width: 769px) and (max-width: 1199px)", () => createTimeline("+=90%", 0.75));
          media.add("(max-width: 768px)", () => {
            gsap.set([heroContent, laptop, screen, frame, base, takeover], { clearProps: "all" });
          });
        }
      }

      const projectsSection = document.querySelector<HTMLElement>("[data-projects-showcase]");
      const projectsStage = projectsSection?.querySelector<HTMLElement>("[data-projects-stage]");
      const cards = projectsStage ? Array.from(projectsStage.querySelectorAll<HTMLElement>("[data-project-card]")) : [];

      if (projectsSection && projectsStage && cards.length > 1) {
        const context = gsap.context(() => {
          const media = gsap.matchMedia();
          media.add("(min-width: 768px)", () => {
            const current = projectsSection.querySelector<HTMLElement>("[data-projects-current]");
            const progress = Array.from(projectsSection.querySelectorAll<HTMLElement>("[data-project-progress]"));
            const visuals = cards.map((card) => card.querySelector<HTMLElement>("[data-project-visual-inner]"));
            const titles = cards.map((card) => card.querySelector<HTMLElement>(".showcase-title-mask h2"));
            const descriptions = cards.map((card) => card.querySelector<HTMLElement>(".showcase-card-copy > p"));
            const cleanups: Array<() => void> = [];

            const setActive = (index: number) => {
              cards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === index));
              progress.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === index));
              if (current) current.textContent = String(index + 1).padStart(2, "0");
            };

            gsap.set(cards, { position: "absolute", inset: 0, transformOrigin: "center top" });
            gsap.set(cards[0], { zIndex: 30, scale: 1, y: 0, opacity: 1 });
            gsap.set(cards[1], { zIndex: 20, scale: 0.965, y: 36, opacity: 0.7 });
            gsap.set(cards[2], { zIndex: 10, scale: 0.93, y: 72, opacity: 0.35 });
            gsap.set(cards[0].querySelector("[data-project-copy]"), { opacity: 1, y: 0 });
            gsap.set(cards.slice(1).map((card) => card.querySelector("[data-project-copy]")), { opacity: 0.35, y: 12 });
            gsap.set(titles[0], { yPercent: 0 });
            gsap.set(titles.slice(1), { yPercent: 108 });
            gsap.set(descriptions[0], { opacity: 1, y: 0 });
            gsap.set(descriptions.slice(1), { opacity: 0, y: 8 });
            setActive(0);

            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: projectsStage,
                start: "top 8%",
                end: () => `+=${window.innerHeight * 2}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                refreshPriority: -10,
                markers,
                onUpdate: (self) => setActive(self.progress < 0.24 ? 0 : self.progress < 0.74 ? 1 : 2),
                onRefresh: (self) => setActive(self.progress < 0.24 ? 0 : self.progress < 0.74 ? 1 : 2),
              },
            });

            timeline
              .addLabel("projectOne", 0)
              .to({}, { duration: 0.16 })
              .to(cards[0], { y: -70, scale: 0.94, opacity: 0.16, duration: 0.24, ease: "power2.inOut" }, 0.16)
              .to(cards[1], { y: 0, scale: 1, opacity: 1, duration: 0.24, ease: "power2.inOut" }, 0.16)
              .to(cards[2], { y: 36, scale: 0.965, opacity: 0.7, duration: 0.22, ease: "power2.inOut" }, 0.18)
              .to(cards[0].querySelector("[data-project-copy]"), { opacity: 0, y: -10, duration: 0.16, ease: "power1.inOut" }, 0.16)
              .to(cards[1].querySelector("[data-project-copy]"), { opacity: 1, y: 0, duration: 0.16, ease: "power1.inOut" }, 0.29)
              .to(titles[1], { yPercent: 0, duration: 0.16, ease: "power2.out" }, 0.3)
              .to(descriptions[1], { opacity: 1, y: 0, duration: 0.14, ease: "power1.out" }, 0.34)
              .set(cards[0], { zIndex: 5 }, 0.25)
              .set(cards[1], { zIndex: 30 }, 0.25)
              .set(cards[2], { zIndex: 20 }, 0.25)
              .addLabel("projectTwo", 0.5)
              .to({}, { duration: 0.12 })
              .to(cards[1], { y: -70, scale: 0.94, opacity: 0.16, duration: 0.24, ease: "power2.inOut" }, 0.6)
              .to(cards[2], { y: 0, scale: 1, opacity: 1, duration: 0.24, ease: "power2.inOut" }, 0.6)
              .to(cards[1].querySelector("[data-project-copy]"), { opacity: 0, y: -10, duration: 0.16, ease: "power1.inOut" }, 0.6)
              .to(cards[2].querySelector("[data-project-copy]"), { opacity: 1, y: 0, duration: 0.16, ease: "power1.inOut" }, 0.73)
              .to(titles[2], { yPercent: 0, duration: 0.16, ease: "power2.out" }, 0.74)
              .to(descriptions[2], { opacity: 1, y: 0, duration: 0.14, ease: "power1.out" }, 0.78)
              .set(cards[1], { zIndex: 10 }, 0.69)
              .set(cards[2], { zIndex: 30 }, 0.69)
              .addLabel("projectThree", 1);

            visuals.forEach((visual, index) => {
              if (!visual) return;
              const card = cards[index];
              const move = (event: PointerEvent) => {
                if (!card.classList.contains("is-active")) return;
                const bounds = card.getBoundingClientRect();
                gsap.to(visual, {
                  x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 8,
                  y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 6,
                  duration: 0.55,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              };
              const reset = () => gsap.to(visual, { x: 0, y: 0, duration: 0.55, ease: "power2.out" });
              card.addEventListener("pointermove", move);
              card.addEventListener("pointerleave", reset);
              cleanups.push(() => {
                card.removeEventListener("pointermove", move);
                card.removeEventListener("pointerleave", reset);
              });
            });

            return () => cleanups.forEach((cleanup) => cleanup());
          });

          media.add("(max-width: 767px)", () => {
            gsap.set(cards, { clearProps: "all" });
            gsap.set(cards.map((card) => card.querySelector("[data-project-copy]")), { clearProps: "all" });
            gsap.set(cards.map((card) => card.querySelector(".showcase-title-mask h2")), { clearProps: "all" });
            gsap.set(cards.map((card) => card.querySelector(".showcase-card-copy > p")), { clearProps: "all" });
            const mobileTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: projectsSection,
                start: "top 78%",
                end: "bottom 72%",
                scrub: 0.7,
                invalidateOnRefresh: true,
                markers,
              },
            });
            cards.forEach((card, index) => {
              mobileTimeline.from(card, { y: 42, opacity: 0, duration: 0.26, ease: "power2.out" }, index * 0.34);
            });
          });
        }, projectsSection);
        contexts.push(context);
      }

      const processSection = document.querySelector<HTMLElement>(".process-section");
      const processList = processSection?.querySelector<HTMLElement>(".process-list");
      const processLine = processSection?.querySelector<HTMLElement>("[data-process-line]");
      const processSteps = processSection ? Array.from(processSection.querySelectorAll<HTMLElement>("[data-process-step]")) : [];

      if (processSection && processList && processLine && processSteps.length) {
        const context = gsap.context(() => {
          gsap.set(processLine, { scaleY: 0, transformOrigin: "top center" });

          const setActiveStep = (progress: number) => {
            const activeIndex = Math.min(processSteps.length - 1, Math.floor(progress * processSteps.length));
            processSteps.forEach((step, index) => step.classList.toggle("is-active", index === activeIndex));
          };

          gsap.to(processLine, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: processList,
              start: "top 68%",
              end: "bottom 58%",
              scrub: 0.55,
              invalidateOnRefresh: true,
              refreshPriority: -20,
              markers,
              onUpdate: (self) => setActiveStep(self.progress),
              onRefresh: (self) => setActiveStep(self.progress),
            },
          });
        }, processSection);
        contexts.push(context);
      }

      const header = document.querySelector<HTMLElement>("[data-header]");
      const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 28);
      const refresh = () => ScrollTrigger.refresh(true);
      window.addEventListener("scroll", updateHeader, { passive: true });
      window.addEventListener("load", refresh, { once: true });
      updateHeader();
      requestAnimationFrame(refresh);
      document.documentElement.dataset.motionReady = "true";

      dispose = () => {
        delete document.documentElement.dataset.motionReady;
        window.removeEventListener("scroll", updateHeader);
        window.removeEventListener("load", refresh);
        mediaQueries.forEach((media) => media.revert());
        contexts.forEach((context) => context.revert());
      };
    };

    void initialize();
    return () => { cancelled = true; dispose(); };
  }, []);

  return null;
}
