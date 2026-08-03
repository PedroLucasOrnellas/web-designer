# Portfólio — Pedro Lucas

Landing page comercial em português para serviços de web design e desenvolvimento frontend. O projeto usa Next.js, TypeScript, Tailwind CSS, GSAP e Lenis, com rotas individuais para os três cases.

## Personalização rápida

### Projetos e textos

Edite `data/portfolio.ts`. Este arquivo concentra projetos, descrições, tecnologias, serviços, processo e links sociais. Não há números ou resultados inventados; cada case inclui uma nota explícita para receber métricas reais no futuro.

### Contato e redes sociais

Em `data/portfolio.ts`, substitua os quatro itens de `socialLinks`. Depois, em `components/sections/FinalCTA.tsx`, troque o `href="#contato"` do botão circular pelo e-mail (`mailto:`), WhatsApp ou página de contato real. Remova o texto `CONTATO PENDENTE` quando concluir.

### Retrato

O bloco `components/sections/About.tsx` contém um placeholder integrado à composição. Para usar uma foto real, coloque o arquivo em `public/images/pedro-lucas.webp`, importe `Image` de `next/image` e substitua `.portrait-placeholder` por um `<Image fill ... />`. Preserve a classe `about-portrait` para manter o recorte e os elementos gráficos.

### Imagens e mockups dos cases

Os mockups atuais são componentes CSS leves em `components/ui/ProjectVisual.tsx`. Para usar capturas reais, salve arquivos WebP ou AVIF em `public/projects/<slug>/` e substitua o conteúdo de `.browser-shell` por `next/image`. Use `sizes` e mantenha dimensões explícitas para evitar layout shift.

### Links de projeto

As páginas estão disponíveis em:

- `/projetos/o-catalogo`
- `/projetos/acougue-arpoador`
- `/projetos/fipe-ipca`

Inclua URLs externas reais apenas quando os projetos estiverem publicados.

### Metadados e compartilhamento

A imagem social fica em `public/og.png`. Antes do deploy definitivo, troque `metadataBase` em `app/layout.tsx` pelo domínio real do portfólio.

## Desenvolvimento

Use `npm run dev` para desenvolvimento local. Rode `npm run lint`, `npx tsc --noEmit` e `npm run build` antes de publicar.

## Performance e acessibilidade

As animações carregam de forma dinâmica em um único Client Component, são limpas ao desmontar e respeitam `prefers-reduced-motion`. O conteúdo principal permanece em Server Components. O layout usa HTML semântico, foco visível e estados legíveis em teclado e toque.
