import { AnimateIn } from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { CalendarCheck, MessageCircle } from "lucide-react";

export default function ContactHero() {
    return (
        <div className="w-full bg-brand-navy text-brand-on-navy">
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
                <AnimateIn>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                        Contact
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-on-navy sm:text-5xl">
                        Get in touch.
                    </h1>
                </AnimateIn>
                <AnimateIn delay={0.1}>
                    <p className="mt-4 max-w-xl text-base leading-7 text-brand-on-navy/75 sm:text-lg">
                        Book a session, ask a question, or tell us about your learner.
                        We&apos;ll get back to you promptly.
                    </p>
                </AnimateIn>
                <AnimateIn delay={0.2}>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="rounded-full bg-brand-gold px-6 text-brand-navy hover:bg-brand-gold/90"
                        >
                            <a href="#contact-form">
                                <CalendarCheck className="size-4" />
                                Book a Session
                            </a>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="rounded-full border-brand-on-navy/40 bg-transparent px-6 text-brand-on-navy hover:bg-brand-on-navy/10 hover:text-brand-on-navy"
                        >
                            <a href="#contact-form">
                                <MessageCircle className="size-4" />
                                Contact Us
                            </a>
                        </Button>
                    </div>
                </AnimateIn>
            </div>
        </div>
    );
}
