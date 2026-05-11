import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Lumina Neuro-Literacy Studio. Book a free consultation or ask us anything about our dyslexia tuition services in Ireland.",
  openGraph: {
    title: "Contact Us | Lumina Neuro-Literacy Studio",
    description:
      "Book a free consultation or get in touch with the Lumina team about our dyslexia tuition services.",
    url: "/contact",
  },
};
import ContactBody from "@/components/contact/ContactBody";

export default function ContactPage() {
  return (
    <main className="bg-brand-surface">
      <ContactHero />
      <ContactBody />
    </main>
  );
}
