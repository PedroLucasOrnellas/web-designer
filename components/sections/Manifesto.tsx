import { benefits } from "@/data/portfolio";
export function Manifesto() {
  return <section className="benefits-section" id="diferenciais" aria-labelledby="benefits-title"><div data-reveal><p className="section-kicker"><span /> MAIS CLAREZA PARA DECIDIR</p><h2 id="benefits-title">Do objetivo do negócio<br />ao último detalhe.</h2><p className="section-intro">Você fala diretamente com quem planeja, desenha e desenvolve o projeto.</p></div><div className="benefits-grid">{benefits.map((benefit, index) => <article key={benefit.title} data-reveal><span className="benefit-index">{String(index + 1).padStart(2, "0")}</span><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}</div></section>;
}
