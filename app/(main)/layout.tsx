// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Navbar } from "@/components/navigation/Navbar";
// import { MobileNavSidebar } from "@/components/navigation/MobileNavSideBar";
// import Footer from "@/components/Footer";
// import { DyslexiaProvider } from "@/components/DyslexiaProvider";
// import WhatsAppButton from "@/components/WhatsAppButton";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        // <DyslexiaProvider>
        //     <SidebarProvider defaultOpen={false} className="flex-col w-full">
        //         <MobileNavSidebar />
        //         <Navbar />
        //         <main id="main-content" className="flex-1">
        //             {children}
        //         </main>
        //         <Footer />
        //         <WhatsAppButton />
        //     </SidebarProvider>
        // </DyslexiaProvider>

        <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
            <p className="text-lg text-muted-foreground max-w-md">
                We&apos;re working on something. Check back soon.
            </p>
        </main>
    );
}
