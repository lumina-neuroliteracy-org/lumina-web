import { ImageResponse } from "next/og";

// Route-wide default social sharing image, generated at build time.
export const alt =
  "Lumina Neuro-Literacy Studio — Specialist dyslexia tutor and literacy support in Ireland";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (from app/globals.css)
const NAVY = "#0E82DF";
const INK = "#111827";
const GOLD = "#d4af37";
const IVORY = "#fff9e8";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: `linear-gradient(135deg, ${INK} 0%, ${NAVY} 100%)`,
          color: IVORY,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: GOLD,
            }}
          />
          <span style={{ fontSize: "34px", fontWeight: 600, letterSpacing: "0.5px" }}>
            Lumina Neuro-Literacy Studio
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <span style={{ fontSize: "68px", fontWeight: 700, lineHeight: 1.1 }}>
            Specialist Dyslexia Tutor
          </span>
          <span style={{ fontSize: "36px", color: "#cbd5e1", maxWidth: "900px" }}>
            Expert-led, accessibility-first literacy support for children and
            adults across Ireland.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "64px", height: "6px", background: GOLD, borderRadius: "3px" }} />
          <span style={{ fontSize: "28px", color: GOLD, fontWeight: 600 }}>
            www.lumina-literacy.ie
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
