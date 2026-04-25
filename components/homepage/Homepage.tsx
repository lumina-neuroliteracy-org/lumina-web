import Hero from "./Hero";
import VideoSection from "./VideoSection";
import HeroServices from "./Services";
import WhyChooseUs from "./WhyChooseUs";
import ContactBanner from "./ContactBanner";
import AboutTestimonials from "../about/AboutTestimonials";

export default function Homepage() {
  return (
    <main className="bg-brand-surface">
      <Hero />
      <VideoSection />
      <HeroServices />
      <ContactBanner />
      <WhyChooseUs />
      <AboutTestimonials />
    </main>
  );
}
