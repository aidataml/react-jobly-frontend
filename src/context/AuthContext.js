import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase';

const AuthContext = createContext();

// Provide authentication state and functions for logging in, signing up and logging out.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(user);
  };

  const signup = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setUser(user);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
