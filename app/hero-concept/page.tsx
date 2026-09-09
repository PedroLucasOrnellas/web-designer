import type { Metadata } from "next";
import { HeroConcept } from "../../components/hero-concept/HeroConcept";

export const metadata: Metadata = {
  title: "Hero Concept",
  description: "Hero cinematográfico para o portfólio de Pedro Lucas.",
};

export default function HeroConceptPage() {
  return <HeroConcept />;
}
