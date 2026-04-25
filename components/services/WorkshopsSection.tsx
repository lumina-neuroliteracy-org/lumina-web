"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";

type EventType = "webinar" | "seminar" | "event";

interface EventItem {
    title: string;
    date: string;
    type: EventType;
    cta: "Join" | "Register";
    href: string;
}

// Replace with real upcoming events
const events: EventItem[] = [
    {
        title: "Understanding Dyslexia: A Parent's Guide",
        date: "15 May 2026",
        type: "webinar",
        cta: "Join",
        href: "/contact",
    },
    {
        title: "Early Identification of Dyslexia in the Classroom",
        date: "22 May 2026",
        type: "webinar",
        cta: "Join",
        href: "/contact",
    },
    {
        title: "Structured Literacy in Practice",
        date: "10 June 2026",
        type: "seminar",
        cta: "Register",
        href: "/contact",
    },
    {
        title: "Supporting Dyslexic Learners: School Staff Training",
        date: "18 June 2026",
        type: "seminar",
        cta: "Register",
        href: "/contact",
    },
    {
        title: "Neuro-Literacy Family Open Day",
        date: "5 July 2026",
        type: "event",
        cta: "Register",
        href: "/contact",
    },
];

const tabs: { label: string; value: EventType }[] = [
    { label: "Webinars", value: "webinar" },
    { label: "Seminars", value: "seminar" },
    { label: "Events", value: "event" },
];

export default function WorkshopsSection() {
    const [active, setActive] = useState<EventType>("webinar");

    const filtered = events.filter((e) => e.type === active);

    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                    Seminars &amp; Workshops
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                    Learn alongside a community of families and educators.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-brand-muted">
                    We run regular online and in-person sessions open to parents, teachers,
                    and anyone interested in understanding dyslexia better.
                </p>
            </AnimateIn>

            {/* Tab bar */}
            <AnimateIn delay={0.1}>
                <div className="mt-8 flex gap-2">
                    {tabs.map(({ label, value }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setActive(value)}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                active === value
                                    ? "bg-brand-navy text-brand-on-navy"
                                    : "text-brand-muted hover:text-brand-navy"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </AnimateIn>

            {/* Event list */}
            <div className="mt-6 space-y-3">
                {filtered.length === 0 ? (
                    <p className="py-8 text-center text-sm text-brand-muted">
                        No upcoming {tabs.find((t) => t.value === active)?.label.toLowerCase()} scheduled. Check back soon.
                    </p>
                ) : (
                    filtered.map((item, i) => (
                        <AnimateIn key={item.title} delay={0.05 * i}>
                            <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-border bg-brand-card px-6 py-4 shadow-sm">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="rounded-full bg-brand-gold-soft px-3 py-1 text-xs font-medium text-brand-navy">
                                        {item.date}
                                    </span>
                                    <p className="text-sm font-medium text-brand-navy">
                                        {item.title}
                                    </p>
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="shrink-0 rounded-full"
                                >
                                    <a href={item.href}>{item.cta}</a>
                                </Button>
                            </div>
                        </AnimateIn>
                    ))
                )}
            </div>
        </section>
    );
}
