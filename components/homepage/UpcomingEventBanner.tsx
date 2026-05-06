import Link from "next/link";
import { getNextEvent } from "@/lib/dal/events";
import { EventCountdown } from "./EventCountdown";
import type { EventType } from "@/lib/supabase/types";

const typeLabel: Record<EventType, string> = {
    webinar: "Webinar",
    seminar: "Seminar",
    event: "Event",
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default async function UpcomingEventBanner() {
    const event = await getNextEvent();
    if (!event) return null;

    return (
        <section className="w-full bg-brand-navy">
            <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
                <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left — event info */}
                    <div className="space-y-2">
                        <span className="inline-block rounded-full border border-brand-gold/40 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-brand-gold">
                            Upcoming {typeLabel[event.type]}
                        </span>
                        <h2 className="text-4xl font-semibold text-brand-on-navy sm:text-2xl">
                            {event.title}
                        </h2>
                        <p className="text-sm text-brand-on-navy/60">
                            {formatDate(event.date)}
                        </p>
                    </div>

                    {/* Center — countdown */}
                    <EventCountdown targetDate={event.date} />

                    {/* Right — CTA */}
                    <Link
                        href={event.href ?? "/contact"}
                        target={event.href ? "_blank" : undefined}
                        rel={event.href ? "noopener noreferrer" : undefined}
                        className="shrink-0 rounded-full bg-brand-gold px-6 py-2.5 text-sm font-semibold text-brand-navy transition-opacity hover:opacity-90"
                    >
                        Register now
                    </Link>
                </div>
            </div>
        </section>
    );
}
