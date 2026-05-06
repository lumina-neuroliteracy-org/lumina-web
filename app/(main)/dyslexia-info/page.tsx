import DyslexiaHero from "@/components/dyslexia-info/DyslexiaHero";
import WhatIsDyslexia from "@/components/dyslexia-info/WhatIsDyslexia";
import CommonSigns from "@/components/dyslexia-info/CommonSigns";
import DyslexiaStrengths from "@/components/dyslexia-info/DyslexiaStrengths";
import DyslexiaInfoCTA from "@/components/dyslexia-info/DyslexiaInfoCTA";
import HowLuminaHelps from "@/components/dyslexia-info/HowLuminaHelps";

export default function DyslexiaInfoPage() {
  return (
    <main className="bg-brand-surface">
      <DyslexiaHero />
      <WhatIsDyslexia />
      <CommonSigns />
      <DyslexiaStrengths />
      <HowLuminaHelps />
      <DyslexiaInfoCTA />
    </main>
  );
}
