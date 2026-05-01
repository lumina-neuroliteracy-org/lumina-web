"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Video, FileText, Users, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/live-classes", label: "Live Classes", icon: Video },
    { href: "/admin/resources", label: "Resources", icon: FileText },
    { href: "/admin/users", label: "Users", icon: Users },
];

export function AdminSidebar({ profile }: { profile: Profile }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    async function handleSignOut() {
        await supabase.auth.signOut();
        router.push("/login");
    }

    return (
        <aside className="flex w-64 flex-col border-r border-border bg-brand-card">
            {/* Logo */}
            <div className="flex h-16 items-center border-b border-border px-6">
                <span className="text-lg font-semibold text-brand-navy">
                    Lumina
                </span>
                <span className="ml-2 rounded-full bg-brand-navy px-2 py-0.5 text-xs text-brand-on-navy">
                    Admin
                </span>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
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
    );
}
