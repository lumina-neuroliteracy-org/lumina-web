import PrivacyPolicy from "@/components/privacy/PrivacyPolicy";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Lumina Neuro-Literacy Studio",
    description:
        "Parental consent and data processing agreement for Lumina Neuro-Literacy Studio. Learn how we collect, use, and protect your family's data.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-brand-surface">
            <PrivacyPolicy />
        </main>
    );
}
