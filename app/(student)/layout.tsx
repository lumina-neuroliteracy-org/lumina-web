import { requireAuth } from "@/lib/dal/profile";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DyslexiaProvider } from "@/components/DyslexiaProvider";

export default async function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const profile = await requireAuth();

    return (
        <DyslexiaProvider>
            <div className="flex min-h-screen bg-brand-surface">
                <StudentSidebar profile={profile} />
                <main className="flex-1 overflow-auto p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </DyslexiaProvider>
    );
}
