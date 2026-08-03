import type { ProcessStep, Project, Service, SocialLink } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "o-catalogo",
    index: "01",
    name: "O Catálogo",
    eyebrow: "SaaS · Produto digital",
    description: "Catálogo digital e pedidos via WhatsApp para pequenos negócios venderem com menos atrito.",
    challenge: "Organizar produtos, intenção de compra e atendimento em uma experiência simples para negócios que já vendem pelo WhatsApp.",
    solution: "Uma interface direta, responsiva e orientada à ação, com catálogo navegável e fluxo de pedido claro do primeiro toque à conversa.",
    technologies: ["Next.js", "TypeScript", "UX", "Frontend"],
    accent: "#8b5cf6",
    className: "visual-catalogo",
  },
  {
    slug: "acougue-arpoador",
    index: "02",
    name: "Açougue Arpoador",
    eyebrow: "Site comercial · Conversão",
    description: "Experiência digital para valorizar os produtos e facilitar pedidos pelo WhatsApp.",
    challenge: "Modernizar a apresentação de um negócio local sem perder proximidade, tornando o caminho até o pedido mais rápido.",
    solution: "Uma vitrine digital visual, objetiva e mobile-first que organiza o catálogo e conduz cada visita para uma conversa comercial.",
    technologies: ["Web Design", "UX", "Responsividade", "Conversão"],
    accent: "#d97757",
    className: "visual-arpoador",
  },
  {
    slug: "fipe-ipca",
    index: "03",
    name: "FIPE + IPCA",
    eyebrow: "Dados · Storytelling",
    description: "Visualização que revela a valorização real de veículos além do preço nominal.",
    challenge: "Transformar séries históricas e indicadores econômicos em uma leitura comparável, confiável e fácil de explorar.",
    solution: "Uma narrativa de dados que conecta FIPE e inflação, destacando tendências e tornando relações complexas visualmente legíveis.",
    technologies: ["Power BI", "Data Viz", "Análise", "Storytelling"],
    accent: "#6d8cf5",
    className: "visual-fipe",
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
