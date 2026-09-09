import Link from "next/link";
import { contactUrl } from "@/data/portfolio";

const navigation = [
  ["Soluções", "/#servicos"], ["Projetos", "/#projetos"], ["Processo", "/#processo"], ["FAQ", "/#faq"],
];

export function Header({ revealAfterHero = false }: { revealAfterHero?: boolean }) {
  return (
    <header className="site-header" data-header data-after-hero={revealAfterHero ? "true" : undefined}>
      <Link className="brand" href="/" aria-label="Pedro Lucas — início"><span className="brand-mark">PL</span><span className="brand-name">Pedro Lucas</span></Link>
      <nav aria-label="Navegação principal">{navigation.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav>
      <Link className="header-cta" href={contactUrl} data-magnetic>Solicitar um projeto <span aria-hidden="true">↗</span></Link>
    </header>
  );
}
