import { getActiveLiveClasses } from "@/lib/dal/live-classes";
import { requireAuth } from "@/lib/dal/profile";
import { LiveClassCard } from "@/components/dashboard/LiveClassCard";
import { Video } from "lucide-react";

export default async function StudentLiveClassesPage() {
    const profile = await requireAuth();
    const liveClasses = await getActiveLiveClasses(profile.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-brand-navy">
                    Live Classes
                </h1>
                <p className="mt-1 text-sm text-brand-muted">
                    Upcoming sessions — click Join Class to attend
                </p>
            </div>

            {liveClasses.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-brand-card py-16 text-center">
                    <Video className="size-10 text-brand-muted/50 mb-3" />
                    <p className="text-sm text-brand-muted">
                        No upcoming live classes at the moment.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {liveClasses.map((lc) => (
                        <LiveClassCard key={lc.id} liveClass={lc} />
                    ))}
                </div>
            )}
        </div>
    );
}
