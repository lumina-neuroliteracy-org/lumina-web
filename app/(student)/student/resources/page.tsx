import { getPublishedResources } from "@/lib/dal/resources";
import { ResourceCard } from "@/components/dashboard/ResourceCard";
import { BookOpen } from "lucide-react";

export default async function StudentResourcesPage() {
    const resources = await getPublishedResources();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-brand-navy">
                    Resources
                </h1>
                <p className="mt-1 text-sm text-brand-muted">
                    Browse and download your learning materials
                </p>
            </div>

            {resources.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-brand-card py-16 text-center">
                    <BookOpen className="size-10 text-brand-muted/50 mb-3" />
                    <p className="text-sm text-brand-muted">
                        No resources available yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {resources.map((r) => (
                        <ResourceCard key={r.id} resource={r} />
                    ))}
                </div>
            )}
        </div>
    );
}
