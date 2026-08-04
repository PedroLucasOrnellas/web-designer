import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pedrolucas.design"),
  title: { default: "Pedro Lucas — Web Designer & Frontend Developer", template: "%s — Pedro Lucas" },
  description: "Design estratégico, desenvolvimento moderno e interações que conectam, encantam e convertem.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Pedro Lucas — Web Designer & Frontend Developer",
    description: "Sites que transformam ideias em experiências digitais.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pedro Lucas — Web Design & Frontend Development" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
