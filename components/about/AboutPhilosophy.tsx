import { AnimateIn } from "@/components/AnimateIn";

export default function AboutPhilosophy() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                    Our philosophy
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                    Progress is personal. So is our support.
                </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
                <blockquote className="mt-8 border-l-4 border-brand-gold pl-6">
                    <p className="text-xl font-medium italic leading-8 text-brand-navy">
                        &ldquo;A child who struggles to read is not a child who cannot learn, they
                        are a child who has not yet been taught in the way that works for
                        them.&rdquo;
                    </p>
                </blockquote>
            </AnimateIn>
            <AnimateIn delay={0.25}>
                <div className="mt-8 max-w-2xl space-y-4 text-base leading-8 text-brand-muted">
                    <p>
                        We measure success in small, compounding wins, a word decoded
                        without hesitation, a paragraph read aloud without dread, a learner
                        who raises their hand in class for the first time. These moments
                        don&apos;t happen by accident. They happen through consistency, patience,
                        and a plan built for that specific person.
                    </p>
                    <p>
                        Our tuition is not a quick fix, it&apos;s a partnership and a step by step approach to long lasting results. We take that responsibility seriously for every family and school that trusts us with their learner.
                    </p>
                </div>
            </AnimateIn>
        </section>
    );
}
