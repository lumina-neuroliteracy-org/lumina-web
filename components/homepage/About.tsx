import { Link } from "lucide-react";
import { Button } from "../ui/button";

export default function AboutHero() {
    return (
        <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="max-w-3xl">
                <p className="text-sm font-semibold tracking-[0.18em] uppercase text-brand-gold-strong">
                    About
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy">
                    Support that respects how people actually learn.
                </h2>
                <p className="mt-5 text-base leading-8 text-brand-muted">
                    Dyslexia is not a measure of intelligence. It is a different way
                    of processing language, and the right support can make reading,
                    writing, and confidence feel far more manageable.
                </p>
                <Button asChild variant="outline" className="mt-6 rounded-full px-5">
                    <Link href="/about">Read more</Link>
                </Button>
            </div>
        </section>
    )
}