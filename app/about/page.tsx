import RoutePage from "@/components/content/RoutePage";

export default function AboutPage() {
  return (
    <RoutePage
      eyebrow="About"
      title="Support that respects how people actually learn."
      description="Luminar exists to help learners with dyslexia feel understood, supported, and equipped with practical next steps. We focus on clarity, confidence, and sustainable progress."
      points={[
        "We frame dyslexia as a learning difference, not a lack of potential.",
        "Families and educators get clear language for what is happening and what to do next.",
        "Support plans are built around the person, not a generic checklist.",
        "Progress is tracked in ways that stay useful outside a single session.",
      ]}
      primaryCta={{ href: "/contact", label: "Talk to us" }}
      secondaryCta={{ href: "/services", label: "See services" }}
    />
  );
}
