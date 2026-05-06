"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";


export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const supabase = createClient();

    async function handleGoogleSignUp() {
        // if (!agreed) {
        //     setError("You must agree to the Terms of Service and Privacy Policy to continue.");
        //     return;
        // }
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } },
        });
        setLoading(false);
        if (error) {
            setError(error.message);
        } else {
            setSubmitted(true);
        }
    }

    return (
        <AuthShell>
            <div className="w-full max-w-sm space-y-6">
                {submitted ? (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <CheckCircle className="size-10 text-brand-navy" />
                        <h2 className="text-xl font-semibold text-brand-navy">Check your email</h2>
                        <p className="text-sm leading-6 text-brand-muted">
                            We&apos;ve sent a confirmation link to{" "}
                            <span className="font-medium text-brand-navy">{email}</span>.
                            Click the link to activate your account.
                        </p>
                        <Link href="/login" className="text-sm font-medium text-brand-navy hover:underline">
                            Back to sign in
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-1 text-center">
                            <h1 className="text-2xl font-semibold text-brand-navy">Create an account</h1>
                            <p className="text-sm text-brand-muted">Get started with Lumina</p>
                        </div>

                        {/* Google */}
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium text-brand-navy shadow-sm transition-colors hover:bg-gray-50"
                        >
                            <FcGoogle className="size-4" />
                            Sign up with Google
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <hr className="flex-1 border-border" />
                            <span className="text-xs text-brand-muted">or</span>
                            <hr className="flex-1 border-border" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="name">Full name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-muted" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="h-11 rounded-xl pl-9"
                                    />
                                </div>
                            </div>

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

                            {/* Consent checkbox */}
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id="agree"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="mt-0.5 shrink-0"
                                />
                                <label
                                    htmlFor="agree"
                                    className="cursor-pointer text-xs leading-5 text-brand-muted"
                                >
                                    I have read and agree to the{" "}
                                    <Link
                                        href="/terms-of-use"
                                        target="_blank"
                                        className="font-medium text-brand-navy hover:underline"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy-policy"
                                        target="_blank"
                                        className="font-medium text-brand-navy hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </label>
                            </div>

                            {error && (
                                <p className="text-sm text-destructive">{error}</p>
                            )}

                            <Button
                                type="submit"
                                size="lg"
                                disabled={loading || !agreed}
                                className="w-full rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90 disabled:opacity-50"
                            >
                                {loading ? "Creating account…" : "Create account"}
                            </Button>
                        </form>

                        <p className="text-center text-sm text-brand-muted">
                            Already have an account?{" "}
                            <Link href="/login" className="font-medium text-brand-navy hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </AuthShell>
    );
}
