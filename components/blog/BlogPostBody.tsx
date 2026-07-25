import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/AnimateIn";
import { ShareBar } from "@/components/blog/ShareBar";
import { formatDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/supabase/types";

interface BlogPostBodyProps {
    post: BlogPost;
    related: BlogPost[];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luminaneuroliteracy.org";

export default function BlogPostBody({ post, related }: BlogPostBodyProps) {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;

    return (
        <>
            {/* Article content */}
            <section className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
                <AnimateIn>
                    <div className="space-y-10">
                        {post.content.map((section, i) => (
                            <div key={i}>
                                {section.heading && (
                                    <h2 className="text-xl font-semibold tracking-tight text-brand-navy lg:text-2xl">
                                        {section.heading}
                                    </h2>
                                )}
                                <div className={section.heading ? "mt-4 space-y-4" : "space-y-4"}>
                                    {section.body
                                        .split(/\n\n+/)
                                        .filter(Boolean)
                                        .map((para, j) => (
                                            <p key={j} className="text-base leading-8 text-brand-muted">
                                                {para.trim()}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <ShareBar title={post.title} url={postUrl} />
                </AnimateIn>
            </section>

            {/* CTA banner */}
            <section className="bg-brand-navy">
                <AnimateIn>
                    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-5 py-12 text-center sm:px-8 lg:py-16">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                            Ready to take the next step?
                        </p>
                        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance text-brand-on-navy lg:text-4xl">
                            Every learner deserves the right support.
                        </h2>
                        <p className="max-w-xl text-base leading-7 text-brand-on-navy/75">
                            Book a free consultation with Lumina to discuss your child's needs
                            and find the right path forward.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="rounded-full bg-brand-gold px-8 text-brand-navy hover:bg-brand-gold/90"
                        >
                            <Link href="/contact">
                                <CalendarCheck className="size-4" />
                                Book a consultation
                            </Link>
                        </Button>
                    </div>
                </AnimateIn>
            </section>

            {/* Related posts */}
            {related.length > 0 && (
                <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
                    <AnimateIn>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                            Keep Reading
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                            More from the blog.
                        </h2>
                    </AnimateIn>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((relPost, i) => (
                            <AnimateIn key={relPost.id} delay={0.1 * i}>
                                <Link
                                    href={`/blog/${relPost.slug}`}
                                    className="group flex h-full flex-col rounded-[1.75rem] border border-border bg-brand-card p-6 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    {relPost.category && (
                                        <span className="inline-block rounded-full bg-brand-gold-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold-strong">
                                            {relPost.category}
                                        </span>
                                    )}
                                    <h3 className="mt-4 flex-1 text-base font-semibold leading-snug tracking-tight text-brand-navy">
                                        {relPost.title}
                                    </h3>
                                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                                        <span className="text-xs text-brand-muted">
                                            {formatDate(relPost.created_at)}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs font-semibold text-brand-navy group-hover:text-brand-gold transition-colors">
                                            Read <ArrowRight className="size-3.5" />
                                        </span>
                                    </div>
                                </Link>
                            </AnimateIn>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
