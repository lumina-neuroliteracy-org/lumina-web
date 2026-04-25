import { AnimateIn } from "@/components/AnimateIn";

// Replace with real testimonials
const testimonials = [
    {
        quote:
            "Within three months my son was reading chapter books. More than that — he was choosing to read. That's what Luminar gave us.",
        author: "Parent of a 9-year-old learner",
    },
    {
        quote:
            "The structured approach made the difference. We'd tried other tutors but nothing clicked until Luminar. The progress tracker helped us stay motivated.",
        author: "Mother, adult learner support",
    },
    {
        quote:
            "As a class teacher I was skeptical at first. After partnering with Luminar for one term, two of my students made more progress than in the previous two years.",
        author: "Primary school teacher",
    },
];

export default function AboutTestimonials() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                    Testimonials
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                    What families and educators say.
                </h2>
            </AnimateIn>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t, i) => (
                    <AnimateIn key={i} delay={0.1 * i}>
                        <figure className="flex h-full flex-col rounded-[1.75rem] border border-border bg-brand-card p-6 shadow-sm">
                            <span className="text-4xl leading-none text-brand-gold" aria-hidden="true">
                                &ldquo;
                            </span>
                            <blockquote className="mt-2 flex-1 text-sm leading-7 text-brand-muted">
                                <p>{t.quote}</p>
                            </blockquote>
                            <figcaption className="mt-6 text-xs font-semibold text-brand-navy">
                                — {t.author}
                            </figcaption>
                        </figure>
                    </AnimateIn>
                ))}
            </div>
        </section>
    );
}
