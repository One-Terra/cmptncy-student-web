import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import AuthCallback from './components/AuthCallback';
import Dashboard from './components/Dashboard';
import ParentPage from './components/ParentPage';
import DiagnosticIntro from './components/DiagnosticIntro';
import DiagnosticTest from './components/DiagnosticTest';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/parent-nomination" element={<ParentPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/diagnostic-intro" element={<DiagnosticIntro />} />
        <Route path="/diagnostic" element={<DiagnosticTest />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
