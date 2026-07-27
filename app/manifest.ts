import type { MetadataRoute } from "next";

// Web app manifest — powers installability and mobile "add to home screen",
// and provides Google with app name/theme signals.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lumina Neuro-Literacy Studio",
    short_name: "Lumina",
    description:
      "Specialist dyslexia tutor and literacy support for children and adults across Ireland.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f3fa",
    theme_color: "#0E82DF",
    lang: "en-IE",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/lumina-logo.png",
        sizes: "135x105",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
