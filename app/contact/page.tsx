import RoutePage from "@/components/content/RoutePage";

export default function ContactPage() {
  return (
    <RoutePage
      eyebrow="Contact"
      title="Start with a conversation about what support is needed."
      description="If you are navigating possible dyslexia signs, school concerns, or questions about next steps, reach out. We can help turn uncertainty into a practical plan."
      points={[
        "Share current challenges, goals, and what support has already been tried.",
        "Get guidance on the most useful next step for the learner’s situation.",
        "Coordinate around family, school, or adult-learning contexts.",
        "Move into a structured support plan when you are ready.",
      ]}
      primaryCta={{ href: "mailto:hello@luminar.dev", label: "Email hello@luminar.dev" }}
      secondaryCta={{ href: "/signup", label: "Create an account" }}
    />
  );
}
