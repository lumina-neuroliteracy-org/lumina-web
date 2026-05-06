import { AnimateIn } from "@/components/AnimateIn";

export default function AboutMission() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                    Our mission
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                    Support that starts with understanding, not labels.
                </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
                <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-brand-muted">
                    <p>
                        Lumina was founded on a simple conviction: that dyslexia is not a
                        barrier to brilliance, it's a different way of processing the world
                        that deserves a different kind of support. Too many learners spend
                        years feeling behind before anyone names what is actually happening.
                    </p>
                    <p>
                        We exist to shorten that gap. From the first conversation to a
                        structured, confidence-building plan, every step is designed around
                        the learner, not a checklist, not a fixed curriculum, not
                        one-size-fits-all scripts.
                    </p>
                </div>
            </AnimateIn>
        </section>
    );
}
