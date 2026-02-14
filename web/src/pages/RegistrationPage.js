import { useState } from 'react';
import '../css/RegistrationPage.css';
import { registerUser } from '../services/api';

function RegistrationPage({ onNavigateToLoginModal }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.com');
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('One number');
    if (!/[!@#$%^&*]/.test(password)) errors.push('One special character (!@#$%^&*)');
    return errors;
  };

  const calculatePasswordStrength = (password) => {
    const requirements = validatePassword(password);
    const strength = 5 - requirements.length;
    if (strength <= 1) return 'weak';
    if (strength === 2 || strength === 3) return 'medium';
    return 'strong';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email must contain @ and .com';
    }

    // Validate password
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = `Password must have: ${passwordErrors.join(', ')}`;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid - submit to backend
      try {
        await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        alert('Registration successful!');
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      } catch (err) {
        const message = err && (err.message || err.error || err.msg) ? (err.message || err.error || err.msg) : 'Registration failed';
        setErrors({ form: message });
      }
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-form">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              required 
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email (must include @ and .com)"
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter a strong password"
              value={formData.password}
              onChange={handleInputChange}
              required 
            />
            {formData.password && (
              <div className={`password-strength ${passwordStrength}`}>
                Strength: <strong>{passwordStrength}</strong>
              </div>
            )}
            {errors.password && <span className="error-message">{errors.password}</span>}
            {!errors.password && formData.password && (
              <div className="password-requirements">
                <p className="requirements-label">Password must contain:</p>
                <ul>
                  <li className={/[A-Z]/.test(formData.password) ? 'met' : ''}>At least one uppercase letter (A-Z)</li>
                  <li className={/[a-z]/.test(formData.password) ? 'met' : ''}>At least one lowercase letter (a-z)</li>
                  <li className={/[0-9]/.test(formData.password) ? 'met' : ''}>At least one number (0-9)</li>
                  <li className={formData.password.length >= 8 ? 'met' : ''}>At least 8 characters</li>
                  <li className={/[!@#$%^&*]/.test(formData.password) ? 'met' : ''}>At least one special character (!@#$%^&*)</li>
                </ul>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required 
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="password-mismatch">
                ⚠️ Passwords do not match
              </div>
            )}
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <div className="password-match">
                ✓ Passwords match
              </div>
            )}
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn-register">Create Account</button>
        </form>
        <button 
          type="button" 
          className="login-link" 
          onClick={onNavigateToLoginModal}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default RegistrationPage;
