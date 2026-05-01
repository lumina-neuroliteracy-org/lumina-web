import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";

export default function ServicesHero() {
    return (
        <section className="relative h-[60vh] min-h-105 w-full overflow-hidden">
            <Image
                src="/hero-one.jpg"
                alt="Lumina specialist session in progress"
                fill
                className="object-cover object-center"
                priority
            />
            <div className="absolute inset-0 bg-brand-navy/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center sm:px-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                    Services
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-brand-on-navy sm:text-5xl lg:text-6xl">
                    Everything you need to move forward.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-brand-on-navy/80">
                    From first assessment to ongoing tuition — structured, evidence-based
                    support at every stage of the dyslexia journey.
                </p>
                <Button
                    asChild
                    size="lg"
                    className="mt-8 rounded-full bg-brand-gold px-8 text-brand-navy hover:bg-brand-gold/90"
                >
                    <Link href="/contact">
                        <CalendarCheck className="size-4" />
                        Book a consultation
                    </Link>
                </Button>
            </div>
        </section>
    );
}
