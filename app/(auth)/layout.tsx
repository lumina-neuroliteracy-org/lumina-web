import { DyslexiaProvider } from "@/components/DyslexiaProvider";
import { MobileNavSidebar } from "@/components/navigation/MobileNavSideBar"
import { Navbar } from "@/components/navigation/Navbar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <DyslexiaProvider>
            <SidebarProvider defaultOpen={false} className="flex-col w-full">
                <MobileNavSidebar />
                <Navbar />
                <main id="main-content" className="flex-1">
                    {children}
                </main>
            </SidebarProvider>
        </DyslexiaProvider>
    );
}
