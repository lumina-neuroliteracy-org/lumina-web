import Link from "next/link";
import Image from "next/image";
import logo from "@/public/lumina-logo.png";
import { AnimateIn } from "./AnimateIn";

const links = {
    Support: [
        { label: "About", href: "/about" },
        { label: "Dyslexia Info", href: "/dyslexia-info" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ],
    Account: [
        { label: "Log in", href: "/login" },
        { label: "Sign up", href: "/signup" },
    ],
    Legal: [
        { label: "Privacy policy", href: "/coming-soon" },
        { label: "Terms of use", href: "/coming-soon" },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t border-border bg-brand-navy text-brand-on-navy">
            <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-8">
                <AnimateIn>
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
                        {/* Brand */}
                        <div className="flex flex-col gap-4">
                            <Link href="/">
                                <Image src={logo} alt="Luminar logo" width={80} height={40} />
                            </Link>
                            <p className="max-w-xs text-sm leading-7 text-brand-on-navy/70">
                                Confidence-first literacy support for families, schools, and
                                adult learners navigating dyslexia.
                            </p>
                        </div>

                        {/* Link columns */}
                        {Object.entries(links).map(([group, items]) => (
                            <div key={group}>
                                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                                    {group}
                                </p>
                                <ul className="mt-4 flex flex-col gap-3">
                                    {items.map(({ label, href }) => (
                                        <li key={label}>
                                            <Link
                                                href={href}
                                                className="text-sm text-brand-on-navy/70 transition-colors hover:text-brand-gold"
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </AnimateIn>

                <AnimateIn delay={0.15}>
                    <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-brand-on-navy/10 pt-8 sm:flex-row sm:items-center text-white pb-4">
                        <p className="text-sm text-brand-on-navy/50">
                            &copy; {new Date().getFullYear()} Luminar. All rights reserved.
                        </p>
                        <p className="text-sm text-brand-on-navy/50">
                            Built for learners who deserve better.
                        </p>
                    </div>
                </AnimateIn>
            </div>
        </footer>
    );
}
