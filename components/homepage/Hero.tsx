import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { AnimateIn } from "../AnimateIn";

export default function Hero() {
    return (
        <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-12">
            <div className="max-w-2xl">
                <AnimateIn delay={0}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-ivory px-4 py-1.5 text-sm text-brand-navy">
                        <Sparkles className="size-4" />
                        Confidence-first literacy support
                    </div>
                </AnimateIn>
                <AnimateIn delay={0.1}>
                    <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance text-brand-navy sm:text-6xl">
                       Dyslexia & Literacy Support for Children in Dublin, Ireland.
                    </h1>
                </AnimateIn>
                <AnimateIn delay={0.2}>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-brand-muted">
                        Lumina Neuro-Literacy Studio provides specialist dyslexia tutor and structured literacy support for children and families across Dublin, Ireland. We help learners build confidence, improve reading and spelling skills, and achieve lasting academic success.
                    </p>
                </AnimateIn>
                <AnimateIn delay={0.3}>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button asChild size="lg" className="rounded-full px-6">
                            <Link href="/contact">
                                Book a consultation
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                            <Link href="/dyslexia-info">Learn about dyslexia</Link>
                        </Button>
                    </div>
                </AnimateIn>
            </div>

            <AnimateIn delay={0.2} direction="right">
                <div className="rounded-[2rem] border border-border bg-brand-card p-4 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)]">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <AnimateIn delay={0.3} className="h-full">
                            <div className="h-full rounded-[1.5rem] bg-brand-navy p-6 text-brand-on-navy">
                                {/* <p className="text-sm text-brand-on-navy/80">Support that adapts</p> */}
                                <p className="mt-8 text-3xl font-semibold">One-to-One Dyslexia Tutoring</p>
                                <p className="mt-3 text-sm leading-6 text-brand-on-navy/80">
                                Our personalised dyslexia tutoring sessions use evidence-based structured literacy methods to improve reading, spelling, writing, and confidence. Every learning plan is tailored to the child&apos;s individual needs.
                                </p>
                            </div>
                        </AnimateIn>
                        <AnimateIn delay={0.4} className="h-full">
                            <div className="h-full rounded-[1.5rem] bg-brand-gold-soft p-6 text-brand-navy">
                                <HeartHandshake className="size-8" />
                                <p className="mt-6 text-2xl font-semibold">Family-Centred Dyslexia Support</p>
                                <p className="mt-3 text-sm leading-6 text-brand-navy/80">
                                 We work closely with parents, guardians, and schools to ensure every learner receives consistent support both at home and in the classroom.
                                </p>
                            </div>
                        </AnimateIn>
                        <AnimateIn delay={0.5} className="sm:col-span-2">
                            <div className="rounded-[1.5rem] border border-border p-6">
                                <p className="text-sm font-medium text-brand-muted">
                                    What you can expect
                                </p>
                                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                    <div>
                                        <p className="text-3xl font-semibold text-brand-navy">
                                            01
                                        </p>
                                        <p className="mt-2 text-sm text-brand-muted">
                                            Understand current challenges and strengths.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-semibold text-brand-navy">
                                            02
                                        </p>
                                        <p className="mt-2 text-sm text-brand-muted">
                                            Build a structured plan with realistic targets.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-semibold text-brand-navy">
                                            03
                                        </p>
                                        <p className="mt-2 text-sm text-brand-muted">
                                            Track progress with support that stays human.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimateIn>
                    </div>
                </div>
            </AnimateIn>
        </section>
    )
}