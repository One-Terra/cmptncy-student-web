import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add Supabase token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (email, password) => 
    apiClient.post('/auth/register', { email, password }),
  
  login: (email, password) => 
    apiClient.post('/auth/login', { email, password }),
  
  getGoogleLoginUrl: () => 
    apiClient.get('/auth/google/login'),
  
  exchangeCode: (code) =>
    apiClient.post('/auth/callback', { code }),
};

export const parentApi = {
  invite: (parentEmail, studentId) => 
    apiClient.post('/parents/invite', { 
      parent_email: parentEmail, 
      student_id: studentId 
    }),
};

export const sessionApi = {
  checkEligibility: (anonymousId) => 
    apiClient.get(`/sessions/check-eligibility/${anonymousId}`),
  
  merge: (anonymousSessionId, newStudentId) => 
    apiClient.post('/sessions/merge', { 
      anonymous_session_id: anonymousSessionId, 
      new_student_id: newStudentId 
    }),
};

export default apiClient;
