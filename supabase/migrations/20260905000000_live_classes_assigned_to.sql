-- Allow live classes to be assigned to a specific student (null = visible to all students)
alter table public.live_classes
    add column if not exists assigned_to uuid references public.profiles(id) on delete set null;
