import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ApplicationList from './components/ApplicationList';
import Dashboard from './components/Dashboard';
import './App.css';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📋 Job Tracker
        </Link>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Applications
          </Link>
          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

const AppContent = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<ApplicationList key={refreshKey} onRefresh={handleRefresh} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard key={refreshKey} />}
          />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
