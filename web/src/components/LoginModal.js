import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/LoginModal.css';

function LoginModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Login submitted:', formData);
      alert('Login successful!');
      setFormData({ username: '', password: '' });
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'login-modal-backdrop') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-backdrop" onClick={handleBackdropClick}>
      <div className="login-modal">
        <div className="modal-header">
          <h2>Login</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username or email"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="modal-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-login">Login</button>
        </form>

        <div className="modal-footer">
          <p>Don't have an account? 
            <Link to="/register" onClick={onClose} className="register-link"> Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
