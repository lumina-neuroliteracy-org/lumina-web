import TermsOfUse from "@/components/terms/TermsOfUse";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Lumina Neuro-Literacy Studio",
    description:
        "Terms and conditions for enrolling with Lumina Neuro-Literacy Studio, covering payment, cancellation, attendance, and conduct policies.",
};

export default function TermsOfUsePage() {
    return (
        <main className="bg-brand-surface">
            <TermsOfUse />
        </main>
    );
}
