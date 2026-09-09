import Link from "next/link";
import { contactUrl } from "@/data/portfolio";
export function About() {
  return <section className="about-section commercial-about" id="sobre" aria-labelledby="about-title"><div className="about-signature" data-reveal><p className="section-kicker"><span /> QUEM CONDUZ O PROJETO</p><h2 id="about-title">Pedro Lucas<span>.</span></h2><p>Estratégia · Design · Frontend</p></div><div className="about-copy" data-reveal><h3>Contato próximo.<br />Visão do projeto inteiro.</h3><p>Sou web designer e desenvolvedor frontend. Trabalho com empresas, marcas e negócios que precisam apresentar melhor sua oferta ou transformar uma necessidade em um produto digital.</p><p>Conecto conteúdo, interface e desenvolvimento para criar experiências claras, rápidas e fáceis de usar — com decisões que fazem sentido para o seu contexto.</p><Link href={contactUrl} className="button button-secondary">Conversar sobre o projeto <span aria-hidden="true">↗</span></Link></div></section>;
}
