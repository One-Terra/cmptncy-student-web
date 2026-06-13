import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000/api/v1'
    : 'http://47.128.223.246:8000/api/v1');


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to format errors nicely
apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Normalize FastAPI error format ("detail") to standard "message" for frontend compatibility
  if (error.response?.data?.detail) {
    error.response.data.message = error.response.data.detail;
  }
  return Promise.reject(error);
});

export const authApi = {
  register: async (email, password, name, parentEmail) => {
    return apiClient.post('/auth/register', {
      email,
      password,
      name: name || undefined,
      parent_email: parentEmail || undefined
    });
  },
  login: async (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },
  getGoogleLoginUrl: async () => {
    return apiClient.get('/auth/google/login');
  },
  exchangeCode: async (code) => {
    return apiClient.post('/auth/callback', { code });
  }
};

export const parentApi = {
  invite: async (parentEmail, studentId) => {
    return apiClient.post('/parents/invite', {
      parent_email: parentEmail,
      student_id: studentId
    });
  }
};

export const sessionApi = {
  checkEligibility: async (anonymousId) => {
    return apiClient.get(`/sessions/check-eligibility/${anonymousId}`);
  },
  merge: async (anonymousSessionId, newStudentId) => {
    return apiClient.post('/sessions/merge', {
      anonymous_session_id: anonymousSessionId,
      new_student_id: newStudentId
    });
  }
};

export default apiClient;
