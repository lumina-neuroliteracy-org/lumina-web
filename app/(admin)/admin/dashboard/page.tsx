import { requireAdmin } from "@/lib/dal/profile";
import { getAllLiveClasses } from "@/lib/dal/live-classes";
import { getAllResources } from "@/lib/dal/resources";
import { getAllProfiles } from "@/lib/dal/users";
import { Users, Video, FileText, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
    const [, liveClasses, resources, profiles] = await Promise.all([
        requireAdmin(),
        getAllLiveClasses(),
        getAllResources(),
        getAllProfiles(),
    ]);

    const students = profiles.filter((p) => p.role === "student");
    const published = resources.filter((r) => r.is_published);
    const active = liveClasses.filter((c) => c.is_active);

    const stats = [
        {
            label: "Students",
            value: students.length,
            icon: Users,
            href: "/admin/users",
            color: "text-brand-navy",
            bg: "bg-brand-navy/10",
        },
        {
            label: "Live Classes",
            value: liveClasses.length,
            sub: `${active.length} active`,
            icon: Video,
            href: "/admin/live-classes",
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
        {
            label: "Resources",
            value: resources.length,
            sub: `${published.length} published`,
            icon: FileText,
            href: "/admin/resources",
            color: "text-brand-gold-strong",
            bg: "bg-brand-gold-soft",
        },
        {
            label: "Published Resources",
            value: published.length,
            icon: BookOpen,
            href: "/admin/resources",
            color: "text-green-600",
            bg: "bg-green-50",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-brand-navy">
                    Admin Dashboard
                </h1>
                <p className="mt-1 text-sm text-brand-muted">
                    Overview of platform activity
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map(({ label, value, sub, icon: Icon, href, color, bg }) => (
                    <Link
                        key={label}
                        href={href}
                        className="rounded-xl border border-border bg-brand-card p-5 transition-colors hover:border-brand-navy/30"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`rounded-lg p-2 ${bg}`}>
                                <Icon className={`size-5 ${color}`} />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${color}`}>
                                    {value}
                                </p>
                                <p className="text-xs text-brand-muted">
                                    {label}
                                </p>
                                {sub && (
                                    <p className="text-xs text-brand-muted/70">
                                        {sub}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
