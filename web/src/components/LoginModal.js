import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/LoginModal.css';
import AlertMessage from './AlertMessage';
import { loginUser, setAuthSession } from '../services/api';

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (serverMessage) {
      setServerMessage(null);
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setServerMessage(null);

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Username or email is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const authData = await loginUser({
          identifier: formData.identifier,
          password: formData.password,
        });

        setAuthSession(authData);
        setFormData({ identifier: '', password: '' });
        setErrors({});
        setServerMessage({
          type: 'success',
          title: 'Success',
          text: 'Login successful.'
        });

        if (onLoginSuccess) {
          onLoginSuccess(authData);
        }

        onClose();
      } catch (err) {
        const message = err?.message || 'Login failed';
        setServerMessage({
          type: 'error',
          title: 'Error',
          text: message
        });
      }
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'login-modal-backdrop') {
      onClose();
    }
  };

  const handleBackdropKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="login-modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Close login modal backdrop"
    >
      <div className="login-modal">
        <div className="modal-header">
          <h2>Login</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <AlertMessage
          message={serverMessage}
          onClose={() => setServerMessage(null)}
          dismissAfter={serverMessage?.type === 'success' ? 2500 : 0}
        />

        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label htmlFor="identifier">Username or Email</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              placeholder="Enter your username or email"
              value={formData.identifier}
              onChange={handleInputChange}
              required
            />
            {errors.identifier && <span className="error-message">{errors.identifier}</span>}
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

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func,
};

export default LoginModal;
