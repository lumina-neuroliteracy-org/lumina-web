import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { Coffee, Sandwich, Clapperboard, ShoppingCart, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Tier {
    sessions: string;
    weekly: string;
    daily: string | null;
    comparison: string;
    Icon: LucideIcon;
}

const tiers: Tier[] = [
    {
        sessions: "1 session / week",
        weekly: "€60",
        daily: "€8.50",
        comparison: "2 coffees in Dublin",
        Icon: Coffee,
    },
    {
        sessions: "2 sessions / week",
        weekly: "€110",
        daily: "€15.70",
        comparison: "Sandwich & soup",
        Icon: Sandwich,
    },
    {
        sessions: "3 sessions / week",
        weekly: "€150",
        daily: "",
        comparison: "Family trip to the cinema or zoo + Happy Meal",
        Icon: Clapperboard,
    },
    {
        sessions: "4 sessions / week",
        weekly: "€180",
        daily: null,
        comparison: "Weekly family food shop",
        Icon: ShoppingCart,
    },
];

export default function CostOfSupport() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                    Pricing in perspective
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                    The Real Cost of Support
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-brand-muted">
                    What does our specialist dyslexia tuition actually cost per day?
                </p>
            </AnimateIn>

            <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-border bg-brand-card shadow-sm">
                {tiers.map((tier, i) => (
                    <AnimateIn key={tier.sessions} delay={0.08 * i}>
                        <div
                            className={`grid grid-cols-1 gap-4 p-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6 sm:px-7 sm:py-5${
                                i < tiers.length - 1 ? " border-b border-border" : ""
                            }`}
                        >
                            <div>
                                <p className="text-sm font-semibold text-brand-navy sm:text-base">
                                    {tier.sessions}
                                </p>
                                <p className="mt-0.5 text-xs text-brand-muted">
                                    {tier.weekly} / week
                                </p>
                            </div>

                            <div className="flex items-center justify-center">
                                {tier.daily ? (
                                    <div className="rounded-full bg-brand-gold-soft px-5 py-2 text-center">
                                        <span className="text-xl font-bold text-brand-gold-strong">
                                            {tier.daily}
                                        </span>
                                        <span className="ml-1 text-xs font-medium text-brand-gold-strong/70">
                                            / day
                                        </span>
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex items-center gap-3 sm:justify-end">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gold-soft text-brand-gold-strong">
                                    <tier.Icon className="size-4" aria-hidden="true" />
                                </div>
                                <p className="text-sm text-brand-muted">{tier.comparison}</p>
                            </div>
                        </div>
                    </AnimateIn>
                ))}
            </div>

            <AnimateIn delay={0.45}>
                <div className="mt-6 rounded-[2rem] bg-brand-navy px-6 py-10 text-brand-on-navy sm:px-10 sm:py-12">
                    <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-gold-soft text-brand-gold-strong">
                            <Plane className="size-5" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                                The bigger picture
                            </p>
                            <h3 className="mt-2 text-xl font-semibold text-brand-on-navy">
                                Family holiday to Lanzarote
                            </h3>
                        </div>
                    </div>

                    <p className="mt-6 max-w-2xl text-base leading-7 text-brand-on-navy/80">
                        The average Irish family spends around{" "}
                        <span className="font-semibold text-brand-on-navy">
                            €80 per day on meals alone
                        </span>
                        . One week = <span className="font-semibold text-brand-on-navy">€560</span>{" "}
                        before a single drink, ice pop, or activity is paid for.
                    </p>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-brand-on-navy/80">
                        We&apos;re not saying don&apos;t go on holiday. We&apos;re saying the cost
                        of our specialist literacy support is smaller than you&apos;d think, and
                        lasts far longer than a tan.
                    </p>

                    <div className="mt-8 border-t border-brand-on-navy/10 pt-8">
                        <p className="text-base font-medium text-brand-on-navy">
                            Reach out and book your free consultation today.
                        </p>
                        <p className="mt-1 text-sm italic text-brand-gold">
                            Stop guessing, start glowing.
                        </p>
                        <Button asChild size="lg" className="mt-6 rounded-full px-8 bg-brand-gold hover:bg-brand-gold-strong">
                            <Link href="/contact">Book your free consultation</Link>
                        </Button>
                    </div>
                </div>
            </AnimateIn>
        </section>
    );
}
