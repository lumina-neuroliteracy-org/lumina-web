import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/AnimateIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found — Luminar",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return (
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
            <AnimateIn delay={0}>
                <div className="inline-flex size-20 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-ivory">
                    <SearchX className="size-9 text-brand-navy" />
                </div>
            </AnimateIn>

            <AnimateIn delay={0.1}>
                <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-brand-gold">
                    404
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-brand-navy sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-4 max-w-md text-base leading-7 text-brand-muted">
                    We couldn&apos;t find the page you were looking for. It may have
                    been moved, renamed, or it never existed.
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
                        <Link href="/contact">Contact support</Link>
                    </Button>
                </div>
            </AnimateIn>
        </div>
    );
}
