import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/AnimateIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Coming Soon — Lumina",
    description: "Something new is on its way. Stay tuned.",
};

const steps = [
    {
        step: "01",
        label: "Understand",
        description: "We map what learners and families need most.",
    },
    {
        step: "02",
        label: "Build",
        description: "Features designed around real dyslexia journeys.",
    },
    {
        step: "03",
        label: "Launch",
        description: "Rolled out thoughtfully, not rushed to market.",
    },
];

export default function ComingSoonPage() {
    return (
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
            <AnimateIn delay={0}>
                <div className="inline-flex size-20 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-ivory">
                    <Sparkles className="size-9 text-brand-navy" />
                </div>
            </AnimateIn>

            <AnimateIn delay={0.1}>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-ivory px-4 py-1.5 text-sm text-brand-navy">
                    In progress
                </div>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-brand-navy sm:text-5xl">
                    Something&apos;s on its way
                </h1>
                <p className="mt-4 max-w-md text-base leading-7 text-brand-muted">
                    We&apos;re working on this part of Lumina. Check back soon —
                    we&apos;ll have it ready for you before long.
                </p>
            </AnimateIn>

            <AnimateIn delay={0.2}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg" className="rounded-full px-6">
                        <Link href="/">
                            <ArrowLeft className="size-4" />
                            Back to home
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-full px-6"
                    >
                        <Link href="/contact">Get notified</Link>
                    </Button>
                </div>
            </AnimateIn>

            <div className="mt-16 grid w-full max-w-2xl gap-6 sm:grid-cols-3">
                {steps.map(({ step, label, description }, i) => (
                    <AnimateIn key={step} delay={0.3 + i * 0.1}>
                        <div className="rounded-2xl border border-border bg-brand-card p-6 text-left">
                            <p className="text-3xl font-semibold text-brand-navy">
                                {step}
                            </p>
                            <p className="mt-2 font-medium text-brand-navy">
                                {label}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-brand-muted">
                                {description}
                            </p>
                        </div>
                    </AnimateIn>
                ))}
            </div>
        </div>
    );
}
