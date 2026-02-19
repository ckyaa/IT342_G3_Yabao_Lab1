import '../css/DashboardPage.css';
import PropTypes from 'prop-types';

function DashboardPage({ email, onLogout }) {
  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <p className="dashboard-welcome">You are logged in.</p>
        <p className="dashboard-email">Signed in as: <strong>{email || 'Unknown user'}</strong></p>
        <button type="button" className="dashboard-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

DashboardPage.propTypes = {
  email: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default DashboardPage;