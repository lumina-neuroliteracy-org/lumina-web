import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, CalendarCheck } from "lucide-react";

export default function AboutHero() {
    return (
        <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
            <Image
                src="/about-hero.jpg"
                alt="Luminar specialist working with a learner"
                fill
                className="object-cover object-center"
                priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-brand-navy/65" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center sm:px-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                    About Luminar
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-brand-on-navy sm:text-5xl lg:text-6xl">
                    We believe every learner deserves to feel capable.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-brand-on-navy/80 sm:text-lg">
                    Luminar was built to close the gap between a dyslexia diagnosis and
                    real, confident progress.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="rounded-full border-brand-on-navy/40 bg-transparent px-6 text-brand-on-navy hover:bg-brand-on-navy/10 hover:text-brand-on-navy"
                    >
                        <a href="#video">
                            <Play className="size-4" />
                            Watch intro video
                        </a>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-brand-gold px-6 text-brand-navy hover:bg-brand-gold/90"
                    >
                        <Link href="/contact">
                            <CalendarCheck className="size-4" />
                            Book a session
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
