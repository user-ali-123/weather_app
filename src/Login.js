import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  // ✅ Auto-redirect if user already exists in localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      navigate('/Weather');
    }
  }, [formData]);

  // Handle input changes
  const changeval = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Login or register logic
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      // First time: Register and redirect
      localStorage.setItem('user', JSON.stringify(formData));
      alert('User registered successfully!');
      navigate('/Weather');
    } else {
      // Returning user: Validate credentials
      if (
        storedUser.username === formData.username &&
        storedUser.password === formData.password
      ) {
        navigate('/Weather');
      } else {
        alert('Invalid username or password!');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>
      <h2 id="login-style">Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={changeval}
        className="login-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={changeval}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
};

export default Login;
