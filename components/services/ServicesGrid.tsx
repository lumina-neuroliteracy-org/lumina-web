import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { MessageCircle, ClipboardList, GraduationCap, FileText, type LucideIcon } from "lucide-react";

interface PriceTier {
    label: string;
    total: string;
    perSession?: string;
}

interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
    includes: string[];
    price: string;
    priceNote: string;
    priceTiers?: PriceTier[];
    bookingHref?: string;
    whatsappMessage?: string;
}

const WHATSAPP_NUMBER = "353874523726";

function whatsappHref(message: string) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const services: Service[] = [
    {
        icon: MessageCircle,
        title: "Dyslexia Consultation",
        description:
            "An in-depth conversation to understand the learner's challenges, history and goals, and map out the right next steps.",
        includes: [
            "30-minute structured session",
            "Review of existing reports or assessments",
            "Written summary and recommendations",
            "Signposting to relevant resources",
        ],
        price: "Free",
        priceNote: "no charge",
        bookingHref: "https://tidycal.com/104qe7v/free-15-minute-screening-and-needs-assessment",
    },
    {
        icon: ClipboardList,
        title: "Literacy & Placement Assessment",
        description:
            "A comprehensive, evidence-based assessment that identifies strengths, challenges, and priority areas of concern.",
        includes: [
            "Full diagnostic phonological awareness and literacy assessment",
            "Detailed written report",
            "Collaborative agreement based on assessment findings to tailor program to the learner's specific needs",
        ],
        price: "€100",
        priceNote: "initial assessment",
        bookingHref: "https://tidycal.com/104qe7v/individual-dyslexia-tutoring-session",
    },
    {
        icon: GraduationCap,
        title: "Specialist Dyslexia Tuition",
        description:
            "Ongoing 1:1 sessions using structured literacy techniques, tailored to the learner's pace, strengths, and current level.",
        includes: [
            "Weekly sessions",
            "Structured literacy program - Intensive, Explicit, Systematic and focused instruction.",
            "Home practice materials",
            "Regular progress updates for parents",
        ],
        price: "From €45",
        priceNote: "per session",
        bookingHref: "https://tidycal.com/104qe7v/monthly-dyslexia-tutor-membership",
        priceTiers: [
            { label: "1 session per week", total: "€60" },
            { label: "2 sessions per week", total: "€110", perSession: "€55 each" },
            { label: "3 sessions per week", total: "€150", perSession: "€50 each" },
            { label: "4 sessions per week", total: "€180", perSession: "€45 each" },
        ],
    },
    {
        icon: FileText,
        title: "Literacy Progress Reports",
        description:
            "Clear, detailed reports showing what has improved, what still needs support, and the plan going forward.",
        includes: [
            "Tailored progress target report",
            "Concluding assessment to compare to initial assessment",
            "Updated learning plan",
            "Suitable for school review meetings",
        ],
        price: "Free",
        priceNote: "included with tuition",
        whatsappMessage: "Hi, I'd like to enquire about Literacy Progress Reports at Lumina. Could you give me more details?",
    },
];

export default function ServicesGrid() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                    Our services
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                    Practical help for every stage of the journey.
                </h2>
            </AnimateIn>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {services.map((service, i) => (
                    <AnimateIn key={service.title} delay={0.1 * i}>
                        <article className="flex h-full flex-col rounded-[2rem] border border-border bg-brand-card p-8 shadow-sm">
                            <div className="flex size-12 items-center justify-center rounded-full bg-brand-gold-soft text-brand-gold-strong">
                                <service.icon className="size-5" />
                            </div>
                            <h3 className="mt-5 text-xl font-semibold text-brand-navy">
                                {service.title}
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-brand-muted">
                                {service.description}
                            </p>

                            <div className="my-5 border-t border-border" />

                            <p className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                                What&apos;s included
                            </p>
                            <ul className="mt-3 flex-1 space-y-2">
                                {service.includes.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-brand-muted">
                                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 space-y-4">
                                {service.priceTiers ? (
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-brand-muted mb-2">
                                            Session bundles
                                        </p>
                                        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
                                            {service.priceTiers.map((tier) => (
                                                <div key={tier.label} className="flex items-center justify-between px-3 py-2 bg-background text-sm">
                                                    <span className="text-brand-muted">{tier.label}</span>
                                                    <div className="text-right">
                                                        <span className="font-semibold text-brand-navy">{tier.total}</span>
                                                        {tier.perSession && (
                                                            <span className="ml-1.5 text-xs text-brand-muted">({tier.perSession})</span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className={`text-2xl font-semibold ${service.price === "Free" ? "text-emerald-600" : "text-brand-navy"}`}>
                                            {service.price}
                                        </p>
                                        <p className="text-xs text-brand-muted">{service.priceNote}</p>
                                    </div>
                                )}
                                <div className="flex justify-end">
                                    <Button asChild className="rounded-full px-6">
                                        <Link
                                            href={
                                                service.bookingHref ??
                                                (service.whatsappMessage
                                                    ? whatsappHref(service.whatsappMessage)
                                                    : "/contact")
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Book now
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </article>
                    </AnimateIn>
                ))}
            </div>
        </section>
    );
}
