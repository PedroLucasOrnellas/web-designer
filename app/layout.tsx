import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pedrolucas.design"),
  title: { default: "Pedro Lucas — Sites e sistemas para negócios", template: "%s — Pedro Lucas" },
  description: "Sites institucionais, landing pages, sistemas web e redesign. Estratégia, design e desenvolvimento com Pedro Lucas.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Pedro Lucas — Sites e sistemas para negócios",
    description: "Sites e sistemas estratégicos para empresas, marcas e negócios.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pedro Lucas — Web Design & Frontend Development" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
