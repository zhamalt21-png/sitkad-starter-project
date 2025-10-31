import React, {useState} from 'react';
import { supabase } from '../App';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  async function handleLogin(){
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) alert(error.message);
    else window.location.reload();
  }

  return (
    <div style={{padding:20}}>
      <h2>Login SITKAD</h2>
      <div style={{maxWidth:400}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{marginTop:8}}>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <p style={{marginTop:12}}>Untuk pengujian, buat user di Supabase Auth, lalu isi profil di tabel <code>profiles</code>.</p>
    </div>
  );
}