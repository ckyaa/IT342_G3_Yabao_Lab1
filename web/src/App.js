import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';

function AppContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const navigateToLoginModal = () => {
    navigate('/');
    setTimeout(() => {
      setIsLoginModalOpen(true);
    }, 300);
  };

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <Navbar onLoginClick={openLoginModal} onNavigateToLoginModal={navigateToLoginModal} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage onNavigateToLoginModal={navigateToLoginModal} />} />
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
