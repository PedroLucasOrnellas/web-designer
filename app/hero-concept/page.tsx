import type { Metadata } from "next";
import { HeroConcept } from "../../components/hero-concept/HeroConcept";

export const metadata: Metadata = {
  title: "Hero Concept",
  description: "Protótipo isolado do hero com notebook 2.5D e takeover orientado por scroll.",
};

export default function HeroConceptPage() {
  return <HeroConcept />;
}
