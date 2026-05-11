import { AnimateIn } from "@/components/AnimateIn";

const childrenSigns = [
    "Continued difficulty reading text aloud or silently.",
    "Spelling is inappropriate for age and general ability (e.g. Spelling the same word differently on the same page.",
    "Use of bizarre spelling patterns, frequent letter omissions, additions and transposition).",
    "Lacks self-confidence and has low self-esteem.",
    "Has difficulty planning or organizing.",
    "Avoiding reading or writing tasks.",
];

// const adultSigns = [
//     "Reading slowly or needing to re-read text to understand it",
//     "Difficulty spelling common words",
//     "Struggling to take notes while listening",
//     "Avoiding tasks that involve a lot of reading or writing",
//     "Difficulty with directions, left/right confusion",
//     "Strong verbal ability that doesn't match written work",
// ];

function SignCard({ heading, signs, direction, resourceLink }: {
    heading: string;
    signs: string[];
    direction: "left" | "right";
    resourceLink?: { href: string; label: string };
}) {
    return (
        <AnimateIn direction={direction}>
            <div className="h-full rounded-[1.75rem] border border-border bg-brand-card p-6 shadow-sm">
                <h3 className="text-base font-semibold text-brand-navy">{heading}</h3>
                <ul className="mt-5 space-y-3">
                    {signs.map((sign) => (
                        <li key={sign} className="flex items-start gap-3 text-sm leading-6 text-brand-muted">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                            {sign}
                        </li>
                    ))}
                </ul>
                {resourceLink && (
                    <a
                        href={resourceLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block text-sm font-medium text-brand-navy underline underline-offset-4 hover:text-brand-gold-strong"
                    >
                        {resourceLink.label}
                    </a>
                )}
            </div>
        </AnimateIn>
    );
}

export default function CommonSigns() {
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <AnimateIn>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                    Common signs
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                    What to look out for.
                </h2>
            </AnimateIn>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <SignCard
                    heading="Signs in children"
                    signs={childrenSigns}
                    direction="left"
                    resourceLink={{ href: "https://dyslexia.ie/info-hub/about-dyslexia/what-is-dyslexia/", label: "Visit Dyslexia Ireland for more resources" }}
                />
                {/* <SignCard heading="Signs in adults" signs={adultSigns} direction="right" /> */}
            </div>

            <AnimateIn delay={0.2}>
                <p className="mt-6 max-w-2xl text-sm italic text-brand-muted">
                    These signs alone don&apos;t confirm dyslexia. A formal assessment is the
                    only way to know for certain.
                </p>
            </AnimateIn>
        </section>
    );
}
