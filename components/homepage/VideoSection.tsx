import { AnimateIn } from "../AnimateIn";

export default function VideoSection({ youtubeUrl }: { youtubeUrl: string }) {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm lg:text-lg font-semibold tracking-[0.18em] uppercase text-brand-gold-strong">
                    How We Help
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl lg:text-4xl font-semibold tracking-tight text-brand-navy">
                    See what working together actually looks like.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-brand-muted">
                    A short overview of how Lumina supports learners, families, and schools from the first conversation to lasting progress.
                </p>
            </AnimateIn>
            <AnimateIn delay={0.15}>
                <div className="mt-8 overflow-hidden rounded-[2rem] border border-border shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]">
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                            className="absolute inset-0 h-full w-full"
                            src={youtubeUrl}
                            title="How Lumina helps learners with dyslexia"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </AnimateIn>
        </section>
    );
}
