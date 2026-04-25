import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { MessageCircle, ClipboardList, GraduationCap, FileText, type LucideIcon } from "lucide-react";

interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
    includes: string[];
    price: string;
    priceNote: string;
}

// Update prices before going live
const services: Service[] = [
    {
        icon: MessageCircle,
        title: "Dyslexia Consultations",
        description:
            "An in-depth conversation to understand the learner's challenges, history, and goals — and map out the right next steps.",
        includes: [
            "60-minute structured session",
            "Review of existing reports or assessments",
            "Written summary and recommendations",
            "Signposting to relevant resources",
        ],
        price: "From £X",
        priceNote: "per consultation",
    },
    {
        icon: ClipboardList,
        title: "Dyslexia Assessments",
        description:
            "A comprehensive, evidence-based assessment that identifies strengths, challenges, and the specific profile of the learner's dyslexia.",
        includes: [
            "Full cognitive and literacy assessment",
            "Detailed written report",
            "Diagnosis and profile summary",
            "Recommendations for school and home",
        ],
        price: "From £X",
        priceNote: "full assessment",
    },
    {
        icon: GraduationCap,
        title: "Specialist Dyslexia Tuition",
        description:
            "Ongoing 1:1 sessions using structured literacy techniques, tailored to the learner's pace, strengths, and current level.",
        includes: [
            "Weekly or bi-weekly sessions",
            "Structured literacy programme",
            "Home practice materials",
            "Regular progress updates for parents",
        ],
        price: "£X",
        priceNote: "per session",
    },
    {
        icon: FileText,
        title: "Literacy Progress Reports",
        description:
            "Clear, detailed reports showing what has improved, what still needs support, and the plan going forward.",
        includes: [
            "Standardised progress measures",
            "Comparison to baseline assessment",
            "Updated learning plan",
            "Suitable for school review meetings",
        ],
        price: "From £X",
        priceNote: "per report",
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

                            <div className="mt-6 flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-2xl font-semibold text-brand-navy">
                                        {service.price}
                                    </p>
                                    <p className="text-xs text-brand-muted">{service.priceNote}</p>
                                </div>
                                <Button asChild className="rounded-full px-6">
                                    <Link href="/contact">Book now</Link>
                                </Button>
                            </div>
                        </article>
                    </AnimateIn>
                ))}
            </div>
        </section>
    );
}
