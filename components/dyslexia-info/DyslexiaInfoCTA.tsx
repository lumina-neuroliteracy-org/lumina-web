import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/AnimateIn";

export default function DyslexiaInfoCTA() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <div className="rounded-[2rem] border border-brand-gold/40 bg-brand-ivory px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                            Get support
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy">
                            Have questions? We&apos;re here to help.
                        </h2>
                        <p className="mt-4 text-base leading-7 text-brand-muted">
                            Whether you&apos;re a parent, an adult learner, or a teacher,
                            reach out and we&apos;ll talk through the right next step.
                        </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col xl:flex-row">
                        <Button asChild size="lg" className="rounded-full px-6">
                            <Link href="/contact">Book a consultation</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                            <Link href="/services">View all services</Link>
                        </Button>
                    </div>
                </div>
            </AnimateIn>
        </section>
    );
}
