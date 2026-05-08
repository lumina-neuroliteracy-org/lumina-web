import { AnimateIn } from "@/components/AnimateIn";

const steps = [
    {
        number: "01",
        title: "Book a consultation",
        description:
            "Share your concerns and your goals in a relaxed, no-pressure conversation. Together we'll figure out the right starting point on our learning journey.",
    },
    {
        number: "02",
        title: "Receive your plan",
        description:
            "Get a tailored assessment and a structured program built around the learner's specific profile, pace, and strengths.",
    },
    {
        number: "03",
        title: "Track your progress",
        description:
            "Regular milestones, progress reports, and open communication keep everyone involved on our learning journey informed at every step of the way",
    },
];

export default function HowItWorks() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="rounded-[2rem] bg-brand-navy px-6 py-10 text-brand-on-navy sm:px-10 sm:py-12">
                <AnimateIn>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                        How it works
                    </p>
                    <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight lg:text-4xl">
                        Three steps to real progress.
                    </h2>
                </AnimateIn>
                <div className="mt-10 grid gap-8 sm:grid-cols-3">
                    {steps.map((step, i) => (
                        <AnimateIn key={step.number} delay={0.1 * i}>
                            <div>
                                <p className="text-4xl font-semibold text-brand-gold">
                                    {step.number}
                                </p>
                                <h3 className="mt-4 text-base font-semibold text-brand-on-navy">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-brand-on-navy/70">
                                    {step.description}
                                </p>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
