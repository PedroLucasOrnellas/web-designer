import type { Metadata } from "next";
import { ProgressiveHome } from "@/components/experience/ProgressiveHome";

export const metadata: Metadata = {
  title: { absolute: "Pedro Lucas — Sites e sistemas para negócios" },
  description: "Sites estratégicos, visualmente marcantes e desenvolvidos para transformar atenção em resultado.",
};

export default function Home() {
  return <ProgressiveHome />;
}
