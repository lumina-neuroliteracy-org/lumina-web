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
                        Lumina was founded on a simple conviction: that dyslexia is not a barrier to brilliance but rather the style of teaching is the barrier and that not enough access to expertise is available. Too many learners spend too long feeling less than, or left behind before someone spots what is happening and how to help.
                    </p>
                    <p>
                        We exist to break that barrier to access, to expertise and to brilliance. From the first conversation to a diagnostic assessment and road map to a structured literacy plan. Watch your child's confidence and achievements bloom as every step is designed around the learner's individual and specific needs, not a checklist for what has been covered but not learned, or a standardised curriculum that leaves neuro diverse learners behind or one-size-fits-all programs that are hit and miss. Stop guessing, start glowing with the Lumina Neuro-Literacy Studio approach.
                    </p>
                </div>
            </AnimateIn>
        </section>
    );
}
