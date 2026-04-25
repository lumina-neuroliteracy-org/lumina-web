import { AnimateIn } from "@/components/AnimateIn";
import { Lightbulb, Eye, Wrench, Users } from "lucide-react";

const strengths = [
    {
        icon: Lightbulb,
        title: "Creative thinking",
        description: "Strong imagination and lateral problem-solving.",
    },
    {
        icon: Eye,
        title: "Big-picture thinking",
        description: "Excellent at seeing patterns and connections others miss.",
    },
    {
        icon: Wrench,
        title: "Practical problem-solving",
        description: "Often highly capable in hands-on, real-world tasks.",
    },
    {
        icon: Users,
        title: "Empathy & communication",
        description: "Strong interpersonal skills and emotional intelligence.",
    },
];

export default function DyslexiaStrengths() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="rounded-[2rem] bg-brand-navy px-6 py-10 text-brand-on-navy sm:px-10 sm:py-12">
                <AnimateIn>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                        Strengths
                    </p>
                    <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight lg:text-4xl">
                        Dyslexia comes with real strengths too.
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-brand-on-navy/75">
                        Many dyslexic thinkers excel in areas that depend on creativity,
                        spatial reasoning, and seeing the world differently.
                    </p>
                </AnimateIn>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {strengths.map((strength, i) => (
                        <AnimateIn key={strength.title} delay={0.1 * i}>
                            <div className="rounded-[1.5rem] border border-brand-on-navy/10 bg-brand-on-navy/5 p-5">
                                <div className="flex size-10 items-center justify-center rounded-full bg-brand-gold-soft text-brand-gold-strong">
                                    <strength.icon className="size-5" aria-hidden="true" />
                                </div>
                                <h3 className="mt-4 text-sm font-semibold text-brand-on-navy">
                                    {strength.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-brand-on-navy/70">
                                    {strength.description}
                                </p>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
