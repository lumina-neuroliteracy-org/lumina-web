import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/supabase/types";

interface BlogPostHeroProps {
    post: BlogPost;
}

export default function BlogPostHero({ post }: BlogPostHeroProps) {
    return (
        <section className="w-full bg-brand-navy">
            <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-20">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-on-navy/70 hover:text-brand-gold transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Back to Blog
                </Link>

                <div className="mt-6">
                    {post.category && (
                        <span className="inline-block rounded-full bg-brand-gold-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold-strong">
                            {post.category}
                        </span>
                    )}
                    <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-brand-on-navy sm:text-4xl lg:text-5xl">
                        {post.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-brand-on-navy/75 sm:text-lg">
                        {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-4 text-sm text-brand-on-navy/60">
                        {post.read_time && (
                            <>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="size-4" />
                                    {post.read_time}
                                </span>
                                <span>·</span>
                            </>
                        )}
                        <span>{formatDate(post.created_at)}</span>
                    </div>
                </div>
            </div>

            {post.cover_image_url && (
                <div className="mx-auto w-full max-w-4xl px-5 pb-0 sm:px-8">
                    <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-2xl shadow-lg">
                        <Image
                            src={post.cover_image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 896px) 100vw, 896px"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
