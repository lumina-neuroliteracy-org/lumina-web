import { AnimateIn } from "@/components/AnimateIn";

export default function WhatIsDyslexia() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                    What is dyslexia
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                    A different way of processing, not a measure of ability.
                </h2>
            </AnimateIn>

            <AnimateIn delay={0.15}>
                <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-brand-muted">
                    <p>
                        According to the 2025 Delphi study and as agreed by dyslexia specific organizations in the UK and Ireland, dyslexia is defined as 'A set of processing difficulties that affects how people learn to read and spell.' It also recognises that it is a neurological condition and requires a more inclusive and neurodiverse approach to intervention and learning. It is neurological,
                        meaning it relates to how the brain processes language, not
                        how intelligent or hard-working a person is.
                    </p>
                    <p>
                        Dyslexia exists on a spectrum. Some people experience mild
                        difficulties; others find reading and writing significantly
                        challenging. With the right support, dyslexic learners can and do
                        thrive.
                    </p>
                </div>
            </AnimateIn>

            <AnimateIn delay={0.25}>
                <div className="mt-8 max-w-2xl rounded-[1.75rem] border border-brand-gold/40 bg-brand-ivory px-6 py-5">
                    <p className="text-base font-medium text-brand-navy">
                        Dyslexia affects around{" "}
                        <span className="text-brand-gold-strong">1 in 10 people</span>. It
                        is not related to intelligence.
                    </p>
                </div>
            </AnimateIn>
        </section>
    );
}
