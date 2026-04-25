import { AnimateIn } from "@/components/AnimateIn";

export default function DyslexiaHero() {
    return (
        <div className="w-full bg-brand-navy text-brand-on-navy">
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
                <AnimateIn>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                        Dyslexia Info
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-on-navy sm:text-5xl">
                        Understanding dyslexia.
                    </h1>
                </AnimateIn>
                <AnimateIn delay={0.1}>
                    <p className="mt-4 max-w-xl text-base leading-7 text-brand-on-navy/75 sm:text-lg">
                        Clear, honest information for families, learners, and educators.
                    </p>
                </AnimateIn>
            </div>
        </div>
    );
}
