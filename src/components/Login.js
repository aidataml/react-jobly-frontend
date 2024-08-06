// Component for the login page.
import React, { useState } from 'react';
import supabase from '../supabase';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Autheniticate with supabase upon sign-in.
  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    if (error) {
      alert('Login Error: ' + error.message);
    } else {
      alert('You have successfully logged in.');
    }
  }

  // Render user interface using JSX/HTML.
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="text-center align-items-center">
        <input type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
