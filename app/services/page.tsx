import RoutePage from "@/components/content/RoutePage";

export default function ServicesPage() {
  return (
    <RoutePage
      eyebrow="Services"
      title="Practical help for every stage of the dyslexia journey."
      description="From early concerns to structured intervention planning, Luminar gives learners and support teams a clearer path forward with guidance that stays concrete and actionable."
      points={[
        "Screening support that helps identify patterns worth investigating further.",
        "Intervention planning that balances structure, pacing, and real-world learning needs.",
        "Progress reviews that surface what is working and what should change.",
        "Guidance for families and schools so support stays aligned across environments.",
      ]}
      primaryCta={{ href: "/contact", label: "Book a consultation" }}
      secondaryCta={{ href: "/signup", label: "Create an account" }}
    />
  );
}
