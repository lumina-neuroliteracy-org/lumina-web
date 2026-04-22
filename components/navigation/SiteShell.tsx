"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { authNavLinks, primaryNavLinks } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/lumina-logo.png"
        alt="Luminar logo"
        width={69}
        height={40}
        priority
        className="h-10 w-auto"
      />
      <span className="text-sm font-semibold tracking-[0.22em] uppercase text-foreground">
        Luminar
      </span>
    </Link>
  );
}

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {primaryNavLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          <NavLinks />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost">
            <Link href={authNavLinks[0].href}>{authNavLinks[0].label}</Link>
          </Button>
          <Button asChild size="lg" className="rounded-full px-5">
            <Link href={authNavLinks[1].href}>{authNavLinks[1].label}</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <SidebarTrigger
            aria-label="Open navigation menu"
            className="size-10 rounded-full border border-border/70"
          >
            <Menu className="size-5" />
          </SidebarTrigger>
        </div>
      </div>
    </header>
  );
}

function MobileSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <div className="md:hidden">
      <Sidebar side="right" collapsible="none">
        <SidebarHeader className="border-b border-sidebar-border px-5 py-5">
          <div className="flex items-center justify-between gap-3">
            <Logo />
            <span className="rounded-full bg-sidebar-accent px-3 py-1 text-xs font-medium text-sidebar-foreground">
              Menu
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4">
          <SidebarGroup className="p-0">
            <SidebarMenu className="gap-1">
              {primaryNavLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild size="lg" isActive={pathname === link.href}>
                    <Link href={link.href} onClick={() => setOpenMobile(false)}>
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border px-5 py-5">
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href={authNavLinks[0].href} onClick={() => setOpenMobile(false)}>
              {authNavLinks[0].label}
            </Link>
          </Button>
          <Button asChild size="lg" className="w-full">
            <Link href={authNavLinks[1].href} onClick={() => setOpenMobile(false)}>
              {authNavLinks[1].label}
            </Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}

export default function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <MobileSidebar />
        {children}
      </div>
    </SidebarProvider>
  );
}
