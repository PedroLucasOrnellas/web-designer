"use client";

import { useLayoutEffect } from "react";

export function MotionEngine() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleInternalNavigation = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      // Move keyboard navigation to the destination, without a second scroll.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
    };

    document.addEventListener("click", handleInternalNavigation, true);
    if (reducedMotion) return () => document.removeEventListener("click", handleInternalNavigation, true);

    // A single, short mask reveal for section headings; content stays visible
    // without JavaScript and no scroll pinning is needed for these sections.
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("main section h2"));
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(".section-mask-reveal").forEach((heading) => heading.classList.add("is-revealed"));
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0 });
    revealTargets.forEach((target) => {
      target.classList.add("section-mask-reveal");
      // Observe the unclipped wrapper: a fully clipped heading has no
      // intersection area and could otherwise remain hidden indefinitely.
      if (target.parentElement) revealObserver.observe(target.parentElement);
    });

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
    return () => {
      cancelled = true;
      revealObserver.disconnect();
      revealTargets.forEach((target) => target.classList.remove("section-mask-reveal", "is-revealed"));
      document.removeEventListener("click", handleInternalNavigation, true);
      dispose();
    };
  }, []);

  return null;
}
