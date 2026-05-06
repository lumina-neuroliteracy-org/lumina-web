import Link from "next/link";
import Image from "next/image";
import logo from "@/public/lumina-logo.png";
import { AnimateIn } from "./AnimateIn";
import { Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";

const links = {
    Support: [
        { label: "About", href: "/about" },
        { label: "Dyslexia Info", href: "/dyslexia-info" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ],
    Legal: [
        { label: "Privacy policy", href: "/privacy-policy" },
        { label: "Terms of use", href: "/terms-of-use" },
    ],
};

const phones = [
    { label: "087 4523 726", href: "tel:087 4523 726" }
];

const socials = [
    { label: "Facebook", href: "https://web.facebook.com/people/Lumina-Neuro-Literacy-Studio/61587695849659/", Icon: FaFacebook },
    { label: "Instagram", href: "https://www.instagram.com/lumina_literacy", Icon: FaInstagram },
    { label: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
    { label: "TikTok", href: "https://www.tiktok.com/@lumina_literacy", Icon: FaTiktok },
];

export default function Footer() {
    return (
        <footer className="border-t border-border bg-brand-navy text-brand-on-navy">
            <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
                <AnimateIn>
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
                        {/* Brand */}
                        <div className="flex flex-col  gap-4">
                            <Link href="/">
                                <Image src={logo} alt="Lumina logo" width={80} height={40} />
                            </Link>
                            <div className="text-sm font-semibold text-brand-gold lg:block">
                                <h3>LUMINA</h3>
                                <p>NEURO-LITERACY STUDIO</p>
                            </div>
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

                        {/* Contact column */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                                Contact
                            </p>
                            <ul className="mt-4 flex flex-col gap-3">
                                {phones.map(({ label, href }) => (
                                    <li key={href}>
                                        <a
                                            href={href}
                                            className="flex items-center gap-2 text-sm text-brand-on-navy/70 transition-colors hover:text-brand-gold"
                                        >
                                            <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 flex items-center gap-3">
                                {socials.map(({ label, href, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="text-brand-on-navy/60 transition-colors hover:text-brand-gold"
                                    >
                                        <Icon className="size-5" aria-hidden="true" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimateIn>

                <AnimateIn delay={0.15}>
                    <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-brand-on-navy/10 pt-8 sm:flex-row sm:items-center text-white pb-4">
                        <p className="text-sm text-brand-on-navy/50">
                            &copy; {new Date().getFullYear()} Lumina. All rights reserved.
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
