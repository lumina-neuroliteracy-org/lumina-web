import Link from "next/link";
import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const serviceCards = [
  {
    title: "Screening Support",
    description:
      "Early observation tools and guided next steps for families, schools, and adult learners.",
  },
  {
    title: "Learning Plans",
    description:
      "Structured, human-centered interventions designed around pace, strengths, and confidence.",
  },
  {
    title: "Progress Tracking",
    description:
      "Clear milestones that help caregivers and educators see what is improving and what needs support.",
  },
];

export default function Homepage() {
  return (
    <main className="bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_30%),linear-gradient(180deg,_#fffdf8_0%,_#ffffff_48%,_#f8fafc_100%)]">
          <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm text-amber-900">
                <Sparkles className="size-4" />
                Confidence-first literacy support
              </div>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl">
                A clearer path for learners navigating dyslexia.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Luminar helps families, schools, and adult learners understand
                dyslexia, access practical support, and move from uncertainty to
                an actionable learning plan.
              </p>
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
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-slate-950 p-6 text-slate-50">
                  <p className="text-sm text-slate-300">Support that adapts</p>
                  <p className="mt-8 text-3xl font-semibold">1:1 guidance</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Practical interventions shaped around the learner instead of
                    a one-size-fits-all script.
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-amber-100 p-6 text-amber-950">
                  <HeartHandshake className="size-8" />
                  <p className="mt-6 text-2xl font-semibold">Family-centered</p>
                  <p className="mt-3 text-sm leading-6 text-amber-950/75">
                    Clear communication for caregivers, teachers, and learners.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 p-6 sm:col-span-2">
                  <p className="text-sm font-medium text-slate-500">
                    What you can expect
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-3xl font-semibold text-slate-950">
                        01
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        Understand current challenges and strengths.
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl font-semibold text-slate-950">
                        02
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        Build a structured plan with realistic milestones.
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl font-semibold text-slate-950">
                        03
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        Track progress with support that stays human.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-amber-700">
                About
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Support that respects how people actually learn.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Dyslexia is not a measure of intelligence. It is a different way
                of processing language, and the right support can make reading,
                writing, and confidence feel far more manageable.
              </p>
              <Button asChild variant="outline" className="mt-6 rounded-full px-5">
                <Link href="/about">Read more</Link>
              </Button>
            </div>
          </section>

          <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold tracking-[0.18em] uppercase text-amber-700">
                  Services
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  Practical help for every stage of the journey.
                </h2>
              </div>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {serviceCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-8 rounded-full px-5">
              <Link href="/services">View all services</Link>
            </Button>
          </section>

          <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="rounded-[2rem] bg-slate-950 px-6 py-8 text-slate-50 sm:px-8 lg:px-10">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-amber-300">
                Dyslexia Info
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                What dyslexia can look like.
              </h2>
              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div>
                  <p className="text-lg font-medium">Reading</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Slow decoding, skipping lines, and difficulty linking sounds
                    to written words.
                  </p>
                </div>
                <div>
                  <p className="text-lg font-medium">Writing</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Spelling inconsistencies, trouble sequencing ideas, or
                    fatigue during written tasks.
                  </p>
                </div>
                <div>
                  <p className="text-lg font-medium">Everyday confidence</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Avoiding reading aloud, frustration, or feeling behind despite
                    strong reasoning in other areas.
                  </p>
                </div>
              </div>
              <Button
                asChild
                variant="secondary"
                className="mt-8 rounded-full px-5 text-slate-950"
              >
                <Link href="/dyslexia-info">Explore the full guide</Link>
              </Button>
            </div>
          </section>

          <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-8 sm:px-8 lg:flex lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold tracking-[0.18em] uppercase text-amber-700">
                  Contact
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-amber-950">
                  Ready to build a better support plan?
                </h2>
                <p className="mt-4 text-base leading-8 text-amber-950/75">
                  Start with a conversation. We can discuss current challenges,
                  goals, and the kind of support that fits best.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="mailto:hello@luminar.dev">hello@luminar.dev</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link href="/signup">Create an account</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
  );
}
