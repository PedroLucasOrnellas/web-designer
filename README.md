# Pedro Lucas — Sites e sistemas para negócios

Home comercial em React e TypeScript, preservando Next.js/Vinext, GSAP, fontes e assets do projeto.

## Conteúdo e contato

Edite data/portfolio.ts para projetos, quatro soluções, diferenciais, cinco etapas, FAQ e redes sociais.
Configure NEXT_PUBLIC_CONTACT_URL no ambiente local (.env.local) e no ambiente de produção, com a URL definitiva de WhatsApp, agenda ou mailto:. Reinicie o servidor local após mudar a variável; gere um novo build para produção. Todos os CTAs usam contactUrl, exportado pelo mesmo arquivo. Sem configuração, o destino é /#contato; ainda não há envio de mensagem ou canal definitivo. Links sociais marcados como placeholder não são exibidos.

O bloco Sobre usa uma assinatura tipográfica; não exige retrato. A imagem cinematográfica existente permanece em public/images/hero-laptop-cinematic.png.

## Rotas preservadas

- /
- /hero-concept
- /projetos/o-catalogo
- /projetos/julie-doceria
- /projetos/the-human-dataset
- /lp-bolo/index.html

Os cases descrevem contexto, desafio, solução, decisões, disciplinas/tecnologias e impacto qualitativo, sem métricas comerciais presumidas. O domínio em metadataBase deve ser confirmado antes da publicação; a imagem social existente foi preservada.

## Desenvolvimento e verificação

- npm run dev
- npm run lint
- npx tsc --noEmit
- npm run build
- node --test tests/rendered-html.test.mjs (após build)

O hero mantém máscaras, parallax discreto e CTA animado. Os títulos das seções usam IntersectionObserver; o processo mantém seu indicador de progresso. O FAQ usa details/summary nativos e o acordeão de projetos mantém operação por teclado. prefers-reduced-motion desativa movimento e preserva o conteúdo legível.

Nenhum commit, push ou deploy faz parte desta alteração local.
