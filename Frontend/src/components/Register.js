import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import '../Auth.css';
import fitARImage from '../fitAR.jpg'; // Import the image

function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long and include at least one letter, one digit, and one special character.');
      return;
    }

    const newUser = {
      name,
      phone,
      email,
      password
    };

    try {
      const response = await axios.post('http://localhost:5000/auth/register', newUser);
      if (response.data.success) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert('Registration failed: ' + response.data.message);
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('An error occurred during registration: ' + (err.response ? err.response.data.message : 'Network Error'));
    }
  };

  const validateName = (name) => {
    return name.trim() !== '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|somaiya\.edu)$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setError((prev) => ({
      ...prev,
      name: !validateName(value) ? 'Name is required.' : ''
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setError((prev) => ({
      ...prev,
      phone: !validatePhone(value) ? 'Phone must be 10 digits.' : ''
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError((prev) => ({
      ...prev,
      email: !validateEmail(value) ? "Please include '@gmail.com' or '@somaiya.edu' in the email address." : ''
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError((prev) => ({
      ...prev,
      password: !validatePassword(value) ? 'Password must be at least 8 alphanumeric characters with at least 1 special character.' : ''
    }));
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleBlur = (field, value, validateFunc) => {
    setError((prev) => ({
      ...prev,
      [field]: !validateFunc(value) ? `${field.charAt(0).toUpperCase() + field.slice(1)} is invalid.` : ''
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-image-section">
        <img src={fitARImage} alt="Register Visual" />
        </div>
      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            onBlur={() => handleBlur('name', name, validateName)}
            className={error.name ? 'error' : name ? 'success' : ''}
            required
            data-error={error.name}
          />
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={() => handleBlur('phone', phone, validatePhone)}
            className={error.phone ? 'error' : phone ? 'success' : ''}
            required
            data-error={error.phone}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur('email', email, validateEmail)}
            className={error.email ? 'error' : email ? 'success' : ''}
            required
            data-error={error.email}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur('password', password, validatePassword)}
            className={error.password ? 'error' : password ? 'success' : ''}
            required
            data-error={error.password}
          />
          <div className="terms">
            <input type="checkbox" checked={termsAccepted} onChange={handleTermsChange} required />
            <span>
              I agree to
              <Link to="/terms" className="link"> Platform's Terms of Service</Link> and 
              <Link to="/privacy" className="link"> Privacy Policy</Link>.
            </span>
          </div>
          <button type="submit">Register</button>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
