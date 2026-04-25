"use client";

import { useDyslexia } from "./DyslexiaProvider";
import { ALargeSmall } from "lucide-react";

interface DyslexiaToggleProps {
    /** When true, renders as a full-width row (mobile sidebar) */
    fullWidth?: boolean;
}

export default function DyslexiaToggle({ fullWidth = false }: DyslexiaToggleProps) {
    const { enabled, toggle } = useDyslexia();

    return (
        <button
            type="button"
            aria-pressed={enabled}
            aria-label={enabled ? "Disable dyslexia-friendly text" : "Enable dyslexia-friendly text"}
            onClick={toggle}
            className={
                fullWidth
                    ? `flex w-full items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${
                          enabled
                              ? "border-brand-gold bg-brand-gold-soft text-brand-navy"
                              : "border-border text-brand-muted hover:border-brand-navy/40 hover:text-brand-navy"
                      }`
                    : `flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${
                          enabled
                              ? "border-brand-gold bg-brand-gold-soft text-brand-navy"
                              : "border-transparent text-brand-on-navy/70 hover:border-brand-on-navy/30 hover:text-brand-on-navy"
                      }`
            }
        >
            <ALargeSmall className="size-4 shrink-0" aria-hidden="true" />
            <span className={fullWidth ? undefined : "hidden lg:inline"}>
                {enabled ? "Standard text" : "Dyslexia text"}
            </span>
            {fullWidth && <span className="ml-auto text-xs text-brand-muted">{enabled ? "On" : "Off"}</span>}
        </button>
    );
}
