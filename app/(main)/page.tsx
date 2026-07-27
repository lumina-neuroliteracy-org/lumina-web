import type { Metadata } from "next";
import Homepage from "@/components/homepage/Homepage";

export const metadata: Metadata = {
  title: "Specialist Dyslexia Tutor in Ireland",
  description:
    "Lumina Neuro-Literacy Studio offers specialist dyslexia tuition and literacy support for children and adults across Ireland. Book a free consultation today.",
  openGraph: {
    title: "Lumina Neuro-Literacy Studio",
    description:
      "Specialist dyslexia tutor and literacy support for children and adults in Ireland.",
    url: "/",
  },
};

export default function Home() {
  return <Homepage />;
}
