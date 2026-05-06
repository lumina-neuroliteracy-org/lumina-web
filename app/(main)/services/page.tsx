import ServicesHero from "@/components/services/ServicesHero";
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
