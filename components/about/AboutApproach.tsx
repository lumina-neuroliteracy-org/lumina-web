import { AnimateIn } from "@/components/AnimateIn";
import { BookOpenCheck, FlaskConical, HeartHandshake } from "lucide-react";

const pillars = [
    {
        icon: BookOpenCheck,
        title: "Structured Literacy",
        description:
            "Explicit, intensive, focused and structured instruction on a regular basis in phonics, decoding, and fluency, the approach with the strongest evidence base for dyslexic learners.",
    },
    {
        icon: FlaskConical,
        title: "Evidence-Based Practice",
        description:
            "Every intervention is grounded in peer-reviewed research. We don't use trendy programmes; we use what actually works.",
    },
    {
        icon: HeartHandshake,
        title: "Whole-Family Involvement",
        description:
            "Parents and guardians are active partners, kept informed, equipped with strategies, and never left guessing what to do between sessions.",
    },
];

export default function AboutApproach() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="rounded-[2rem] bg-brand-navy px-6 py-10 text-brand-on-navy sm:px-10 sm:py-12">
                <AnimateIn>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                        The approach
                    </p>
                    <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight lg:text-4xl">
                        Rooted in research. Shaped around the learner.
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-brand-on-navy/70">
                        Three principles guide every session, every plan, and every
                        conversation at Lumina.
                    </p>
                </AnimateIn>
                <div className="mt-10 grid gap-5 sm:grid-cols-3">
                    {pillars.map((pillar, i) => (
                        <AnimateIn key={pillar.title} delay={0.1 * i} className="h-full">
                            <div className="h-full rounded-[1.5rem] border border-brand-on-navy/10 bg-brand-on-navy/5 p-6">
                                <div className="flex size-10 items-center justify-center rounded-full bg-brand-gold-soft text-brand-gold-strong">
                                    <pillar.icon className="size-5" />
                                </div>
                                <h3 className="mt-5 text-base font-semibold">
                                    {pillar.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-brand-on-navy/70">
                                    {pillar.description}
                                </p>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
