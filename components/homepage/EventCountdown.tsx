"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    mins: number;
    secs: number;
}

function compute(targetDate: string): TimeLeft | null {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return null;
    return {
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        mins: Math.floor((diff % 3_600_000) / 60_000),
        secs: Math.floor((diff % 60_000) / 1_000),
    };
}

function Unit({ value, label }: { value: number | null; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold tabular-nums text-brand-on-navy sm:text-3xl">
                {value === null ? "--" : String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-brand-on-navy/50">
                {label}
            </span>
        </div>
    );
}

export function EventCountdown({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    useEffect(() => {
        setTimeLeft(compute(targetDate));
        const id = setInterval(() => {
            const next = compute(targetDate);
            setTimeLeft(next);
            if (!next) clearInterval(id);
        }, 1_000);
        return () => clearInterval(id);
    }, [targetDate]);

    if (timeLeft !== null && Object.values(timeLeft).every((v) => v === 0)) {
        return (
            <p className="text-sm font-medium text-brand-gold">Starting now</p>
        );
    }

    return (
        <div className="flex items-end gap-3 sm:gap-5">
            <Unit value={timeLeft?.days ?? null} label="Days" />
            <span className="mb-4 text-brand-on-navy/40 text-xl">:</span>
            <Unit value={timeLeft?.hours ?? null} label="Hours" />
            <span className="mb-4 text-brand-on-navy/40 text-xl">:</span>
            <Unit value={timeLeft?.mins ?? null} label="Mins" />
            <span className="mb-4 text-brand-on-navy/40 text-xl">:</span>
            <Unit value={timeLeft?.secs ?? null} label="Secs" />
        </div>
    );
}
