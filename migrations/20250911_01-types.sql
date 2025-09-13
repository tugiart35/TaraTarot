-- Extensions and types
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'reading_type_enum') then
    create type reading_type_enum as enum ('tarot','numerology','love','career','general');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'reading_status_enum') then
    create type reading_status_enum as enum ('pending','reviewed','completed','failed');
  end if;
end $$;

