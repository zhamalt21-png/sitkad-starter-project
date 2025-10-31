# Deploy & Supabase Setup (Panduan singkat)

1. Buat project di https://supabase.com -> New Project
2. Catat **Project URL** dan **anon public API key** (Settings -> API)
3. Buka SQL Editor di Supabase, paste isi `supabase_schema.sql` dan jalankan untuk membuat tabel.
4. Di tab Authentication -> Users, buat user test (email/password) untuk Admin & Kepala Desa, lalu di Profiles table masukkan role 'admin' atau 'kepala' untuk uid masing-masing.
5. Di lokal: copy `.env.example` menjadi `.env` dan isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
6. Jalankan `npm install` lalu `npm run dev`.
7. Untuk deploy ke Vercel: push repo ke GitHub, lalu import di Vercel. Pastikan mengatur Environment Variables di Vercel sesuai `.env` dan build command `npm run build`.