import DyslexiaHero from "@/components/dyslexia-info/DyslexiaHero";
import WhatIsDyslexia from "@/components/dyslexia-info/WhatIsDyslexia";
import CommonSigns from "@/components/dyslexia-info/CommonSigns";
import DyslexiaStrengths from "@/components/dyslexia-info/DyslexiaStrengths";
import HowLuminarHelps from "@/components/dyslexia-info/HowLuminarHelps";
import DyslexiaInfoCTA from "@/components/dyslexia-info/DyslexiaInfoCTA";

export default function DyslexiaInfoPage() {
  return (
    <main className="bg-brand-surface">
      <DyslexiaHero />
      <WhatIsDyslexia />
      <CommonSigns />
      <DyslexiaStrengths />
      <HowLuminarHelps />
      <DyslexiaInfoCTA />
    </main>
  );
}
