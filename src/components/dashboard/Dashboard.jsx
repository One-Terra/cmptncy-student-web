import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // Decode JWT payload (standard Supabase JWT)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decoded = JSON.parse(jsonPayload);
      setUser(decoded);
    } catch (e) {
      console.error('Failed to decode token', e);
      localStorage.removeItem('access_token');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '60px 40px', textAlign: 'center', fontFamily: 'Inter, system-ui, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#E8572A', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
          Verification Success
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#0D1B2A' }}>
          Welcome back, {user?.email?.split('@')[0] || 'Student'}!
        </h1>
        <div style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.5)', display: 'inline-block' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Logged in as: <strong style={{ color: '#0f172a' }}>{user?.email || 'Loading...'}</strong>
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.5)', textAlign: 'left', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>📊</div>
          <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '8px' }}>Progress Tracking</div>
          <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Track your concept mastery and see how far you've come. Analyze your strengths and weaknesses.</div>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.5)', textAlign: 'left', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🧠</div>
          <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '8px' }}>Diagnostic Assessment</div>
          <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Resume your board prep and identify areas where you need to focus your studies before the exam.</div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: 'none',
          color: '#ef4444',
          border: '1px solid #fee2e2',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '14px',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'none'; }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
