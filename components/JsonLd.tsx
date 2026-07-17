const SITE_URL = "https://www.lumina-literacy.ie";

// Organization + LocalBusiness structured data (schema.org) for rich results
// and local search. Kept in sync with metadata in app/layout.tsx.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "Lumina Neuro-Literacy Studio",
  description:
    "Specialist dyslexia tuition and literacy support for children and adults across Ireland. Expert-led, accessibility-first sessions online and in-person.",
  url: SITE_URL,
  logo: `${SITE_URL}/lumina-logo.png`,
  image: `${SITE_URL}/opengraph-image`,
  email: "info@lumina-literacy.ie",
  telephone: "+353874523726",
  areaServed: {
    "@type": "Country",
    name: "Ireland",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IE",
  },
  knowsAbout: [
    "Dyslexia tuition",
    "Literacy support",
    "Neuro-literacy",
    "Specialist teaching",
  ],
  sameAs: ["https://www.youtube.com/@Neuro-literacystudio"],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
