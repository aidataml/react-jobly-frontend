// Component for user profiles (not linked).
import React, { useState, useEffect } from 'react';
import supabase from '../supabase';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Retrieve profile data from database.
  useEffect(() => {
    async function retrieveProfile() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error retrieving profile:", error);
      } else {
        setProfile(user);
      }
      setLoading(false);
    }
    retrieveProfile();
  }, []);

  // Show message during page load.
  if (loading) {
    return <div>Please wait. Page is loading...</div>;
  }

  // Show message if profile is not found.
  if (!profile) {
    return <div>Profile not found.</div>;
  }

  // Enable profile changes.
  function handleChange(e) {
    const { name, value } = e.target;
    setProfile(profile => ({ ...profile, [name]: value }));
  }

  // Update profile data in database upon submission.
  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.update({
      email: profile.email,
      data: {
        first_name: profile.firstName,
        last_name: profile.lastName,
      },
    });
    if (error) {
      alert('Error updating profile. Please try again.');
    } else {
      alert('You have successfully updated your profile.');
    }
  }

  // Render user interface using JSX/HTML.
  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className="text-center align-items-center">
        <input type="text" name="username" placeholder="Username" value={profile.username} onChange={handleChange} disabled/>
        <input type="text" name="firstName" placeholder="First Name" value={profile.firstName || ''} onChange={handleChange}/>
        <input type="text" name="lastName" placeholder="Last Name" value={profile.lastName || ''} onChange={handleChange}/>
        <input type="email" name="email" placeholder="Email" value={profile.email || ''} onChange={handleChange}/>
        <button type="submit">Edit Profile</button>
      </form>
    </div>
  );
}

export default Profile;
