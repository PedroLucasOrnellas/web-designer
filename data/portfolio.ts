import type { ProcessStep, Project, Service, SocialLink } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "the-human-dataset",
    index: "01",
    name: "The Human Dataset",
    eyebrow: "Portfólio de dados · Experiência interativa",
    description: "Portfólio imersivo que transforma trajetória, competências e projetos em um relatório de dados navegável.",
    challenge: "Apresentar um perfil profissional com grande volume de informação sem recorrer à estrutura previsível de um currículo digital.",
    solution: "Uma experiência inspirada em interfaces analíticas, com narrativa progressiva, visualizações, evidências de aprendizado e hierarquia orientada à leitura.",
    technologies: ["Web Design", "Data Storytelling", "UX", "Frontend"],
    accent: "#9B83E6",
    className: "visual-dataset",
    image: "/projects/portfolio-dados/dashboard.png",
    imageAlt: "Dashboard de análise do mercado automotivo apresentado no portfólio de dados",
    status: "Site publicado",
    caseNote: "Projeto publicado com navegação completa, visualizações de competências, jornada profissional, formação e estudos analíticos. O case destaca o serviço de estratégia, design e desenvolvimento da experiência.",
    liveUrl: "https://pedrolucasornellas.github.io/",
    liveUrlExternal: true,
    liveUrlLabel: "Visitar site",
  },
  {
    slug: "julie-doceria",
    index: "02",
    name: "Julie Doceria",
    eyebrow: "Landing page · Produto & conversão",
    description: "Landing page sensorial para transformar uma fatia artesanal em uma experiência de desejo e compra.",
    challenge: "Comunicar textura, qualidade e produção limitada de um produto físico em uma página capaz de criar desejo antes do primeiro contato.",
    solution: "Uma narrativa visual baseada no produto, com direção de arte quente, transições de profundidade, sequência de montagem e CTAs distribuídos ao longo da experiência.",
    technologies: ["Landing Page", "GSAP", "ScrollTrigger", "Lenis"],
    accent: "#9B83E6",
    className: "visual-julie",
    image: "/projects/julie-doceria/hero-cake.png",
    imageAlt: "Fatia artesanal de chocolate usada na landing page Julie Doceria",
    status: "Landing page demonstrativa",
    caseNote: "Landing page demonstrativa desenvolvida como exemplo de direção de arte, storytelling de produto, motion design e construção de uma jornada orientada à conversão. Nenhuma métrica comercial foi presumida.",
    liveUrl: "/lp-bolo/index.html",
    liveUrlLabel: "Ver landing page",
  },
];

export const services: Service[] = [
  { index: "01", title: "Landing Pages", description: "Páginas estratégicas focadas em conversão, posicionamento e aquisição.", tag: "Estratégia + conversão", className: "service-wide" },
  { index: "02", title: "Sites Institucionais", description: "Presença digital profissional, responsiva e alinhada à identidade do negócio.", tag: "Marca + clareza", className: "service-tall" },
  { index: "03", title: "Experiências Interativas", description: "Storytelling visual e interações que elevam a percepção da marca.", tag: "Motion + impacto", className: "service-medium" },
  { index: "04", title: "Produtos Digitais", description: "Interfaces para SaaS, dashboards, painéis administrativos e fluxos digitais.", tag: "UX + escala", className: "service-small" },
];

export const processSteps: ProcessStep[] = [
  { index: "01", title: "Diagnóstico", description: "Entendo o negócio, o público e a decisão que o site precisa facilitar." },
  { index: "02", title: "Direção visual", description: "Defino linguagem, referências e princípios para uma presença autoral." },
  { index: "03", title: "Prototipação", description: "Organizo conteúdo, hierarquia e fluxos antes de entrar no código." },
  { index: "04", title: "Desenvolvimento", description: "Transformo a direção em uma interface responsiva, fluida e precisa." },
  { index: "05", title: "Validação", description: "Reviso conteúdo, acessibilidade, dispositivos e pontos de conversão." },
  { index: "06", title: "Publicação", description: "O site entra no ar otimizado, mensurável e pronto para evoluir." },
];

// Substitua os valores abaixo pelos seus links reais antes da publicação definitiva.
export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "#contato", placeholder: true },
  { label: "GitHub", href: "#contato", placeholder: true },
  { label: "Instagram", href: "#contato", placeholder: true },
  { label: "E-mail", href: "#contato", placeholder: true },
];
