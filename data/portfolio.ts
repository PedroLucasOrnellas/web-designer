import type { ProcessStep, Project, Service, SocialLink } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "o-catalogo",
    index: "01",
    name: "O Catálogo",
    eyebrow: "SaaS · Catálogo digital",
    description: "SaaS de catálogo e pedidos via WhatsApp para pequenos negócios.",
    challenge: "Organizar produtos e facilitar pedidos sem exigir que pequenos negócios adotem uma operação de e-commerce complexa.",
    solution: "Uma experiência direta de descoberta, seleção e envio do pedido pelo canal que já faz parte da rotina do negócio: o WhatsApp.",
    technologies: ["Product Design", "SaaS", "Next.js", "WhatsApp"],
    accent: "#9B83E6",
    className: "visual-catalogo",
    status: "Produto digital",
    caseNote: "O case apresenta a arquitetura do catálogo, a hierarquia dos produtos e o fluxo que transforma interesse em uma conversa de pedido.",
  },
  {
    slug: "acougue-arpoador",
    index: "02",
    name: "Açougue Arpoador",
    eyebrow: "Experiência digital · Pedidos",
    description: "Experiência digital para apresentação de produtos e geração de pedidos.",
    challenge: "Traduzir variedade, procedência e conveniência em uma interface clara para quem precisa escolher e pedir rapidamente.",
    solution: "Uma vitrine digital centrada nos produtos, com categorias objetivas, apresentação cuidadosa e uma jornada curta até o pedido.",
    technologies: ["Web Design", "UX", "Frontend", "WhatsApp"],
    accent: "#B79A72",
    className: "visual-arpoador",
    status: "Experiência digital",
    caseNote: "O projeto explora direção de arte, organização de catálogo e uma jornada de contato coerente com a operação do negócio.",
  },
  {
    slug: "fipe-ipca",
    index: "03",
    name: "FIPE + IPCA",
    eyebrow: "Dashboard · Visualização de dados",
    description: "Dashboard e experiência de visualização de dados comparando valorização de veículos e inflação.",
    challenge: "Permitir a comparação entre séries econômicas e valores de veículos sem transformar a leitura em uma planilha difícil de interpretar.",
    solution: "Uma interface analítica que organiza contexto, filtros e evolução temporal em uma narrativa visual progressiva e comparável.",
    technologies: ["Data Viz", "Dashboard", "UX", "TypeScript"],
    accent: "#83A4E6",
    className: "visual-fipe",
    status: "Estudo de dados",
    caseNote: "O case se concentra na organização da informação e na experiência de leitura. Nenhuma métrica de resultado comercial foi presumida.",
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
