import Link from "next/link";

import { Button } from "@/components/ui/button";

type RoutePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  primaryCta?: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
};

export default function RoutePage({
  eyebrow,
  title,
  description,
  points,
  primaryCta,
  secondaryCta,
}: RoutePageProps) {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.14),_transparent_28%),linear-gradient(180deg,_#fffdf8_0%,_#ffffff_52%,_#f8fafc_100%)]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-16 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-amber-700">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{description}</p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          )}
        </div>

        <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur sm:p-8">
          <p className="text-sm font-medium text-slate-500">Highlights</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {points.map((point, index) => (
              <div key={point} className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-sm font-semibold text-amber-700">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
