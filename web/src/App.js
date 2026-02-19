import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import { clearAuthSession, getAuthEmail, isAuthenticated as checkIsAuthenticated } from './services/api';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());
  const [authEmail, setAuthEmail] = useState(getAuthEmail());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleLoginSuccess = (authData) => {
    setIsAuthenticated(true);
    setAuthEmail(authData?.email || getAuthEmail());
    navigate('/dashboard');
  };

  const handleLogout = () => {
    clearAuthSession();
    setIsAuthenticated(false);
    setAuthEmail('');
    navigate('/');
  };

  const navigateToLoginModal = () => {
    navigate('/');
    setTimeout(() => {
      setIsLoginModalOpen(true);
    }, 300);
  };

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />
      <Navbar
        isAuthenticated={isAuthenticated}
        onLoginClick={openLoginModal}
        onNavigateToLoginModal={navigateToLoginModal}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage onNavigateToLoginModal={navigateToLoginModal} />} />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardPage email={authEmail} onLogout={handleLogout} />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
