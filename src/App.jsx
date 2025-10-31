import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Penduduk from './pages/Penduduk';
import SuratKeluar from './pages/SuratKeluar';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App(){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const u = supabase.auth.getUser().then(r=>{
      if(r.data?.user) setUser(r.data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session)=>{
      if(session?.user) setUser(session.user);
      else setUser(null);
    });
    return ()=> listener?.subscription?.unsubscribe?.();
  },[]);

  if(!user) return <Login />;
  return (
    <div className="app">
      <header><h1>SITKAD — Sistem Informasi dan Tata Kelola Arsip Desa</h1></header>
      <div className="container">
        <aside className="sidebar">
          <button onClick={()=>window.location.reload()}>Logout</button>
        </aside>
        <main className="main">
          <Dashboard user={user} />
          <Penduduk />
          <SuratKeluar />
        </main>
      </div>
    </div>
  );
}