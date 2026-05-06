import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/AnimateIn";
import { Play, CalendarCheck } from "lucide-react";

export default function AboutCTA() {
    return (
        <section id="video" className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <div className="rounded-[2rem] border border-brand-gold/40 bg-brand-ivory px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                            Ready to start?
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy">
                            See Lumina in action, then book your first session.
                        </h2>
                        <p className="mt-4 text-base leading-7 text-brand-muted">
                           Book a free 30-minute consultation to discuss your needs and how we can support you.
                        </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col xl:flex-row">
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="rounded-full px-6"
                        >
                            {/* Replace href with your YouTube video URL */}
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <Play className="size-4" />
                                Watch intro video
                            </a>
                        </Button>
                        <Button asChild size="lg" className="rounded-full px-6">
                            <Link href="/contact">
                                <CalendarCheck className="size-4" />
                                Book a session
                            </Link>
                        </Button>
                    </div>
                </div>
            </AnimateIn>
        </section>
    );
}
