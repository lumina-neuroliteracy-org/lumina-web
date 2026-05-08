import Hero from "./Hero";
import VideoSection from "./VideoSection";
import HeroServices from "./Services";
import WhyChooseUs from "./WhyChooseUs";
import ContactBanner from "./ContactBanner";
import AboutTestimonials from "../about/AboutTestimonials";
import UpcomingEventBanner from "./UpcomingEventBanner";
import { getSetting } from "@/lib/dal/settings";

const FALLBACK_YOUTUBE_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export default async function Homepage() {
  const youtubeUrl = (await getSetting("homepage_youtube_url")) ?? FALLBACK_YOUTUBE_URL;

  return (
    <main className="bg-brand-surface">
      <Hero />
      <UpcomingEventBanner />
      <VideoSection youtubeUrl={youtubeUrl} />
      <HeroServices />
      <ContactBanner />
      <WhyChooseUs />
      <AboutTestimonials />
    </main>
  );
}
