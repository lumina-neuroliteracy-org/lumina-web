import Link from "next/link";
import { Button } from "../ui/button";

const serviceCards = [
    {
        title: "Screening Support",
        description:
            "Early observation tools and guided next steps for everyone involved in the learning journey.",
    },
    {
        title: "Learning Plans",
        description:
            "Systematic, explicit, targeted, focused intervention with structured literacy framework custom designed to meet your child's pace, strengths, confidence and needs.",
    },
    {
        title: "Progress Tracking",
        description:
            "Specific, measurable, achievable, realistic and concise targets that help make clear what is improving and what needs support.",
    },
];

export default function HeroServices() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                    <p className="text-sm lg:text-lg font-semibold tracking-[0.18em] uppercase text-brand-gold-strong">
                        Services
                    </p>
                    <h2 className="mt-3 text-3xl lg:text-4xl  font-semibold tracking-tight text-brand-navy">
                        Practical help for every stage of the journey.
                    </h2>
                </div>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {serviceCards.map((card) => (
                    <article
                        key={card.title}
                        className="rounded-[1.75rem] border border-border bg-brand-card p-6 shadow-sm"
                    >
                        <h3 className="text-xl font-semibold text-brand-navy">
                            {card.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-brand-muted">
                            {card.description}
                        </p>
                    </article>
                ))}
            </div>
            <Button asChild variant="outline" className="mt-8 rounded-full px-5">
                <Link href="/services">View all services</Link>
            </Button>
        </section>
    )
}