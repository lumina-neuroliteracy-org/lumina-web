import Image from "next/image";

export default function BlogHero() {
    return (
        <section className="relative h-[55vh] min-h-96 w-full overflow-hidden">
            <Image
                src="/hero-one.jpg"
                alt="Lumina blog — resources for families and educators"
                fill
                className="object-cover object-center"
                priority
            />
            <div className="absolute inset-0 bg-brand-navy/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center sm:px-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                    Insights about Dyslexia
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-brand-on-navy sm:text-5xl lg:text-6xl">
                   Dyslexia Resources for families and educators.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-brand-on-navy/80 sm:text-lg">
                    Practical insights on dyslexia, structured literacy, and supporting
                    every learner to thrive.
                </p>
            </div>
        </section>
    );
}
