import Hero from "./Hero";
import VideoSection from "./VideoSection";
import HeroServices from "./Services";
import WhyChooseUs from "./WhyChooseUs";
import ContactBanner from "./ContactBanner";

export default function Homepage() {
  return (
    <main className="bg-brand-surface">
      <Hero />
      <VideoSection />
      <HeroServices />
      <WhyChooseUs />
      <ContactBanner />
    </main>
  );
}
