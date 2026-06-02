// Mock API implementation for frontend testing (Backend disabled)
export const authApi = {
  register: async (email, password) => {
    console.log('Mock register:', email);
    return { data: { user: { id: 'mock_user' }, session: { access_token: 'mock_token', refresh_token: 'mock_refresh' } } };
  },
  login: async (email, password) => {
    console.log('Mock login:', email);
    return { data: { session: { access_token: 'mock_token', refresh_token: 'mock_refresh' } } };
  },
  getGoogleLoginUrl: async () => {
    return { data: { url: '/' } };
  },
  exchangeCode: async (code) => {
    return { data: {} };
  }
};

export const parentApi = {
  invite: async (parentEmail, studentId) => {
    console.log('Mock parent invite:', parentEmail);
    return { data: {} };
  }
};

export const sessionApi = {
  checkEligibility: async (anonymousId) => {
    return { data: { eligible: true } };
  },
  merge: async (anonymousSessionId, newStudentId) => {
    console.log('Mock session merge');
    return { data: {} };
  }
};

export default {}; // mock apiClient
