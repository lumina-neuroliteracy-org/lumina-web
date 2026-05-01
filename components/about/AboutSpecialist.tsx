import Image from "next/image";
import { AnimateIn } from "@/components/AnimateIn";

const credentials = [
    "Structured Literacy Practitioner",
    "Dyslexia Association Certified",
    "5+ Years Clinical Experience",
    "Family & School Liaison",
];

export default function AboutSpecialist() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                <AnimateIn direction="left">
                    <Image
                        src="/tutor.png"
                        alt="Lumina specialist"
                        width={480}
                        height={560}
                        className="w-full rounded-[2rem] object-cover shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)]"
                    />
                </AnimateIn>

                <AnimateIn direction="right">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                        Meet the specialist
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                        {/* Replace with specialist name */}
                        Jane Lumina
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {credentials.map((c) => (
                            <span
                                key={c}
                                className="inline-flex items-center rounded-full bg-brand-gold-soft px-3 py-1 text-xs font-medium text-brand-navy"
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                    <div className="mt-6 space-y-4 text-base leading-8 text-brand-muted">
                        <p>
                            {/* Replace with real bio */}
                            With over five years supporting learners from early childhood
                            through adulthood, I've seen what happens when dyslexia is finally
                            understood — not just diagnosed. Confidence returns. Progress
                            compounds. Families breathe again.
                        </p>
                        <p>
                            My approach draws on structured literacy research and a genuine
                            belief that the person in front of me knows things about their own
                            learning that no assessment can capture. Every plan starts with
                            listening.
                        </p>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}
