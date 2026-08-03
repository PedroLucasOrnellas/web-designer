"use client";

import { useEffect } from "react";

export function MotionEngine() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(([gsapModule, scrollModule, lenisModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      const Lenis = lenisModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.85 });
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        gsap.from("[data-hero-line]", { yPercent: 115, duration: 1.15, stagger: 0.1, ease: "power4.out", delay: 0.12 });
        gsap.from("[data-hero-meta]", { opacity: 0, y: 20, duration: 0.75, stagger: 0.08, delay: 0.45 });
        gsap.from("[data-hero-visual]", { opacity: 0, scale: 0.88, rotate: 3, duration: 1.4, ease: "power3.out", delay: 0.25 });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, { opacity: 0, y: 42, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
          gsap.to(element, { yPercent: -12, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 1 } });
        });

        const processLine = document.querySelector<HTMLElement>("[data-process-line]");
        if (processLine) gsap.fromTo(processLine, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "#processo", start: "top 65%", end: "bottom 70%", scrub: 1 } });
      });

      const header = document.querySelector<HTMLElement>("[data-header]");
      const headerHandler = () => header?.classList.toggle("is-scrolled", window.scrollY > 28);
      window.addEventListener("scroll", headerHandler, { passive: true });
      headerHandler();

      const magnetic = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
      const moveHandlers = magnetic.map((button) => {
        const move = (event: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          gsap.to(button, { x: (event.clientX - rect.left - rect.width / 2) * 0.12, y: (event.clientY - rect.top - rect.height / 2) * 0.12, duration: 0.3 });
        };
        const leave = () => gsap.to(button, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, .45)" });
        button.addEventListener("mousemove", move);
        button.addEventListener("mouseleave", leave);
        return { button, move, leave };
      });

      cleanup = () => {
        moveHandlers.forEach(({ button, move, leave }) => { button.removeEventListener("mousemove", move); button.removeEventListener("mouseleave", leave); });
        window.removeEventListener("scroll", headerHandler);
        ctx.revert();
        lenis.off("scroll", onScroll);
        lenis.destroy();
        gsap.ticker.remove(tick);
      };
    });

    return () => { cancelled = true; cleanup(); };
  }, []);

  return null;
}
