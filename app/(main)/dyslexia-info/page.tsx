import type { Metadata } from "next";
import DyslexiaHero from "@/components/dyslexia-info/DyslexiaHero";

export const metadata: Metadata = {
  title: "Understanding Dyslexia",
  description:
    "What is dyslexia? Learn about the signs, strengths, and how specialist support can make a difference. Practical information for parents, adults, and educators in Ireland.",
  openGraph: {
    title: "Understanding Dyslexia | Lumina Neuro-Literacy Studio",
    description:
      "Signs, strengths, and support for dyslexia — practical information for parents, adults, and educators in Ireland.",
    url: "/dyslexia-info",
  },
};
import WhatIsDyslexia from "@/components/dyslexia-info/WhatIsDyslexia";
import CommonSigns from "@/components/dyslexia-info/CommonSigns";
import DyslexiaStrengths from "@/components/dyslexia-info/DyslexiaStrengths";
import DyslexiaInfoCTA from "@/components/dyslexia-info/DyslexiaInfoCTA";
import HowLuminaHelps from "@/components/dyslexia-info/HowLuminaHelps";
import CostOfSupport from "@/components/dyslexia-info/CostOfSupport";

export default function DyslexiaInfoPage() {
  return (
    <main className="bg-brand-surface">
      <DyslexiaHero />
      <WhatIsDyslexia />
      <CommonSigns />
      <DyslexiaStrengths />
      <HowLuminaHelps />
      <CostOfSupport />
      <DyslexiaInfoCTA />
    </main>
  );
}
