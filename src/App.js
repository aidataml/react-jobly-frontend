import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Companies from './components/Companies';
import CompanyDetail from './components/CompanyDetail';
import Jobs from './components/Jobs';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navigation />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
