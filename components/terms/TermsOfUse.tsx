import { AnimateIn } from "@/components/AnimateIn";
import {
    Mail,
    Phone,
    MapPin,
    BookOpen,
    CreditCard,
    CalendarClock,
    Clock,
    Users,
    FileX,
    ScrollText,
} from "lucide-react";

const sections = [
    {
        id: "tuition-services",
        icon: BookOpen,
        title: "Tuition & Services",
        items: [
            {
                label: "Specialised Approach",
                text: "Lumina provides evidence-based, multisensory literacy tuition tailored to the student's specific learning profile (Dyslexia).",
            },
            {
                label: "Initial Assessment",
                text: "A preliminary consultation/assessment may be required to establish a baseline and set achievable goals.",
            },
        ],
    },
    {
        id: "payment-fees",
        icon: CreditCard,
        title: "Payment & Fees",
        items: [
            {
                label: "Rates",
                text: "Tuition fees are communicated prior to the first session.",
            },
            {
                label: "Invoicing",
                text: "Payments are due 24 hours before the session / on the day of the session.",
            },
            {
                label: "Payment Methods",
                text: "We accept Bank Transfer, Revolut, and Cash.",
            },
            {
                label: "Late Payments",
                text: "We reserve the right to suspend sessions if fees remain unpaid for more than two consecutive days.",
            },
        ],
    },
    {
        id: "attendance-cancellation",
        icon: CalendarClock,
        title: "Attendance & Cancellation Policy",
        intro: "Your session time is reserved exclusively for your child. To maintain a fair schedule:",
        items: [
            {
                label: "Cancellations",
                text: "At least 24 hours notice is required to cancel or reschedule a session.",
            },
            {
                label: "Late Cancellations",
                text: "Sessions cancelled with less than 24 hours notice will be charged at the full rate.",
            },
            {
                label: "Tutor Absence",
                text: "If Francis or a Lumina tutor must cancel, we will offer a makeup session or a full refund for that credit.",
            },
        ],
    },
    {
        id: "punctuality",
        icon: Clock,
        title: "Punctuality",
        body: "Sessions will begin and end strictly at the scheduled time. If a student arrives late, the session cannot be extended beyond the original end time as this impacts the next student's start time.",
    },
    {
        id: "parental-involvement",
        icon: Users,
        title: "Parental Involvement & Conduct",
        items: [
            {
                label: "The Studio Environment",
                text: "To ensure focus, we ask that parents/guardians provide a quiet, distraction-free environment (online classes) or follow the studio's designated drop-off/pick-up protocols.",
            },
            {
                label: "Mutual Respect",
                text: "We maintain a policy of restorative practice. We expect respectful communication between tutors, parents, and students at all times.",
            },
        ],
    },
    {
        id: "termination",
        icon: FileX,
        title: "Termination of Service",
        items: [
            {
                text: "Either party may terminate tuition with one week's notice.",
            },
            {
                text: "Lumina reserves the right to terminate services immediately in the event of persistent non-payment or behaviour that makes effective instruction impossible.",
            },
        ],
    },
];

export default function TermsOfUse() {
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
                            Terms of Service
                        </h1>
                    </AnimateIn>
                    <AnimateIn delay={0.1}>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-brand-on-navy/75 sm:text-lg">
                            By enrolling in tuition with Lumina, you agree to the following
                            terms and conditions. These are designed to ensure a consistent,
                            high-quality learning environment for every student.
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
                                    <ScrollText className="size-5 text-brand-gold" />
                                </span>
                                <h2 className="text-xl font-semibold text-brand-on-navy">
                                    Questions About These Terms
                                </h2>
                            </div>
                            <p className="mb-6 text-brand-on-navy/75">
                                If you have any questions about these Terms of Service, please
                                don&apos;t hesitate to get in touch with us directly.
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

                    {/* Notice */}
                    <AnimateIn delay={(sections.length + 1) * 0.07}>
                        <div className="rounded-2xl border border-brand-gold/40 bg-brand-ivory px-8 py-6">
                            <p className="text-sm leading-relaxed text-brand-on-gold">
                                <span className="font-semibold">Notice: </span>
                                By creating an account or enrolling in tuition with Lumina
                                Neuro-Literacy Studio, you confirm that you have read and
                                understood these Terms of Service.
                            </p>
                        </div>
                    </AnimateIn>
                </div>
            </div>
        </div>
    );
}
