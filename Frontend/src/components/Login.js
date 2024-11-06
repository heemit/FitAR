import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Auth.css';
import fitARImage from '../fitAR.jpg'; // Import the image
import axios from 'axios'; // Import axios for API calls

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', email);

        toast.success("Login successful!", {
          onClose: () => {
            setTimeout(() => {
              navigate('/profile', { replace: true });
            }, 1010);
          },
          autoClose: 1000,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      <div className="auth-image-section">
        <img src={fitARImage} alt="Login Visual" />
      </div>
      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">Login</button>
          <p>New user? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
