import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar({ isAuthenticated, onLoginClick, onNavigateToLoginModal, onLogout }) {
  const location = useLocation();
  const isOnRegistrationPage = location.pathname === '/register';

  const handleLoginClick = () => {
    if (isOnRegistrationPage) {
      onNavigateToLoginModal();
    } else {
      onLoginClick();
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <div className="logo">LOGO</div>
      </Link>

      <div className="hero-buttons">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">
              <button className="btn-primary">Dashboard</button>
            </Link>
            <button onClick={onLogout} className="btn-secondary">Logout</button>
          </>
        ) : (
          <>
            <button onClick={handleLoginClick} className="btn-primary">Login</button>
            <Link to="/register">
              <button className="btn-secondary">Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
