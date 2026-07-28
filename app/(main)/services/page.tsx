import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Lumina's specialist dyslexia tutor services — one-to-one sessions, group workshops, and assessments for children and adults in Ireland.",
  openGraph: {
    title: "Our Services | Lumina Neuro-Literacy Studio",
    description:
      "One-to-one dyslexia tutor, group workshops, and literacy assessments for children and adults across Ireland.",
    url: "/services",
  },
};
import ServicesGrid from "@/components/services/ServicesGrid";
import WorkshopsSection from "@/components/services/WorkshopsSection";
import HowItWorks from "@/components/services/HowItWorks";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ServicesCTA from "@/components/services/ServicesCTA";
import { getUpcomingEvents } from "@/lib/dal/events";

export default async function ServicesPage() {
    const events = await getUpcomingEvents();

    return (
        <main className="bg-brand-surface">
            <ServicesHero />
            <ServicesGrid />
            <WorkshopsSection events={events} />
            <HowItWorks />
            <ServicesFAQ />
            <ServicesCTA />
        </main>
    );
}
