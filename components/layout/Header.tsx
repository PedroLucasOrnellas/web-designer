import Link from "next/link";

const navigation = [
  ["Projetos", "#projetos"], ["Serviços", "#servicos"], ["Processo", "#processo"], ["Sobre", "#sobre"],
];

export function Header({ revealAfterHero = false }: { revealAfterHero?: boolean }) {
  return (
    <header className="site-header" data-header data-after-hero={revealAfterHero ? "true" : undefined}>
      <Link className="brand" href="/" aria-label="Pedro Lucas — início"><span className="brand-mark">PL</span><span className="brand-name">Pedro Lucas</span></Link>
      <nav aria-label="Navegação principal">{navigation.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav>
      <Link className="header-cta" href="#contato" data-magnetic>Vamos conversar <span aria-hidden="true">↗</span></Link>
    </header>
  );
}
