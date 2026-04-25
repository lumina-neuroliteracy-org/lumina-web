import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import WorkshopsSection from "@/components/services/WorkshopsSection";
import HowItWorks from "@/components/services/HowItWorks";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ServicesCTA from "@/components/services/ServicesCTA";

export default function ServicesPage() {
  return (
    <main className="bg-brand-surface">
      <ServicesHero />
      <ServicesGrid />
      <WorkshopsSection />
      <HowItWorks />
      <ServicesFAQ />
      <ServicesCTA />
    </main>
  );
}
