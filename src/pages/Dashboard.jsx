import React from 'react';

export default function Dashboard({ user }) {
  return (
    <div>
      <h1
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    ackgroundColor: '#E8F1F8', // warna lembut agar logo menonjol
          color: '#003366', // biru tua elegan
    padding: "10px 20px",
    borderBottom: '4px solid #00796B', // garis bawah hijau toska biar serasi
    borderRadius: '0 0 10px 10px',
  }}
>
  <img
    src="/android-chrome-192x192.png"
    alt="Logo SITKAD"
    style={{ width: "95px", height: "95px", objectFit: "contain" }}
  />
  SITKAD — Sistem Informasi dan Tata Kelola Arsip Desa
</h1>

      <div style={{ padding: '20px' }}>
        <h2>Dashboard</h2>
        <p>Selamat datang, {user?.email}</p>
        <p>Gunakan menu di bawah untuk mengelola data penduduk & surat.</p>
      </div>
    </div>
  );
}
