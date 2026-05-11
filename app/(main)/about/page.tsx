import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the specialist team behind Lumina Neuro-Literacy Studio. Learn about our mission, approach, and commitment to supporting dyslexic learners in Ireland.",
  openGraph: {
    title: "About Us | Lumina Neuro-Literacy Studio",
    description:
      "Meet the specialist team behind Lumina and learn about our mission to support dyslexic learners across Ireland.",
    url: "/about",
  },
};
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
