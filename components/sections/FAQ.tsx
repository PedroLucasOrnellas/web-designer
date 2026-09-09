import { faqs } from "@/data/portfolio";
export function FAQ() {
  return <section className="faq-section" id="faq" aria-labelledby="faq-title"><div data-reveal><p className="section-kicker"><span /> ANTES DE COMEÇAR</p><h2 id="faq-title">Dúvidas sobre<br />o seu projeto?</h2><p className="section-intro">O que você precisa saber para dar o próximo passo com clareza.</p></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>;
}
