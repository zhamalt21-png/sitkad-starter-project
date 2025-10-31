-- Supabase schema for SITKAD (Postgres)
-- Run these statements in Supabase SQL Editor to create tables and RLS as needed.

-- Users will be managed by Supabase Auth; additional profile:
create table profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  role text, -- 'admin' or 'kepala'
  created_at timestamptz default now(),
  primary key (id)
);

-- Data Penduduk
create table penduduk (
  id uuid default gen_random_uuid() primary key,
  nomor_kk text,
  nik text unique not null,
  nama_lengkap text,
  jenis_kelamin text,
  tempat_lahir text,
  tanggal_lahir date,
  umur int,
  agama text,
  status_perkawinan text,
  hubungan_dgn_kk text,
  nama_ayah text,
  nama_ibu text,
  pendidikan text,
  pekerjaan text,
  kewarganegaraan text,
  alamat text,
  rt text,
  rw text,
  desa text,
  kecamatan text,
  kabupaten text,
  created_at timestamptz default now()
);

-- Template surat (store file metadata or simple HTML template)
create table templates (
  id uuid default gen_random_uuid() primary key,
  name text,
  file_url text,
  variables jsonb,
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

-- Surat keluar
create table surat_keluar (
  id uuid default gen_random_uuid() primary key,
  nomor_surat text,
  template_id uuid references templates(id),
  penduduk_nik text,
  tujuan text,
  isi text,
  status text default 'draft', -- draft, pending_approval, approved, rejected
  created_by uuid references auth.users,
  approved_by uuid references auth.users,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Surat masuk
create table surat_masuk (
  id uuid default gen_random_uuid() primary key,
  nomor_surat text,
  pengirim text,
  perihal text,
  file_url text,
  created_at timestamptz default now()
);

-- Disposisi table
create table disposisi (
  id uuid default gen_random_uuid() primary key,
  surat_id uuid references surat_masuk(id),
  from_user uuid references auth.users,
  to_user uuid references auth.users,
  note text,
  deadline date,
  created_at timestamptz default now()
);

-- Example index
create index on penduduk(nik);