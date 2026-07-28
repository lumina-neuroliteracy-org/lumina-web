import Image from "next/image";
import { AnimateIn } from "@/components/AnimateIn";

const credentials = [
    "Autism Class Teacher",
    "Dyslexia Ireland Tutor",
    "Reading School Teacher",
    "Multisensory Learning",
];

export default function AboutSpecialist() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                <AnimateIn direction="left">
                    <figure>
                        <Image
                            src="/lumina-specialist.jpeg"
                            alt="Francis Tobin — Dyslexia Specialist"
                            width={480}
                            height={560}
                            className="w-full rounded-[2rem] object-cover shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)]"
                        />
                        <figcaption className="mt-3 text-center text-sm text-brand-muted">
                            Dyslexia Specialist - Tutor and Professional Member of Dyslexia Ireland, PMEP, B.A. Hons
                        </figcaption>
                    </figure>
                </AnimateIn>

                <AnimateIn direction="right">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                        Meet the specialist
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                        Francis Tobin
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
                            Francis Tobin is a leading specialist in Neuro-Literacy and Special Education, dedicated to helping students who struggle with traditional reading and writing models. With a career rooted in Dublin&apos;s primary and special education sectors, Francis brings a wealth of diverse classroom experience to support students with various learning requirements, including autism, ADHD, PDA and in particular dyslexia.
                        </p>
                        <p>
                            Francis&apos;s approach to tutoring goes beyond simple homework or extra reading help. He specialises in evidence based, structured literacy, multisensory methods designed to reshape how the brain processes language and turn &apos;word guessers&apos;  into what he calls &apos;word detectives&apos;. His background includes extensive experience as an Autism Class Teacher, Reading School Teacher, Mainstream Class teacher, SET and a tutor for Dyslexia Ireland. His sessions focus on structured literacy teaching, including phonological mastery and decoding/encoding skills and unique literacy laboratories. He takes pride in helping students develop the confidence, self belief, focus and organisational skills as well as the word detective skills necessary for academic independence.
                        </p>
                        <p>
                            Francis co-founded Lumina Neuro-Literacy Studio with a shared vision: to create a high support, high results environment where children move from guessing at words to glowing with confidence. Built on the belief that every child with the right multisensory methods and tools and the right expert guidance can unlock their full literacy potential.
                        </p>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}
