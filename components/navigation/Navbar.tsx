"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/public/lumina-logo.png";

const navLinks = [
    { label: "About", href: "/about" },
    { label: "Dyslexia Info", href: "/dyslexia-info" },
    { label: "Contact", href: "/contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { openMobile, setOpenMobile } = useSidebar();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            role="banner"
            className={`sticky top-0 z-40 w-full bg-brand-navy-soft transition-shadow duration-300 ${scrolled ? "shadow-sm" : ""
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
                <div>
                    <Link href="/" className="flex gap-2">
                        <Image src={logo} alt="Loger logo" width={80} height={40} />
                    </Link>
                </div>

                {/* Desktop nav */}
                <nav aria-label="primary" className="hidden lg:block">
                    <ul className="flex items-center gap-8">
                        {navLinks.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`text-base font-medium transition-colors hover:text-brand-gold ${pathname === href
                                        ? "text-brand-gold underline underline-offset-8 decoration-2 decoration-brand-gold"
                                        : "text-brand-on-navy/90"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    {/* Desktop CTA */}
                    <Button asChild className="hidden rounded-full lg:inline-flex font-semibold text-xs px-4 py-2 bg-brand-gold text-brand-navy hover:bg-transparent  hover:text-white">
                        <Link href="/login">Login</Link>
                    </Button>

                    {/* Mobile hamburger — toggles shadcn Sidebar */}
                    <button
                        type="button"
                        aria-label={openMobile ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={openMobile}
                        onClick={() => setOpenMobile(!openMobile)}
                        className="flex flex-col items-center justify-center gap-1.5 p-2 text-brand-gold lg:hidden"
                    >
                        <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${openMobile ? "translate-y-2 rotate-45" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${openMobile ? "opacity-0" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${openMobile ? "-translate-y-2 -rotate-45" : ""}`} />
                    </button>
                </div>
            </div>
        </header>
    );
}
