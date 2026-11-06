-- One personal-best row per authenticated user.
create table if not exists public.tetris_leaderboard (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 24),
  best_score bigint not null check (best_score between 0 and 2000000000),
  lines integer not null check (lines between 0 and 100000),
  level integer not null check (level between 1 and 10000),
  updated_at timestamptz not null default now()
);

alter table public.tetris_leaderboard enable row level security;
revoke all on table public.tetris_leaderboard from anon, authenticated;
grant select on table public.tetris_leaderboard to anon;
grant select, insert, update on table public.tetris_leaderboard to authenticated;

drop policy if exists "Leaderboard is public to read" on public.tetris_leaderboard;
create policy "Leaderboard is public to read"
  on public.tetris_leaderboard
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Users can insert their own score" on public.tetris_leaderboard;
create policy "Users can insert their own score"
  on public.tetris_leaderboard
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own score" on public.tetris_leaderboard;
create policy "Users can update their own score"
  on public.tetris_leaderboard
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create index if not exists tetris_leaderboard_rank_idx
  on public.tetris_leaderboard (best_score desc, updated_at asc);

create or replace function public.submit_tetris_score(
  p_display_name text,
  p_score bigint,
  p_lines integer,
  p_level integer
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_display_name text := pg_catalog.btrim(coalesce(p_display_name, ''));
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if pg_catalog.char_length(v_display_name) not between 1 and 24 then
    raise exception 'Display name must contain 1 to 24 characters';
  end if;

  if p_score is null or p_score not between 0 and 2000000000
     or p_lines is null or p_lines not between 0 and 100000
     or p_level is null or p_level not between 1 and 10000 then
    raise exception 'Invalid score data';
  end if;

  insert into public.tetris_leaderboard as existing
    (user_id, display_name, best_score, lines, level, updated_at)
  values
    (v_user_id, v_display_name, p_score, p_lines, p_level, pg_catalog.now())
  on conflict (user_id) do update set
    display_name = excluded.display_name,
    best_score = case
      when excluded.best_score > existing.best_score then excluded.best_score
      else existing.best_score
    end,
    lines = case
      when excluded.best_score > existing.best_score then excluded.lines
      else existing.lines
    end,
    level = case
      when excluded.best_score > existing.best_score then excluded.level
      else existing.level
    end,
    updated_at = case
      when excluded.best_score > existing.best_score then pg_catalog.now()
      else existing.updated_at
    end;
end;
$$;

revoke all on function public.submit_tetris_score(text, bigint, integer, integer)
  from public, anon, authenticated;
grant execute on function public.submit_tetris_score(text, bigint, integer, integer)
  to authenticated;
