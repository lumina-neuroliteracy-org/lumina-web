import { AnimateIn } from "@/components/AnimateIn";

const stats = [
    { value: "50+", label: "Learners supported" },
    { value: "5 yrs", label: "Experience" },
    { value: "3", label: "Service types" },
    { value: "100%", label: "Tailored to each learner" },
];

export default function AboutStats() {
    return (
        <div className="border-y border-border bg-brand-ivory">
            <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {stats.map((stat, i) => (
                        <AnimateIn key={stat.label} delay={0.1 * i}>
                            <div className="text-center">
                                <p className="text-3xl font-semibold text-brand-navy">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-sm text-brand-muted">{stat.label}</p>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </div>
    );
}
