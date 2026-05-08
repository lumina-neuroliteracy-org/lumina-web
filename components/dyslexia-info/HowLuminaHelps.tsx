import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { MessageCircle, GraduationCap, FileText, type LucideIcon } from "lucide-react";

interface HelpCard {
    icon: LucideIcon;
    title: string;
    description: string;
}

const cards: HelpCard[] = [
    {
        icon: MessageCircle,
        title: "Consultations & Assessments",
        description:
            "Start with a conversation, then a full assessment to understand the learner's specific profile and the right path forward.",
    },
    {
        icon: GraduationCap,
        title: "Expert Dyslexia Specialist Tuition",
        description:
            "1:1 Structured literacy sessions delivered by an expert dyslexia specialist with experience teaching in a reading intervention school and with the Dyslexia Association of Ireland.",
    },
    {
        icon: FileText,
        title: "Progress Reports",
        description:
            "Clear, regular reports so everyone involved can see exactly what's improving and what needs more focus.",
    },
];

export default function HowLuminaHelps() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                    How Lumina helps
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                    Support at every stage.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-brand-muted">
                    Whether you&apos;re just starting to ask questions or already have a
                    diagnosis, there&apos;s a place to begin.
                </p>
            </AnimateIn>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {cards.map((card, i) => (
                    <AnimateIn key={card.title} delay={0.1 * i}>
                        <article className="flex h-full flex-col rounded-[1.75rem] border border-border bg-brand-card p-6 shadow-sm">
                            <div className="flex size-11 items-center justify-center rounded-full bg-brand-gold-soft text-brand-gold-strong">
                                <card.icon className="size-5" aria-hidden="true" />
                            </div>
                            <h3 className="mt-5 text-base font-semibold text-brand-navy">
                                {card.title}
                            </h3>
                            <p className="mt-3 flex-1 text-sm leading-7 text-brand-muted">
                                {card.description}
                            </p>
                            <Button
                                asChild
                                variant="outline"
                                className="mt-6 rounded-full"
                            >
                                <Link href="/services">Learn more</Link>
                            </Button>
                        </article>
                    </AnimateIn>
                ))}
            </div>
        </section>
    );
}
