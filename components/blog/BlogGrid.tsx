import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { formatDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/supabase/types";

interface BlogGridProps {
    posts: BlogPost[];
    featured: BlogPost | null;
}

export default function BlogGrid({ posts, featured }: BlogGridProps) {
    const rest = posts.filter((p) => p.id !== featured?.id);
    // console.log(rest);

    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            {/* Featured post */}
            {featured && (
                <AnimateIn>
                    <Link
                        href={`/blog/${featured.slug}`}
                        className="group mb-10 flex flex-col overflow-hidden rounded-[2rem] border border-border bg-brand-card shadow-sm transition-shadow hover:shadow-md lg:mb-14 lg:flex-row"
                    >
                        {/* Cover image / fallback colour panel */}
                        <div className="relative w-full overflow-hidden bg-brand-navy lg:w-2/5">
                            {featured.cover_image_url ? (
                                <Image
                                    src={featured.cover_image_url}
                                    alt={featured.title}
                                    width={800}
                                    height={530}
                                    priority
                                    className="h-full w-full object-cover"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                />
                            ) : (
                                <div className="flex min-h-52 items-center justify-center p-8 lg:h-full">
                                    <span className="text-center text-3xl font-semibold leading-tight tracking-tight text-balance text-brand-gold lg:text-4xl">
                                        {featured.title}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-between p-8 lg:p-10">
                            <div>
                                {featured.category && (
                                    <span className="inline-block rounded-full bg-brand-gold-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold-strong">
                                        {featured.category}
                                    </span>
                                )}
                                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-brand-navy lg:text-3xl">
                                    {featured.title}
                                </h2>
                                {featured.excerpt && (
                                    <p className="mt-3 text-base leading-7 text-brand-muted">
                                        {featured.excerpt}
                                    </p>
                                )}
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-xs text-brand-muted">
                                    {featured.read_time && (
                                        <>
                                            <Clock className="size-3.5" />
                                            <span>{featured.read_time}</span>
                                            <span>·</span>
                                        </>
                                    )}
                                    <span>{formatDate(featured.created_at)}</span>
                                </div>
                                <span className="flex items-center gap-1 text-sm font-semibold text-brand-navy group-hover:text-brand-gold transition-colors">
                                    Read article <ArrowRight className="size-4" />
                                </span>
                            </div>
                        </div>
                    </Link>
                </AnimateIn>
            )}

            {/* No posts state */}
            {posts.length === 0 && !featured && (
                <div className="flex flex-col items-center py-20 text-center">
                    <p className="text-lg font-medium text-brand-navy">No posts yet.</p>
                    <p className="mt-2 text-sm text-brand-muted">
                        Check back soon for articles on dyslexia, literacy, and learning.
                    </p>
                </div>
            )}

            {/* Section heading */}
            {rest.length > 0 && (
                <>
                    <AnimateIn delay={0.05}>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                            All Articles
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy lg:text-4xl">
                            Browse the latest posts.
                        </h2>
                    </AnimateIn>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {rest.map((post, i) => (
                            <AnimateIn key={post.id} delay={0.1 * i}>
                                {/* cover_image_url */}
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-brand-card shadow-sm transition-shadow hover:shadow-md"
                                >
                                    {post.cover_image_url && (
                                        <div className="relative h-44 w-full shrink-0 overflow-hidden">
                                            <Image
                                                src={post.cover_image_url}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-1 flex-col p-6">
                                    {post.category && (
                                        <span className="inline-block rounded-full bg-brand-gold-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold-strong">
                                            {post.category}
                                        </span>
                                    )}
                                    <h3 className="mt-4 flex-1 text-lg font-semibold leading-snug tracking-tight text-brand-navy">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-brand-muted">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                                        <div className="flex items-center gap-2 text-xs text-brand-muted">
                                            {post.read_time && (
                                                <>
                                                    <Clock className="size-3.5" />
                                                    <span>{post.read_time}</span>
                                                </>
                                            )}
                                        </div>
                                        <span className="flex items-center gap-1 text-xs font-semibold text-brand-navy group-hover:text-brand-gold transition-colors">
                                            Read <ArrowRight className="size-3.5" />
                                        </span>
                                    </div>
                                    </div>
                                </Link>
                            </AnimateIn>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
