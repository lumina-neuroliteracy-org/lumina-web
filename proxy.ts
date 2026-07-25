import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
         process.env.NEXT_PUBLIC_SUPABASE_URL!,
         process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    const isStudentRoute = pathname.startsWith("/student");
    const isAdminRoute = pathname.startsWith("/admin");
    const isAuthRoute = pathname === "/login" || pathname === "/signup";

    // Unauthenticated user trying to access protected routes
    if ((isStudentRoute || isAdminRoute) && !user) {
        const url = new URL("/login", request.url);
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
    }

    // Admin routes — verify role in profiles table
    if (isAdminRoute && user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
        const isAdmin =
            profile?.role === "admin" || profile?.role === "super_admin";
        if (!isAdmin) {
            return NextResponse.redirect(
                new URL("/student/dashboard", request.url)
            );
        }
    }

    // Authenticated user landing on auth pages — redirect to their dashboard
    if (isAuthRoute && user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
        const dest =
            profile?.role === "admin" || profile?.role === "super_admin"
                ? "/admin/dashboard"
                : "/student/dashboard";
        return NextResponse.redirect(new URL(dest, request.url));
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
