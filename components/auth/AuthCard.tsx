import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthCardProps = {
  title: string;
  description: string;
  submitLabel: string;
  footerText: string;
  footerHref: string;
  footerLinkLabel: string;
};

export default function AuthCard({
  title,
  description,
  submitLabel,
  footerText,
  footerHref,
  footerLinkLabel,
}: AuthCardProps) {
  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_26%),linear-gradient(180deg,_#fffdf8_0%,_#ffffff_48%,_#f8fafc_100%)] px-5 py-12 sm:px-8">
      <section className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-amber-700">
          Account
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

        <form className="mt-8 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full">
            {submitLabel}
          </Button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          {footerText}{" "}
          <Link href={footerHref} className="font-medium text-slate-950 underline-offset-4 hover:underline">
            {footerLinkLabel}
          </Link>
        </p>
      </section>
    </main>
  );
}
