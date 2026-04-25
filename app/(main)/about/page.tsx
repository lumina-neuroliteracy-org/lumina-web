import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutMission from "@/components/about/AboutMission";
import AboutSpecialist from "@/components/about/AboutSpecialist";
import AboutApproach from "@/components/about/AboutApproach";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutTestimonials from "@/components/about/AboutTestimonials";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <main className="bg-brand-surface">
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutSpecialist />
      <AboutApproach />
      <AboutPhilosophy />
      <AboutTestimonials />
      <AboutCTA />
    </main>
  );
}
