import Link from "next/link";
import { Button } from "../ui/button";
import { AnimateIn } from "../AnimateIn";

export default function ContactBanner() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <div className="rounded-[2rem] border border-brand-gold/40 bg-brand-ivory px-6 py-8 sm:px-8 lg:flex lg:items-center lg:justify-between">
                    <AnimateIn delay={0.2}>
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-brand-gold-strong">
                                Contact
                            </p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy">
                                Ready to build a better support plan?
                            </h2>
                            <p className="mt-4 text-base leading-8 text-brand-muted">
                                Start with a conversation. We can discuss current challenges,
                                goals, and the kind of support that fits best.
                            </p>
                        </div>
                    </AnimateIn>
                    <AnimateIn delay={0.3}>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
                            <Button asChild size="lg" className="rounded-full px-6">
                                <Link href="mailto:info@lumina-literacy.ie">info@lumina-literacy.ie</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                                <Link href="/signup">Create an account</Link>
                            </Button>
                        </div>
                    </AnimateIn>
                </div>
            </AnimateIn>
        </section>
    )
}