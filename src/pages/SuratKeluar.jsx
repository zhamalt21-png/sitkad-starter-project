import React, {useState, useEffect} from 'react';
import { supabase } from '../App';

export default function SuratKeluar(){
  const [penduduk, setPenduduk] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({nomor_surat:'', template_id:'', penduduk_nik:'', isi:'', tujuan:''});

  useEffect(()=>{ load(); },[]);

  async function load(){
    const { data: p } = await supabase.from('penduduk').select('nik,nama_lengkap').limit(500);
    setPenduduk(p || []);
    const { data: t } = await supabase.from('templates').select('*').limit(100);
    setTemplates(t || []);
  }

  async function createSurat(){
    const user = (await supabase.auth.getUser()).data.user;
    const payload = {...form, created_by: user.id, status:'pending_approval'};
    const { data, error } = await supabase.from('surat_keluar').insert(payload);
    if(error) alert(error.message); else { alert('Surat dibuat dan diajukan untuk persetujuan'); setForm({nomor_surat:'', template_id:'', penduduk_nik:'', isi:'', tujuan:''}); }
  }

  return (
    <div>
      <h3>Surat Keluar</h3>
      <div style={{maxWidth:800}}>
        <div><label>Nomor Surat</label><input value={form.nomor_surat} onChange={e=>setForm({...form, nomor_surat:e.target.value})} /></div>
        <div><label>Template</label>
          <select value={form.template_id} onChange={e=>setForm({...form, template_id:e.target.value})}>
            <option value="">-- pilih --</option>
            {templates.map(t=> <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div><label>Untuk Penduduk</label>
          <select value={form.penduduk_nik} onChange={e=>setForm({...form, penduduk_nik:e.target.value})}>
            <option value="">-- pilih --</option>
            {penduduk.map(p=> <option key={p.nik} value={p.nik}>{p.nama_lengkap} — {p.nik}</option>)}
          </select>
        </div>
        <div><label>Isi singkat</label><textarea value={form.isi} onChange={e=>setForm({...form, isi:e.target.value})}></textarea></div>
        <div style={{marginTop:8}}><button onClick={createSurat}>Buat & Ajukan Persetujuan</button></div>
      </div>
    </div>
  );
}