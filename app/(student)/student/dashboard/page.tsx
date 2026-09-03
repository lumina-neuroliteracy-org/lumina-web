import { requireAuth } from "@/lib/dal/profile";
import { getActiveLiveClasses } from "@/lib/dal/live-classes";
import { getPublishedResources } from "@/lib/dal/resources";
import { Video, BookOpen, CalendarDays } from "lucide-react";
import Link from "next/link";

export default async function StudentDashboardPage() {
    const profile = await requireAuth();
    const [liveClasses, resources] = await Promise.all([
        getActiveLiveClasses(),
        getPublishedResources(profile.id),
    ]);

    const nextClass = liveClasses[0];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-brand-navy">
                    Welcome back, {profile.full_name?.split(" ")[0] ?? "there"}
                </h1>
                <p className="mt-1 text-sm text-brand-muted">
                    Here&apos;s what&apos;s available for you today.
                </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-brand-card p-5">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-brand-navy/10 p-2">
                            <Video className="size-5 text-brand-navy" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-navy">
                                {liveClasses.length}
                            </p>
                            <p className="text-xs text-brand-muted">
                                Upcoming classes
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-brand-card p-5">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-brand-gold-soft p-2">
                            <BookOpen className="size-5 text-brand-gold-strong" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-navy">
                                {resources.length}
                            </p>
                            <p className="text-xs text-brand-muted">
                                Resources available
                            </p>
                        </div>
                    </div>
                </div>

                {nextClass && (
                    <div className="rounded-xl border border-brand-navy/20 bg-brand-navy/5 p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-brand-navy/10 p-2">
                                <CalendarDays className="size-5 text-brand-navy" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-brand-muted">
                                    Next class
                                </p>
                                <p className="truncate text-sm font-medium text-brand-navy">
                                    {nextClass.title}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Link
                    href="/student/live-classes"
                    className="group rounded-xl border border-border bg-brand-card p-6 transition-colors hover:border-brand-navy/40"
                >
                    <Video className="size-8 text-brand-navy mb-3" />
                    <h2 className="font-semibold text-brand-navy">
                        Live Classes
                    </h2>
                    <p className="mt-1 text-sm text-brand-muted">
                        View upcoming sessions and join links
                    </p>
                </Link>

                <Link
                    href="/student/resources"
                    className="group rounded-xl border border-border bg-brand-card p-6 transition-colors hover:border-brand-navy/40"
                >
                    <BookOpen className="size-8 text-brand-gold-strong mb-3" />
                    <h2 className="font-semibold text-brand-navy">Resources</h2>
                    <p className="mt-1 text-sm text-brand-muted">
                        Browse and download learning materials
                    </p>
                </Link>
            </div>
        </div>
    );
}
