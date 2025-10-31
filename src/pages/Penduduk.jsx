import React, { useState, useEffect } from 'react';
import { supabase } from '../App';
import * as XLSX from 'xlsx';

export default function Penduduk(){
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ fetchPenduduk(); },[]);

  async function fetchPenduduk(){
    setLoading(true);
    const { data, error } = await supabase.from('penduduk').select('*').limit(500);
    if(error) alert(error.message);
    else setRows(data || []);
    setLoading(false);
  }

  function handleFile(e){
    const f = e.target.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = (evt)=>{
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, {type:'array'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, {defval:''});
      // map columns to expected names (basic)
      const mapped = json.map(r=> ({
        nomor_kk: r.NOMOR_KK || r['NO KK'] || r.NO_KK || '',
        nik: r.NIK || '',
        nama_lengkap: r.NAMA_LENGKAP || r.NAMA || '',
        jenis_kelamin: (r.JENIS_KELAMIN||'').toString().replace(/^L$/i,'Laki-Laki').replace(/^P$/i,'Perempuan'),
        tempat_lahir: r.TEMPAT_LAHIR || r.TEMPAT_LAHIR,
        tanggal_lahir_text: r.TANGGAL_LAHIR || r['TANGGAL LAHIR'] || '',
        umur: r.UMUR || null,
        agama: r.AGAMA || '',
        status_perkawinan: r.STATUS_PERKAWINAN || '',
        hubungan_dgn_kk: r.HUBUNGAN_DENGAN_KEPALA_KELUARGA || r.SHDK || '',
        nama_ayah: r.NAMA_AYAH || '',
        nama_ibu: r.NAMA_IBU || '',
        pendidikan: r.PENDIDIKAN || '',
        pekerjaan: r.PEKERJAAN || '',
        kewarganegaraan: r.KEWARGANEGARAAN || 'WNI',
        alamat: r.ALAMAT || '',
        rt: r.RT || r.RT,
        rw: r.RW || r.RW,
        desa: r.DESA || 'Habirau Tengah',
        kecamatan: r.KECAMATAN || 'Daha Selatan',
        kabupaten: r.KABUPATEN || 'Hulu Sungai Selatan'
      }));
      // insert to supabase in batches
      insertBatch(mapped);
    };
    reader.readAsArrayBuffer(f);
  }

  async function insertBatch(arr){
    setLoading(true);
    // convert tanggal text like "22 November 2025" to yyyy-mm-dd if possible
    const parseDateText = (txt)=>{
      try{
        const parts = txt.split(' ');
        if(parts.length===3){
          const day = parts[0];
          const monthName = parts[1];
          const year = parts[2];
          const monthNames = {Januari:1,Februari:2,Maret:3,April:4,Mei:5,Juni:6,Juli:7,Agustus:8,September:9,Oktober:10,November:11,Desember:12};
          const m = monthNames[monthName] || monthNames[monthName.charAt(0).toUpperCase()+monthName.slice(1)];
          if(m) return `${year}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        }
      }catch(e){}
      return null;
    };

    for(const r of arr){
      const date_iso = parseDateText(r.tanggal_lahir_text || '');
      const payload = {
        nomor_kk: r.nomor_kk,
        nik: r.nik,
        nama_lengkap: r.nama_lengkap,
        jenis_kelamin: r.jenis_kelamin,
        tempat_lahir: r.tempat_lahir,
        tanggal_lahir: date_iso,
        umur: r.umur,
        agama: r.agama,
        status_perkawinan: r.status_perkawinan,
        hubungan_dgn_kk: r.hubungan_dgn_kk,
        nama_ayah: r.nama_ayah,
        nama_ibu: r.nama_ibu,
        pendidikan: r.pendidikan,
        pekerjaan: r.pekerjaan,
        kewarganegaraan: r.kewarganegaraan,
        alamat: r.alamat,
        rt: r.rt,
        rw: r.rw,
        desa: r.desa,
        kecamatan: r.kecamatan,
        kabupaten: r.kabupaten
      };
      const { data, error } = await supabase.from('penduduk').upsert(payload, { onConflict: ['nik'] });
      if(error) console.error('insert error', error);
    }
    setLoading(false);
    fetchPenduduk();
    alert('Upload selesai');
  }

  return (
    <div>
      <h3>Data Penduduk</h3>
      <div>
        <input type="file" accept=".xls,.xlsx" onChange={handleFile} />
        {loading && <div>Memproses...</div>}
      </div>
      <table border="1" cellPadding="6">
        <thead><tr><th>NIK</th><th>Nama</th><th>Jenis Kelamin</th><th>Alamat</th></tr></thead>
        <tbody>
          {rows.map(r=> (<tr key={r.id}><td>{r.nik}</td><td>{r.nama_lengkap}</td><td>{r.jenis_kelamin}</td><td>{r.alamat}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
}