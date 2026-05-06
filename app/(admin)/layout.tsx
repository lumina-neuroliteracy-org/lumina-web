import { requireAdmin } from "@/lib/dal/profile";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { DyslexiaProvider } from "@/components/DyslexiaProvider";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const profile = await requireAdmin();

    return (
        <DyslexiaProvider>
            <div className="flex min-h-screen bg-brand-surface">
                <AdminSidebar profile={profile} />
                <main className="flex-1 overflow-auto p-6 pt-14 lg:p-8 lg:pt-8">
                    {children}
                </main>
            </div>
        </DyslexiaProvider>
    );
}
