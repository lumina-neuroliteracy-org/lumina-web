import RoutePage from "@/components/content/RoutePage";

export default function DyslexiaInfoPage() {
  return (
    <RoutePage
      eyebrow="Dyslexia Info"
      title="A clearer introduction to what dyslexia can look like."
      description="Dyslexia can affect reading, spelling, writing fluency, and processing speed, but it does not define intelligence. The most useful response is early understanding paired with targeted support."
      points={[
        "Reading may feel slow, effortful, or inconsistent even when comprehension is strong.",
        "Writing can involve spelling variability, sequencing trouble, or heavy fatigue.",
        "Confidence often drops when the learner is working hard but not seeing matching results.",
        "The right support usually combines instruction, accommodations, and emotional reassurance.",
      ]}
      primaryCta={{ href: "/contact", label: "Discuss support options" }}
      secondaryCta={{ href: "/about", label: "Learn about Luminar" }}
    />
  );
}
