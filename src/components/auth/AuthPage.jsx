import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthPage.module.css';
import { authApi, parentApi, sessionApi } from "../../services/api";
import Navbar from "../layout/Navbar";

const AuthPage = ({ mode = 'register' }) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(mode === 'register');

  React.useEffect(() => {
    document.title = isRegister ? "Register | CMPTNCY" : "Log In | CMPTNCY";
  }, [isRegister]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    parentEmail: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await authApi.getGoogleLoginUrl();
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.detail || 'Failed to initiate Google login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        // 1. Register
        const authRes = await authApi.register(formData.email, formData.password, formData.name, formData.parentEmail);
        const { user, session } = authRes.data;
        
        // Save tokens
        localStorage.setItem('access_token', session.access_token);
        localStorage.setItem('refresh_token', session.refresh_token);

        // 2. Optional Parent Invite
        if (formData.parentEmail) {
          try {
            await parentApi.invite(formData.parentEmail, user.id);
          } catch (pErr) {
            console.error('Parent invite failed', pErr);
            // Non-blocking error
          }
        }

        // 3. Anonymous Session Merge
        const anonymousId = localStorage.getItem('anonymous_id');
        if (anonymousId) {
          try {
            await sessionApi.merge(anonymousId, user.id);
            localStorage.removeItem('anonymous_id');
          } catch (mErr) {
            console.error('Session merge failed', mErr);
            // Non-blocking error
          }
        }

      } else {
        // Login
        const authRes = await authApi.login(formData.email, formData.password);
        const { session } = authRes.data;
        localStorage.setItem('access_token', session.access_token);
        localStorage.setItem('refresh_token', session.refresh_token);
      }

      // Success -> Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar className={styles.fixedNavbar} />
      
      <div className={styles.mainContent}>
        {/* Left Pane - Brand/Visuals */}
        <div className={styles.leftPane}>
          <div className={styles.floatingShape1}></div>
          <div className={styles.floatingShape2}></div>
          
          <div className={styles.leftContent}>
            {isRegister ? (
              <>
                <div className={styles.eyebrowLeft}>CREATE YOUR ACCOUNT</div>
                <h1 className={styles.leftHeadline}>
                  START YOUR<br />
                  <span className={styles.textOrange}>BOARD PREP.</span>
                </h1>
                <p className={styles.leftSub}>
                  Register for free to unlock your full diagnostic, track all 95 concepts, and start closing every gap.
                </p>

                <div className={styles.includesWrap}>
                  <div className={styles.includesEyebrow}>FREE ACCOUNT INCLUDES</div>
                  <ul className={styles.includesList}>
                    <li>
                      <strong>20Q board diagnostic</strong> — all 7 units, exact marks weighting
                    </li>
                    <li>
                      <strong>Readiness band + 7 unit scores</strong> — see exactly where you stand
                    </li>
                    <li>
                      <strong>Topic retests</strong> — practise only your weak concepts
                    </li>
                    <li>
                      <strong>Streaks + chapter badges</strong> — stay motivated through exam prep
                    </li>
                    <li>
                      <strong>Predicted score range</strong> — know where you stand before the boards
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className={styles.eyebrowLeft}>WELCOME BACK</div>
                <h1 className={styles.leftHeadline}>
                  RESUME YOUR<br />
                  <span className={styles.textOrange}>LEARNING.</span>
                </h1>
                <p className={styles.leftSub}>
                  Log in to continue tracking your progress and mastering board concepts.
                </p>
              </>
            )}
          </div>
        </div>

      {/* Right Pane - Form */}
      <div className={styles.rightPane}>
        <div className={styles.contentContainer}>
          <div className={styles.page}>
            <div className={styles.formHeader}>
              <div className={styles.eyebrow}>{isRegister ? 'Create your account' : 'Welcome back'}</div>
              <h2 className={styles.formTitle}>{isRegister ? 'Register' : 'Log In'}</h2>
            </div>

            <div className={styles.formBody}>
              <button className={styles.googleBtn} type="button" onClick={handleGoogleLogin}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
                </svg>
                Continue with Google
              </button>

              <div className={styles.divider}>
                <div className={styles.divLine}></div>
                <div className={styles.divText}>or {isRegister ? 'register' : 'login'} with email</div>
                <div className={styles.divLine}></div>
              </div>

              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <div className={styles.field}>
                    <div className={styles.fl}>Your name</div>
                    <input 
                      className={styles.fi} 
                      placeholder="e.g. Rahul Sharma" 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={isRegister}
                    />
                  </div>
                )}
                
                <div className={styles.field}>
                  <div className={styles.fl}>Email address</div>
                  <input 
                    className={styles.fi} 
                    placeholder="rahul@email.com" 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <div className={styles.fl}>Password</div>
                  <input 
                    className={styles.fi} 
                    placeholder="At least 8 characters" 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div className={styles.fh}>Used to log back in and access your results.</div>
                </div>

                {isRegister && (
                  <div className={styles.parentSection}>
                    <div className={styles.parentLabel}>
                      Want to keep a parent updated?
                      <span className={styles.optPill}>Optional</span>
                    </div>
                    <input 
                      className={styles.parentInput} 
                      placeholder="parent@email.com" 
                      type="email" 
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                    />
                    <div className={styles.parentHint}>They'll get a read-only view of how you're doing.</div>
                  </div>
                )}

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.formSubmit}>
                  <button className={styles.submitBtn} type="submit" disabled={loading}>
                    {loading ? 'Processing...' : (isRegister ? 'Create free account' : 'Log in to account')}
                  </button>
                  {isRegister && <div className={styles.submitNote}>Free forever · No credit card required</div>}
                </div>
              </form>

              <div className={styles.formFooter}>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span onClick={() => setIsRegister(!isRegister)}>
                  {isRegister ? 'Log in' : 'Register free'}
                </span>
              </div>
            </div>

            <div className={styles.privacy}>
              By {isRegister ? 'registering' : 'logging in'} you agree to our Terms of Service and Privacy Policy. Your data is never sold or shared with third parties.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AuthPage;
