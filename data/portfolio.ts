import type { ProcessStep, Project, Service, SocialLink } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "o-catalogo",
    decisions: "Catálogo, seleção de produtos e pedido organizados em um fluxo direto. React e TypeScript estruturam a interface; Supabase compõe a base do produto.",
    impact: "Uma jornada que aproxima a descoberta de produtos da conversa de pedido, sem exigir um checkout de e-commerce tradicional.",
    index: "01",
    name: "O Catálogo",
    eyebrow: "SaaS · Product Design",
    shortCategory: "SaaS / Product Design",
    description: "Plataforma de catálogo e pedidos via WhatsApp para pequenos negócios.",
    categories: ["SaaS", "Product Design", "Frontend"],
    challenge: "Organizar produtos e facilitar pedidos sem exigir que pequenos negócios adotem uma operação de e-commerce complexa.",
    solution: "Uma experiência direta de descoberta, seleção e envio do pedido pelo canal que já faz parte da rotina do negócio: o WhatsApp.",
    technologies: ["React", "TypeScript", "Supabase"],
    accent: "#9B83E6",
    className: "visual-catalogo",
    image: "/projects/screenshots/o-catalogo.png",
    imageAlt: "Página inicial do O Catálogo, com catálogo online e pedidos pelo WhatsApp",
    status: "Produto digital",
    caseNote: "O case apresenta a arquitetura do catálogo, a hierarquia dos produtos e o fluxo que transforma interesse em uma conversa de pedido.",
  },
  {
    slug: "julie-doceria",
    decisions: "Fotografia do produto como ponto de partida, conteúdo em sequência e chamadas para ação ao longo da página. GSAP e Lenis dão ritmo à apresentação.",
    impact: "O exemplo demonstra como apresentar o produto, explicar a oferta e dar um próximo passo claro ao visitante. Não há dados de vendas medidos.",
    index: "02",
    name: "LP de Bolo",
    eyebrow: "Landing Page · Conversão",
    shortCategory: "Landing Page / Conversão",
    description: "Landing page criada para apresentar a oferta, valorizar o produto e conduzir o usuário até a conversão.",
    categories: ["Landing Page", "Web Design", "Conversão"],
    challenge: "Comunicar textura, qualidade e produção limitada de um produto físico em uma página capaz de criar desejo antes do primeiro contato.",
    solution: "Uma narrativa visual baseada no produto, com direção de arte quente, transições de profundidade, sequência de montagem e CTAs distribuídos ao longo da experiência.",
    technologies: ["GSAP", "ScrollTrigger", "Lenis"],
    accent: "#B99A7B",
    className: "visual-julie",
    image: "/projects/screenshots/julie-doceria.png",
    imageAlt: "Página da Julie Doceria com a chamada Recheio em dobro e fatia de bolo",
    status: "Landing page demonstrativa",
    caseNote: "Landing page demonstrativa desenvolvida como exemplo de direção de arte, storytelling de produto, motion design e construção de uma jornada orientada à conversão. Nenhuma métrica comercial foi presumida.",
    liveUrl: "/lp-bolo/index.html",
    liveUrlLabel: "Visitar site",
  },
  {
    slug: "the-human-dataset",
    decisions: "Hierarquia inspirada em interfaces analíticas, navegação por temas e visualizações que organizam competências, formação e estudos. O frontend integra conteúdo e interação.",
    impact: "Um perfil profissional extenso se torna uma experiência navegável, com estudos e competências apresentados em contexto.",
    index: "03",
    name: "The Human Dataset",
    eyebrow: "Data · Creative Development",
    shortCategory: "Data / Creative Development",
    description: "Portfólio experimental focado em visualização de dados, narrativa visual e experiências digitais interativas.",
    categories: ["Data Visualization", "Creative Development", "Frontend"],
    challenge: "Apresentar um perfil profissional com grande volume de informação sem recorrer à estrutura previsível de um currículo digital.",
    solution: "Uma experiência inspirada em interfaces analíticas, com narrativa progressiva, visualizações, evidências de aprendizado e hierarquia orientada à leitura.",
    technologies: ["Data Visualization", "Creative Development", "Frontend"],
    accent: "#839CE6",
    className: "visual-dataset",
    image: "/projects/screenshots/the-human-dataset.png",
    imageAlt: "Página inicial do The Human Dataset, portfólio de dados de Pedro Lucas",
    status: "Site publicado",
    caseNote: "Projeto publicado com navegação completa, visualizações de competências, jornada profissional, formação e estudos analíticos. O case destaca o serviço de estratégia, design e desenvolvimento da experiência.",
    liveUrl: "https://pedrolucasornellas.github.io/",
    liveUrlExternal: true,
    liveUrlLabel: "Visitar site",
  },
  {
    slug: "epimoni-veiculos",
    decisions: "A navegação prioriza a descoberta do estoque, apresenta os veículos em cards objetivos e concentra especificações, fotos e contato na página de detalhes. A direção visual equilibra confiança, sofisticação e leitura simples.",
    impact: "O catálogo, as informações de cada veículo e o acesso à equipe passam a fazer parte do mesmo fluxo, reduzindo a distância entre a pesquisa inicial e a conversa sobre uma compra.",
    index: "04",
    name: "Epimoni Veículos",
    eyebrow: "Site institucional · Catálogo automotivo",
    shortCategory: "Site / Catálogo automotivo",
    description: "Site institucional e catálogo de veículos para uma loja de Nova Friburgo.",
    categories: ["Web Design", "Catálogo digital", "Frontend"],
    challenge: "Apresentar o estoque de forma organizada, transmitir segurança e permitir que cada pessoa avalie os detalhes do veículo antes de falar com a equipe.",
    solution: "Uma jornada que parte da descoberta do catálogo, revela modelos e informações em camadas e conduz o interesse até um contato direto com a loja.",
    technologies: ["UX/UI Design", "Frontend", "Catálogo digital"],
    accent: "#D4A85E",
    className: "visual-epimoni",
    image: "/projects/screenshots/epimoni.png",
    imageAlt: "Página inicial da Epimoni Veículos com a fachada da loja e catálogo automotivo",
    status: "Site publicado",
    caseNote: "O site publicado reúne apresentação institucional, estoque atualizado, páginas individuais com características técnicas e contato direto. O case descreve a experiência e não presume resultados comerciais.",
    liveUrl: "https://www.epimoniveiculos.com.br/",
    liveUrlExternal: true,
    liveUrlLabel: "Visitar site",
  },
];

export const services: Service[] = [
  { index: "01", title: "Sites institucionais", description: "Para empresas cujo site ainda não comunica com clareza o que fazem e por que escolher seus serviços.", delivery: "Arquitetura de conteúdo, design personalizado e desenvolvimento responsivo.", benefit: "Uma presença confiável, alinhada à marca e com caminhos claros para o contato.", tag: "Presença + confiança", className: "service-wide" },
  { index: "02", title: "Landing pages", description: "Para ofertas e campanhas que precisam explicar seu valor e conduzir o visitante à próxima ação.", delivery: "Estrutura da oferta, hierarquia de argumentos e CTAs em uma página focada.", benefit: "Menos dúvidas entre conhecer a oferta e solicitar um orçamento, cadastro ou compra.", tag: "Oferta + conversão", className: "service-tall" },
  { index: "03", title: "Sistemas e plataformas web", description: "Para negócios que precisam organizar processos, produtos e operações em uma ferramenta própria.", delivery: "Fluxos, interfaces, frontend e integrações definidos conforme o escopo.", benefit: "Uma operação mais clara, com ferramentas adaptadas à rotina de quem usa.", tag: "Processos + usabilidade", className: "service-medium" },
  { index: "04", title: "Redesign e evolução", description: "Para sites e produtos existentes com navegação confusa, visual defasado ou dificuldades de uso.", delivery: "Diagnóstico da experiência e evolução do design, da interface e da performance.", benefit: "Mais clareza e facilidade de uso, preservando o que já funciona no produto.", tag: "Clareza + continuidade", className: "service-small" },
];

export const processSteps: ProcessStep[] = [
  { index: "01", title: "Diagnóstico", description: "Conversamos sobre seu negócio, público e objetivo. Você recebe uma proposta com escopo, investimento e prazo definidos." },
  { index: "02", title: "Estratégia", description: "Organizo o conteúdo, os fluxos e as prioridades. Alinhamos o que a experiência precisa comunicar e facilitar." },
  { index: "03", title: "Design", description: "Apresento a direção visual e as principais telas para revisão. Você acompanha e valida antes do desenvolvimento." },
  { index: "04", title: "Desenvolvimento", description: "Construo a experiência responsiva e as integrações combinadas, com revisões de usabilidade, acessibilidade e performance." },
  { index: "05", title: "Lançamento", description: "Validamos a entrega e acompanho a publicação. Você recebe orientação sobre a estrutura e os próximos passos de evolução." },
];

export const benefits = [
  { title: "Uma direção, do início ao fim", description: "Estratégia, design e desenvolvimento conectados ao mesmo objetivo de negócio." },
  { title: "Feito para o seu contexto", description: "Conteúdo, fluxos e interfaces personalizados, sem encaixar sua marca em um template genérico." },
  { title: "Pronto para diferentes telas", description: "Responsividade e performance consideradas desde o design até a implementação." },
  { title: "Contato direto com quem faz", description: "Comunicação próxima, etapas claras e espaço para revisar as decisões durante o projeto." },
  { title: "Acompanhamento até a publicação", description: "Validação da entrega e orientação para colocar a experiência no ar." },
  { title: "Estrutura para o próximo passo", description: "Componentes reutilizáveis e organização de código para facilitar manutenção e evolução." },
];

export const faqs = [
  { question: "Quanto custa criar um site ou sistema?", answer: "O investimento depende do número de páginas, dos fluxos, das integrações e do nível de personalização. Após entender sua necessidade, envio uma proposta com escopo e condições para você avaliar." },
  { question: "Quanto tempo um projeto leva?", answer: "O prazo depende da complexidade, da disponibilidade de conteúdo e das etapas de aprovação. O cronograma é definido na proposta, com os principais marcos e entregas." },
  { question: "O projeto inclui design e desenvolvimento?", answer: "Sim. Posso cuidar da estratégia da experiência, do design e do desenvolvimento. Se você já tem um produto ou design, também podemos definir um escopo específico para a etapa que precisa." },
  { question: "O site será responsivo?", answer: "Sim. A interface é adaptada para celular, tablet e desktop, considerando leitura, navegação e ações importantes em cada tela." },
  { question: "Posso solicitar alterações?", answer: "Sim. Há momentos de revisão ao longo do projeto. As rodadas e os limites são combinados na proposta; mudanças que ampliem o escopo são avaliadas antes de seguir." },
  { question: "Você também publica o site?", answer: "Sim, acompanho a publicação e oriento a configuração de domínio e hospedagem. Custos de infraestrutura e serviços externos são alinhados separadamente, conforme a solução escolhida." },
  { question: "Como posso pedir um orçamento?", answer: "Use o contato ao final da página e conte o que seu negócio faz, o que você precisa criar ou melhorar e se existe uma previsão de lançamento. Não é necessário chegar com um briefing pronto." },
];

// Configure o endereço definitivo (mailto:, WhatsApp ou agenda) antes de publicar.
// O fallback mantém o destino centralizado, sem inventar um canal de contato.
export const contactUrl = process.env.NEXT_PUBLIC_CONTACT_URL?.trim() || "/#contato";

// Substitua os valores abaixo pelos seus links reais antes da publicação definitiva.
export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "#contato", placeholder: true },
  { label: "GitHub", href: "#contato", placeholder: true },
  { label: "Instagram", href: "#contato", placeholder: true },
  { label: "E-mail", href: "#contato", placeholder: true },
];
