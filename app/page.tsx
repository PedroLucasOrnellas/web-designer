import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { Hero } from "@/components/sections/Hero";
import { TechStrip } from "@/components/sections/TechStrip";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Pedro Lucas — Web Designer & Frontend Developer",
  description: "Sites estratégicos, visualmente marcantes e desenvolvidos para transformar atenção em resultado.",
};

export default function Home() {
  return <><MotionEngine /><Header /><main><Hero /><TechStrip /><ProjectsShowcase /><Manifesto /><Services /><Process /><About /><FinalCTA /></main><Footer /></>;
}
