"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

// Replace answers with real content before going live
const faqs = [
    {
        question: "What age groups do you work with?",
        answer:
            "We support learners from early primary school (age 5) through to adults in higher education and the workplace. Each programme is designed around the individual, so age is never a barrier.",
    },
    {
        question: "How long does a dyslexia assessment take?",
        answer:
            "A full assessment typically takes 2–3 hours, sometimes split across two sessions. You'll receive a detailed written report within 10 working days of the final session.",
    },
    {
        question: "Do you work with schools directly?",
        answer:
            "Yes. We work with individual schools, SENCOs, and class teachers to provide training, assessments, and ongoing consultation. Get in touch to discuss a school partnership.",
    },
    {
        question: "How many tuition sessions will my child need?",
        answer:
            "This varies depending on the learner's current level and goals. Most learners see meaningful progress within 10–12 weeks of consistent weekly sessions. We review progress regularly and adjust the plan as needed.",
    },
    {
        question: "Are sessions in-person or online?",
        answer:
            "We offer both. Online sessions are delivered via a secure video platform with shared digital materials. In-person availability depends on location — contact us to check.",
    },
    {
        question: "What happens after the initial consultation?",
        answer:
            "After the consultation you'll receive a written summary with clear recommendations. If you'd like to move forward, we'll agree a next step — whether that's a full assessment, a tuition programme, or a progress report.",
    },
];

export default function ServicesFAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                    FAQ
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                    Common questions.
                </h2>
            </AnimateIn>

            <AnimateIn delay={0.1}>
                <div className="mt-10 divide-y divide-border rounded-[2rem] border border-border bg-brand-card overflow-hidden">
                    {faqs.map((faq, i) => (
                        <div key={i}>
                            <button
                                type="button"
                                aria-expanded={open === i}
                                onClick={() => setOpen(open === i ? null : i)}
                                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                            >
                                <span className="text-sm font-semibold text-brand-navy sm:text-base">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`size-5 shrink-0 text-brand-muted transition-transform duration-200 ${
                                        open === i ? "rotate-180" : ""
                                    }`}
                                    aria-hidden="true"
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        key="answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-5 text-sm leading-7 text-brand-muted">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </AnimateIn>
        </section>
    );
}
