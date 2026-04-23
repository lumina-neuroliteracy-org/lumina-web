import { Link } from "lucide-react";
import { Button } from "../ui/button";

export default function HomeDyslexiaInfo() {
    return (
        <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="rounded-[2rem] bg-brand-navy px-6 py-8 text-brand-on-navy sm:px-8 lg:px-10">
                <p className="text-sm font-semibold tracking-[0.18em] uppercase text-brand-gold">
                    Dyslexia Info
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                    What dyslexia can look like.
                </h2>
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <div>
                        <p className="text-lg font-medium">Reading</p>
                        <p className="mt-2 text-sm leading-7 text-brand-on-navy/80">
                            Slow decoding, skipping lines, and difficulty linking sounds
                            to written words.
                        </p>
                    </div>
                    <div>
                        <p className="text-lg font-medium">Writing</p>
                        <p className="mt-2 text-sm leading-7 text-brand-on-navy/80">
                            Spelling inconsistencies, trouble sequencing ideas, or
                            fatigue during written tasks.
                        </p>
                    </div>
                    <div>
                        <p className="text-lg font-medium">Everyday confidence</p>
                        <p className="mt-2 text-sm leading-7 text-brand-on-navy/80">
                            Avoiding reading aloud, frustration, or feeling behind despite
                            strong reasoning in other areas.
                        </p>
                    </div>
                </div>
                <Button
                    asChild
                    variant="secondary"
                    className="mt-8 rounded-full px-5 text-brand-navy hover:bg-brand-gold-strong"
                >
                    <Link href="/dyslexia-info">Explore the full guide</Link>
                </Button>
            </div>
        </section>
    )
}