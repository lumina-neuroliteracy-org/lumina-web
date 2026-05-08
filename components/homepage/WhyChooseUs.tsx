import { AnimateIn } from "../AnimateIn";
import { BookOpen, Clock, ShieldCheck, Users } from "lucide-react";

const benefits = [
    {
        icon: BookOpen,
        title: "Evidence-based methods",
        description: "Every intervention is grounded in research on how dyslexic learners actually build fluency and confidence.",
    },
    {
        icon: Users,
        title: "Whole-family support",
        description: "Learners and Parents/ guardians stay informed and involved. No one is left guessing. Tailored advice and recommendations given after the program concludes.",
    },
    {
        icon: Clock,
        title: "Flexible and consistent",
        description: "Sessions fit around real life work and school schedules and we allow for plans to stay consistent even as life changes.",
    },
    {
        icon: ShieldCheck,
        title: "Safe, low-pressure space",
        description: "Learners grow at their own pace in a safe and trusting environment, designed to reduce anxiety and raise self-belief.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold tracking-[0.18em] uppercase text-brand-gold-strong">
                    Why Choose Us
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy">
                    Built around the learner, not a checklist.
                </h2>
            </AnimateIn>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {benefits.map((benefit, i) => (
                    <AnimateIn key={benefit.title} delay={0.1 * i}>
                        <div className="flex flex-col gap-4 rounded-[1.75rem] border border-border bg-brand-card p-6 shadow-sm h-full">
                            <div className="flex size-11 items-center justify-center rounded-full bg-brand-gold-soft text-brand-gold-strong">
                                <benefit.icon className="size-5" />
                            </div>
                            <h3 className="text-base font-semibold text-brand-navy">
                                {benefit.title}
                            </h3>
                            <p className="text-sm leading-7 text-brand-muted">
                                {benefit.description}
                            </p>
                        </div>
                    </AnimateIn>
                ))}
            </div>
        </section>
    );
}
