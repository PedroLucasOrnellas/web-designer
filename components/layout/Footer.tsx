import Link from "next/link";
import { socialLinks } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div><span className="brand-mark">PL</span><h2>Pedro Lucas</h2><p>Web Designer &amp; Frontend Developer</p></div>
        <div className="footer-columns">
          <div><small>NAVEGAÇÃO</small><Link href="#projetos">Projetos</Link><Link href="#servicos">Serviços</Link><Link href="#processo">Processo</Link><Link href="#sobre">Sobre</Link></div>
          <div><small>SERVIÇOS</small><span>Landing Pages</span><span>Sites Institucionais</span><span>Experiências Interativas</span><span>Produtos Digitais</span></div>
          <div><small>CONTATO · SUBSTITUIR LINKS</small>{socialLinks.map((link) => <Link key={link.label} href={link.href} aria-label={`${link.label}${link.placeholder ? " — link provisório" : ""}`}>{link.label} <span>↗</span></Link>)}</div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Pedro Lucas</span><span>Projetado e desenvolvido com intenção.</span><Link href="#topo">Voltar ao topo ↑</Link></div>
    </footer>
  );
}
