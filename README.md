# SITKAD — Starter Frontend (React + Supabase)

Ini adalah starter project frontend untuk SITKAD (Sistem Informasi dan Tata Kelola Arsip Desa).
Tujuan: memberikan basis aplikasi web yang terhubung ke Supabase sebagai backend (database & auth).

## Isi paket
- `package.json` — dependensi & script
- `src/` — kode React (Vite)
- `.env.example` — contoh environment variables untuk Supabase
- `supabase_schema.sql` — kumpulan perintah SQL untuk membuat tabel Supabase
- `DEPLOY.md` — panduan singkat deploy ke Supabase & Vercel

---

## Langkah singkat menjalankan lokal (developer)
1. Pasang Node.js (disarankan v18+).
2. `npm install`
3. Buat project Supabase dan catat `SUPABASE_URL` dan `SUPABASE_ANON_KEY` (lihat DEPLOY.md)
4. Salin `.env.example` menjadi `.env` dan isi variabel dengan kredensial Supabase Anda.
5. `npm run dev` — buka `http://localhost:5173`

Lihat `DEPLOY.md` untuk langkah membuat tabel di Supabase dan deploy ke Vercel.