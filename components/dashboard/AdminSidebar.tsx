"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Video, FileText, Users, LogOut, Menu, X, CalendarDays, User, Settings2, BookOpen } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/live-classes", label: "Live Classes", icon: Video },
    { href: "/admin/resources", label: "Resources", icon: FileText },
    { href: "/admin/events", label: "Events", icon: CalendarDays },
    { href: "/admin/blog", label: "Blog", icon: BookOpen },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/profile", label: "Profile", icon: User },
    { href: "/admin/settings", label: "Site Settings", icon: Settings2 },
];

export function AdminSidebar({ profile }: { profile: Profile }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [isOpen, setIsOpen] = useState(false);

    async function handleSignOut() {
        await supabase.auth.signOut();
        router.push("/login");
    }

    return (
        <>
            {/* Mobile top bar */}
            <div className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center gap-3 border-b border-border bg-brand-card px-4 lg:hidden">
                <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Open navigation"
                >
                    <Menu className="size-5 text-brand-navy" />
                </button>
                <span className="text-base font-semibold text-brand-navy">Lumina</span>
                <span className="rounded-full bg-brand-navy px-2 py-0.5 text-xs text-brand-on-navy">Admin</span>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-brand-card transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo */}
                <div className="flex h-16 items-center border-b border-border px-6">
                    <span className="text-lg font-semibold text-brand-navy">
                        Lumina
                    </span>
                    <span className="ml-2 rounded-full bg-brand-navy px-2 py-0.5 text-xs text-brand-on-navy">
                        Admin
                    </span>
                    <button
                        className="ml-auto lg:hidden"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close navigation"
                    >
                        <X className="size-5 text-brand-muted" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navItems.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                pathname === href
                                    ? "bg-brand-navy text-brand-on-navy"
                                    : "text-brand-muted hover:bg-brand-surface hover:text-brand-navy"
                            )}
                        >
                            <Icon className="size-4 shrink-0" />
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="border-t border-border p-4 space-y-3">
                    <div className="px-1">
                        <p className="text-sm font-medium text-brand-navy truncate">
                            {profile.full_name ?? "Admin"}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-brand-navy/10 px-2 py-0.5 text-xs font-medium text-brand-navy capitalize">
                            {profile.role}
                        </span>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-muted transition-colors hover:bg-brand-surface hover:text-destructive"
                    >
                        <LogOut className="size-4" />
                        Sign out
                    </button>
                </div>
            </aside>
        </>
    );
}
