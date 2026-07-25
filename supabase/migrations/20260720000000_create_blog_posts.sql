-- Blog categories table
create table if not exists public.blog_categories (
    id         uuid primary key default gen_random_uuid(),
    name       text not null unique,
    created_at timestamptz not null default now()
);

-- Seed default categories
insert into public.blog_categories (name) values
    ('Understanding Dyslexia'),
    ('Teaching Approaches'),
    ('For Parents'),
    ('Early Intervention'),
    ('Wellbeing'),
    ('News & Updates'),
    ('General')
on conflict (name) do nothing;

alter table public.blog_categories enable row level security;

create policy "Public can read categories"
    on public.blog_categories
    for select
    using (true);

create policy "Admins can manage categories"
    on public.blog_categories
    for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role in ('admin', 'super_admin')
        )
    )
    with check (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role in ('admin', 'super_admin')
        )
    );

-- Blog posts table
create table if not exists public.blog_posts (
    id          uuid primary key default gen_random_uuid(),
    slug        text not null unique,
    title       text not null,
    excerpt     text,
    category    text,
    content     jsonb not null default '[]',
    read_time   text,
    featured    boolean not null default false,
    is_published boolean not null default false,
    publish_at  timestamptz,          -- null = publish immediately when is_published flips to true
    created_by  uuid references auth.users(id) on delete set null,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- Indexes for common query patterns
create index if not exists blog_posts_is_published_idx on public.blog_posts (is_published);
create index if not exists blog_posts_publish_at_idx   on public.blog_posts (publish_at);
create index if not exists blog_posts_slug_idx         on public.blog_posts (slug);
create index if not exists blog_posts_featured_idx     on public.blog_posts (featured) where featured = true;

-- Row-level security
alter table public.blog_posts enable row level security;

-- Public: read published posts whose schedule has arrived
create policy "Public can read published posts"
    on public.blog_posts
    for select
    using (
        is_published = true
        and (publish_at is null or publish_at <= now())
    );

-- Admins/super_admins: full access
create policy "Admins have full access"
    on public.blog_posts
    for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role in ('admin', 'super_admin')
        )
    )
    with check (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role in ('admin', 'super_admin')
        )
    );
