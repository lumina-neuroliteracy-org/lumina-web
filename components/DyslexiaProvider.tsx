"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import DyslexiaPopup from "./DyslexiaPopup";

interface DyslexiaContextValue {
    enabled: boolean;
    toggle: () => void;
    dismissPopup: () => void;
}

const DyslexiaContext = createContext<DyslexiaContextValue | null>(null);

export function useDyslexia() {
    const ctx = useContext(DyslexiaContext);
    if (!ctx) throw new Error("useDyslexia must be used inside DyslexiaProvider");
    return ctx;
}

export function DyslexiaProvider({ children }: { children: ReactNode }) {
    const [enabled, setEnabled] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("dyslexia-mode") === "true";
        if (saved) {
            setEnabled(true);
            document.documentElement.classList.add("dyslexia");
        }
        const seen = localStorage.getItem("dyslexia-popup-seen") === "true";
        if (!seen) setShowPopup(true);
    }, []);

    function toggle() {
        setEnabled((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle("dyslexia", next);
            localStorage.setItem("dyslexia-mode", String(next));
            return next;
        });
    }

    function dismissPopup() {
        setShowPopup(false);
        localStorage.setItem("dyslexia-popup-seen", "true");
    }

    return (
        <DyslexiaContext.Provider value={{ enabled, toggle, dismissPopup }}>
            {children}
            {showPopup && <DyslexiaPopup />}
        </DyslexiaContext.Provider>
    );
}
