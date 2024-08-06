// Component for signup page.
import React, { useState } from 'react';
import supabase from '../supabase';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Save user credentials to database upon submission.
  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) {
      setMessage('Signup Error: ' + error.message);
    } else {
      setMessage('Welcome to Jobly! You have successfully signed up. You may now apply to jobs.');
    }
  }

  // Render user interface using JSX/HTML.
  return (
    <div>
      <h1>Sign Up</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="text-center align-items-center">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
