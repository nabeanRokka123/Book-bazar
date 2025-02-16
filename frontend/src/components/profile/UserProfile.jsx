// UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data on component mount
    axios.get('/api/users/me')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/users/me', user)
      .then(response => alert('Profile updated successfully'))
      .catch(error => console.error('Error updating profile:', error));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={user.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={user.email} onChange={handleChange} />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserProfile;
