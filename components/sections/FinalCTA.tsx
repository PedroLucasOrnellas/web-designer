import Link from "next/link";
import { contactUrl } from "@/data/portfolio";
export function FinalCTA() {
  return <section className="final-cta" id="contato" aria-labelledby="contact-title"><p className="section-kicker" data-reveal><span /> VAMOS CONVERSAR</p><h2 id="contact-title" data-reveal>Tem um site, sistema ou ideia para tirar do papel?</h2><div className="cta-bottom" data-reveal><p>Conte brevemente o que você precisa e receba uma direção inicial para o projeto.</p><Link href={contactUrl} className="button button-primary final-contact">Conversar sobre o projeto <span aria-hidden="true">↗</span></Link></div></section>;
}
