import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the stabilized portfolio structure", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Pedro Lucas/);
  assert.match(html, /data-motion-hero/);
  assert.match(html, /class="hero-pin"/);
  assert.match(html, /class="hero-title"/);
  assert.match(html, /class="laptop-wrapper"/);
  assert.match(html, /data-laptop-screen/);
  assert.match(html, /data-takeover-content/);
  assert.match(html, /class="projects-stage"/);
  assert.match(html, /data-projects-stage/);
  assert.match(html, /href="https:\/\/pedrolucasornellas\.github\.io\//);
  assert.match(html, /href="\/lp-bolo\/index\.html"/);
  assert.doesNotMatch(html, /data-preloader|data-scramble|data-case-transition/);
});

test("keeps motion isolated, native-scroll based and reduced-motion safe", async () => {
  const [engine, css, hero, cakeLandingPage] = await Promise.all([
    readFile(new URL("../components/motion/MotionEngine.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/Hero.tsx", import.meta.url), "utf8"),
    access(new URL("../public/lp-bolo/index.html", import.meta.url)),
  ]);

  assert.match(engine, /useLayoutEffect/);
  assert.match(engine, /import\("gsap"\)/);
  assert.match(engine, /import\("gsap\/ScrollTrigger"\)/);
  assert.match(engine, /document\.fonts\.ready/);
  assert.match(engine, /criticalImages/);
  assert.match(engine, /gsap\.context/);
  assert.match(engine, /gsap\.matchMedia/);
  assert.match(engine, /prefers-reduced-motion:\s*reduce/);
  assert.match(engine, /debug-motion/);
  assert.doesNotMatch(engine, /import\("lenis"\)|SCRAMBLE_CHARS|data-page-transition-overlay/);
  assert.match(css, /\.hero-title\{max-width:11ch/);
  assert.match(css, /\.projects-stage\{position:relative/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(hero, /data-hero-pin/);
  assert.match(hero, /data-takeover-content/);
  assert.equal(cakeLandingPage, undefined);
});

test("server-renders project cases without transition overlays", async () => {
  const response = await render("/projetos/the-human-dataset");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /The Human Dataset/);
  assert.match(html, /class="case-project-visual"/);
  assert.match(html, /class="next-case"/);
  assert.doesNotMatch(html, /data-case-mask|data-case-transition/);
});
