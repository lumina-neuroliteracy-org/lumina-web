import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/navigation/Navbar";
import { MobileNavSidebar } from "@/components/navigation/MobileNavSideBar";
import Footer from "@/components/Footer";
import { DyslexiaProvider } from "@/components/DyslexiaProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <DyslexiaProvider>
            <SidebarProvider defaultOpen={false} className="flex-col w-full">
                <MobileNavSidebar />
                <Navbar />
                <main id="main-content" className="flex-1">
                    {children}
                </main>
                <Footer />
                <WhatsAppButton />
            </SidebarProvider>
        </DyslexiaProvider>
    );
}
