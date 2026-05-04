import { AnimateIn } from "@/components/AnimateIn";
import {
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    Database,
    Users,
    Lock,
    FileText,
    BookOpen,
} from "lucide-react";

const sections = [
    {
        id: "information-collected",
        icon: Database,
        title: "Information We Collect",
        items: [
            {
                label: "Contact Information",
                text: "When you fill out our contact form, we collect your name, email address, and phone number.",
            },
            {
                label: "Educational Context",
                text: "We may collect preliminary information about your child's learning needs (e.g., interests in dyslexia or autism support) to better prepare for your initial consultation.",
            },
            {
                label: "Website Usage",
                text: "Like most websites, we collect non-identifying data such as IP addresses and browser types via cookies to improve our site performance.",
            },
        ],
    },
    {
        id: "data-use",
        icon: BookOpen,
        title: "How We Use Your Data",
        intro: "We use your information exclusively to:",
        items: [
            { text: "Respond to your inquiries about our tuition services." },
            { text: "Provide specialised, brain-based educational support." },
            {
                text: "Send you progress updates and administrative information regarding your sessions.",
            },
            { text: "Comply with legal and tax obligations in Ireland." },
        ],
    },
    {
        id: "special-category",
        icon: ShieldCheck,
        title: "Special Category Data",
        body: "As specialists in neuro-literacy, we often process sensitive information regarding learning profiles and health. This data is handled with the highest level of confidentiality and is only processed with your explicit, written consent provided during the enrollment process.",
    },
    {
        id: "data-sharing",
        icon: Users,
        title: "Data Sharing & Third Parties",
        items: [
            {
                label: "No Selling",
                text: "We never sell, rent, or trade your personal data to third parties.",
            },
            {
                label: "Confidentiality",
                text: "We do not share student information with schools or clinicians without your express permission.",
            },
            {
                label: "Security",
                text: "We use secure, encrypted digital storage to protect your family's records.",
            },
        ],
    },
    {
        id: "gdpr-rights",
        icon: FileText,
        title: "Your GDPR Rights",
        intro: "Under Irish and EU data protection laws, you have the right to:",
        items: [
            {
                label: "Access",
                text: "Request a copy of the personal data we hold.",
            },
            {
                label: "Correction",
                text: "Ask us to update or fix inaccurate information.",
            },
            {
                label: "Erasure",
                text: "Request that we delete your data (subject to legal record keeping requirements).",
            },
            {
                label: "Withdrawal",
                text: "Withdraw your consent for data processing at any time.",
            },
        ],
    },
];

export default function PrivacyPolicy() {
    return (
        <div className="bg-brand-surface">
            {/* Hero */}
            <div className="w-full bg-brand-navy text-brand-on-navy">
                <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
                    <AnimateIn>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                            Legal
                        </p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-on-navy sm:text-5xl">
                            Parental Consent &amp; Data Processing Agreement
                        </h1>
                    </AnimateIn>
                    <AnimateIn delay={0.1}>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-brand-on-navy/75 sm:text-lg">
                            We are committed to protecting the privacy of our students and
                            their families. This policy explains how we collect, use, and
                            safeguard your data when you visit our website or engage our
                            tuition services.
                        </p>
                        <p className="mt-3 text-sm text-brand-on-navy/50">
                            Last Updated: April 2026
                        </p>
                    </AnimateIn>
                </div>
            </div>

            {/* Body */}
            <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:py-20">
                <div className="space-y-12">
                    {sections.map((section, i) => {
                        const Icon = section.icon;
                        return (
                            <AnimateIn key={section.id} delay={i * 0.07}>
                                <div className="rounded-2xl bg-brand-card p-8 shadow-sm ring-1 ring-brand-navy/8">
                                    <div className="mb-5 flex items-center gap-3">
                                        <span className="flex size-10 items-center justify-center rounded-full bg-brand-navy/10">
                                            <Icon className="size-5 text-brand-navy" />
                                        </span>
                                        <h2 className="text-xl font-semibold text-brand-ink">
                                            {section.title}
                                        </h2>
                                    </div>

                                    {"intro" in section && section.intro && (
                                        <p className="mb-3 text-brand-muted">{section.intro}</p>
                                    )}

                                    {"body" in section && section.body && (
                                        <p className="text-base leading-relaxed text-brand-muted">
                                            {section.body}
                                        </p>
                                    )}

                                    {"items" in section && section.items && (
                                        <ul className="space-y-3">
                                            {section.items.map((item, j) => (
                                                <li key={j} className="flex gap-3">
                                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                                                    <p className="text-base leading-relaxed text-brand-muted">
                                                        {"label" in item && item.label ? (
                                                            <>
                                                                <span className="font-semibold text-brand-ink">
                                                                    {item.label}:{" "}
                                                                </span>
                                                                {item.text}
                                                            </>
                                                        ) : (
                                                            item.text
                                                        )}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </AnimateIn>
                        );
                    })}

                    {/* Contact */}
                    <AnimateIn delay={sections.length * 0.07}>
                        <div className="rounded-2xl bg-brand-navy p-8 text-brand-on-navy shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <span className="flex size-10 items-center justify-center rounded-full bg-brand-on-navy/15">
                                    <Lock className="size-5 text-brand-gold" />
                                </span>
                                <h2 className="text-xl font-semibold text-brand-on-navy">
                                    Contact Us
                                </h2>
                            </div>
                            <p className="mb-6 text-brand-on-navy/75">
                                If you have any questions about this Privacy Policy or how your
                                data is handled, please contact us.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <Mail className="size-4 shrink-0 text-brand-gold" />
                                    <a
                                        href="mailto:info@lumina-literacy.ie"
                                        className="text-brand-on-navy/90 underline-offset-2 hover:underline"
                                    >
                                        info@lumina-literacy.ie
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="size-4 shrink-0 text-brand-gold" />
                                    <a
                                        href="tel:+353874523726"
                                        className="text-brand-on-navy/90 underline-offset-2 hover:underline"
                                    >
                                        087 452 3726
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <MapPin className="size-4 shrink-0 text-brand-gold" />
                                    <span className="text-brand-on-navy/90">Dublin, Ireland</span>
                                </li>
                            </ul>
                        </div>
                    </AnimateIn>

                    {/* Consent statement */}
                    <AnimateIn delay={(sections.length + 1) * 0.07}>
                        <div className="rounded-2xl border border-brand-gold/40 bg-brand-ivory px-8 py-6">
                            <p className="text-sm leading-relaxed text-brand-on-gold">
                                <span className="font-semibold">Consent: </span>
                                I agree with the processing of my data in accordance with the
                                Privacy Policy.
                            </p>
                        </div>
                    </AnimateIn>
                </div>
            </div>
        </div>
    );
}
