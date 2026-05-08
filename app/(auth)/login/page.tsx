"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import loginImage from "@/public/login.jpeg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
        </svg>
    );
}

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    async function handleGoogleSignIn() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) {
            setError(error.message);
        } else {
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", data.user.id)
                .single();
            const dest =
                profile?.role === "admin" || profile?.role === "super_admin"
                    ? "/admin/dashboard"
                    : "/student/dashboard";
            router.push(dest);
        }
    }

    return (
        <AuthShell image={loginImage} imageAlt="Login illustration">
            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl font-semibold text-brand-navy">Welcome back</h1>
                    <p className="text-sm text-brand-muted">Sign in to your account</p>
                </div>

                {/* Google */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium text-brand-navy shadow-sm transition-colors hover:bg-gray-50"
                >
                    <GoogleIcon />
                    Sign in with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <hr className="flex-1 border-border" />
                    <span className="text-xs text-brand-muted">or</span>
                    <hr className="flex-1 border-border" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-muted" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11 rounded-xl pl-9"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-muted" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-11 rounded-xl pl-9 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-navy"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-brand-navy">
                            <Checkbox
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Remember me
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-brand-gold-strong hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90"
                    >
                        {loading ? "Signing in…" : "Sign in"}
                    </Button>
                </form>

                <p className="text-center text-sm text-brand-muted">
                    If you are having trouble logging in, please{" "}
                    <Link href="/contact" className="underline hover:text-brand-navy">
                        contact us
                    </Link>
                </p>

                <p className="text-center text-sm text-brand-muted">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="font-medium text-brand-navy hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthShell>
    );
}
