import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Profile.css';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('userEmail'); // Retrieve email from local storage
      if (!email) {
        navigate('/login'); // Redirect if no email found
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/auth/profile?email=${email}`);
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone,
          address1: response.data.user.address1 || '',
          address2: response.data.user.address2 || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail'); // Clear email on logout
    navigate('/login');
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem('userEmail'); // Retrieve email if needed for backend identification
  
      const updatedData = { ...formData, email }; // Include email only if required by the backend
  
      await axios.put('http://localhost:5000/auth/profile', updatedData, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Uncomment if you need to send an authorization token
        },
      });
  
      setUser(formData); // Update the user data displayed on the page
      setEditing(false); // Disable edit mode
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">My Profile</h1>
        <div className="profile-section">
          <h2 className="section-title">Profile Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="profile-details">
              <label>
                <strong>Name:</strong>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user.name}</span>
                )}
              </label>
              <br />
              <label>
                <strong>Email:</strong>
                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </label>
              <br />
              <label>
                <strong>Phone:</strong>
                {editing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user.phone}</span>
                )}
              </label>
              <br />
            </div>
            {editing && (
              <button type="submit" className="save-btn">Save Changes</button>
            )}
          </form>
          <button className="edit-btn" onClick={handleEditToggle}>
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
