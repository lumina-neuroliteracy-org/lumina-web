"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/public/lumina-logo.png";
import DyslexiaToggle from "@/components/DyslexiaToggle";

const navLinks = [
    { label: "About", href: "/about" },
    { href: "/services", label: "Services" },
    { label: "Dyslexia Info", href: "/dyslexia-info" },
    { label: "Contact", href: "/contact" },
];

export function MobileNavSidebar() {
    return (
        <Sidebar side="left" collapsible="offcanvas" className="lg:hidden">
            {/* Brand header */}
            <SidebarHeader className="border-b border-sidebar-border px-6 py-5">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src={logo} alt="Loger logo" width={80} height={40} />
                    </Link>
                    <div className="hidden text-sm font-semibold text-brand-gold lg:block">
                        <h3>LUMINA</h3>
                        <p>THE NEURO-LITERACY STUDIO</p>
                    </div>
                </div>
            </SidebarHeader>

            {/* Nav links */}
            <SidebarContent className="px-4 py-6">
                <SidebarMenu>
                    {navLinks.map(({ label, href }) => (
                        <SidebarMenuItem key={href}>
                            <SidebarMenuButton asChild size="lg" className="text-base font-medium">
                                <Link href={href}>{label}</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            {/* CTA */}
            <SidebarFooter className="border-t border-sidebar-border px-6 py-5 gap-3">
                <DyslexiaToggle fullWidth />
                <Button asChild className="w-full rounded-full">
                    <Link href="/login">Login</Link>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
