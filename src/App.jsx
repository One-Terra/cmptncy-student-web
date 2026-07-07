import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import AuthPage from './components/auth/AuthPage';
import AuthCallback from './components/auth/AuthCallback';
import Dashboard from './components/dashboard/Dashboard';
import ParentPage from './components/parent/ParentPage';
import DiagnosticIntro from './components/diagnostic/DiagnosticIntro';
import DiagnosticTest from './components/diagnostic/DiagnosticTest';
import DiagnosticResults from './components/diagnostic/DiagnosticResults';
import ReviewAnswers from './components/diagnostic/ReviewAnswers';
import ContactPage from './components/contact/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/parent-nomination" element={<ParentPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/diagnostic-intro" element={<DiagnosticIntro />} />
        <Route path="/diagnostic" element={<DiagnosticTest />} />
        <Route path="/diagnostic-results" element={<DiagnosticResults />} />
        <Route path="/review-answers" element={<ReviewAnswers />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
