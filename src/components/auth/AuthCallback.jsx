import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from "../../services/api";

const AuthCallback = () => {
  const navigate = useNavigate();
  const hasExchanged = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent double execution in React StrictMode
      if (hasExchanged.current) return;
      
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');

      if (code) {
        hasExchanged.current = true;
        try {
          console.log('Exchanging code for session...');
          const response = await authApi.exchangeCode(code);
          const { session } = response.data;
          
          if (session) {
            localStorage.setItem('access_token', session.access_token);
            localStorage.setItem('refresh_token', session.refresh_token);
            navigate('/dashboard');
            return;
          }
        } catch (err) {
          console.error('Failed to exchange code:', err);
          // If it fails with 400, it might be because the code was already used
          // or expired. Check if we already have a session.
          if (localStorage.getItem('access_token')) {
            navigate('/dashboard');
            return;
          }
          navigate('/login');
          return;
        }
      }

      // Fallback: Check for tokens in URL hash (Implicit flow)
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
          navigate('/dashboard');
          return;
        }
      }

      // If no code and no tokens, handle error or redirect
      const error = queryParams.get('error');
      if (error) {
        console.error('Auth error:', error);
      }
      
      // If we are already logged in, just go to dashboard
      if (localStorage.getItem('access_token')) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
      <div className="spinner"></div>
      <p>Completing login...</p>
      <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4285F4;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AuthCallback;
