"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useDyslexia } from "./DyslexiaProvider";
import { X } from "lucide-react";

export default function DyslexiaPopup() {
    const { enabled, toggle, dismissPopup } = useDyslexia();

    function handleEnable() {
        if (!enabled) toggle();
        dismissPopup();
    }

    return (
        <AnimatePresence>
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="dyslexia-popup-title"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl border border-border bg-brand-card p-5 shadow-[0_8px_40px_-8px_rgba(15,23,42,0.22)]"
            >
                <button
                    type="button"
                    aria-label="Dismiss popup"
                    onClick={dismissPopup}
                    className="absolute right-3 top-3 rounded-full p-1 text-brand-muted transition-colors hover:bg-brand-surface hover:text-brand-navy"
                >
                    <X className="size-4" />
                </button>

                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-strong">
                    Reading comfort
                </p>
                <h2
                    id="dyslexia-popup-title"
                    className="mt-2 text-base font-semibold text-brand-navy"
                >
                    Dyslexia-friendly text available
                </h2>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                    Switch to a clearer font with better spacing for easier reading.
                </p>

                <div className="mt-4 flex gap-2">
                    <button
                        type="button"
                        onClick={handleEnable}
                        className="flex-1 rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-brand-on-navy transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                    >
                        Enable
                    </button>
                    <button
                        type="button"
                        onClick={dismissPopup}
                        className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-muted transition-colors hover:border-brand-navy/40 hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                    >
                        Not now
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
