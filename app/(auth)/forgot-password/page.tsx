"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const supabase = createClient();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
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
                <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-navy"
                >
                    <ArrowLeft className="size-3.5" />
                    Back to sign in
                </Link>

                {submitted ? (
                    <div className="flex flex-col items-start gap-4">
                        <CheckCircle className="size-10 text-brand-navy" />
                        <h2 className="text-xl font-semibold text-brand-navy">Check your email</h2>
                        <p className="text-sm leading-6 text-brand-muted">
                            We&apos;ve sent a password reset link to{" "}
                            <span className="font-medium text-brand-navy">{email}</span>.
                            Follow the link to set a new password.
                        </p>
                        <Link href="/login" className="text-sm font-medium text-brand-navy hover:underline">
                            Back to sign in
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-semibold text-brand-navy">Reset your password</h1>
                            <p className="text-sm text-brand-muted">
                                Enter your email and we&apos;ll send you a reset link.
                            </p>
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

                            {error && (
                                <p className="text-sm text-destructive">{error}</p>
                            )}

                            <Button
                                type="submit"
                                size="lg"
                                disabled={loading}
                                className="w-full rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90"
                            >
                                {loading ? "Sending…" : "Send reset link"}
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </AuthShell>
    );
}
