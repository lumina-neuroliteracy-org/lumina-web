import Hero from "./Hero";
import ContactBanner from "./ContactBanner";

export default function Homepage() {
  return (
    <main className="bg-brand-surface">
      <Hero />
      <ContactBanner />
    </main>
  );
}
