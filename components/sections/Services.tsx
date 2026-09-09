import Link from "next/link";
import { services, contactUrl } from "@/data/portfolio";
export function Services() {
  return <section className="services-section" id="servicos" aria-labelledby="services-title">
    <div className="services-heading" data-reveal><p className="section-kicker"><span /> SOLUÇÕES PARA O SEU NEGÓCIO</p><h2 id="services-title">O que você precisa <strong>colocar em movimento?</strong></h2><p>Uma presença mais clara, uma oferta pronta para campanha ou uma ferramenta para a operação. O projeto começa pelo que seu negócio precisa resolver.</p></div>
    <div className="services-mosaic">{services.map((service) => <article key={service.index} className="service-block" data-reveal>
      <div className="service-top"><span>{service.index}</span><small>{service.tag}</small></div><h3>{service.title}</h3><p>{service.description}</p>
      <dl><div><dt>O que é entregue</dt><dd>{service.delivery}</dd></div><div><dt>Para o seu negócio</dt><dd>{service.benefit}</dd></div></dl>
      <Link href={contactUrl} className="service-link" aria-label={"Conversar sobre " + service.title.toLowerCase()}>Conversar sobre esta solução <span aria-hidden="true">↗</span></Link>
    </article>)}</div>
  </section>;
}
