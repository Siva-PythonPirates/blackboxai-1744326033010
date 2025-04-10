import axios from 'axios';
import store from '../store/store';
import { refreshToken, logout } from '../store/slices/authSlice';

const API_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await store.dispatch(refreshToken());
        const state = store.getState();
        const newToken = state.auth.accessToken;
        
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/accounts/token/', credentials),
  register: (userData) => api.post('/accounts/register/', userData),
  refreshToken: (refresh) => api.post('/accounts/token/refresh/', { refresh }),
  getUserProfile: () => api.get('/accounts/me/'),
};

// Admin API calls
export const adminAPI = {
  uploadProjects: (file) => {
    const formData = new FormData();
    formData.append('excel_file', file);
    return api.post('/learning/projects/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  assignTeams: (data) => api.post('/learning/teams/assign/', data),
  scheduleReview: (data) => api.post('/learning/reviews/schedule/', data),
  uploadTemplate: (type, file) => {
    const formData = new FormData();
    formData.append('document_type', type);
    formData.append('file', file);
    return api.post('/learning/documents/upload-template/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Coordinator API calls
export const coordinatorAPI = {
  getTeams: () => api.get('/learning/teams/'),
  submitReviewFeedback: (reviewId, feedback) => 
    api.post(`/learning/reviews/${reviewId}/feedback/`, { feedback }),
  updatePaperStatus: (statusId, status) =>
    api.post(`/learning/paper-statuses/${statusId}/update/`, { status }),
  getStudentRequests: () => api.get('/learning/paper-statuses/requests/'),
};

// Mentor API calls
export const mentorAPI = {
  getMentoredTeams: () => api.get('/learning/teams/mentored/'),
  shareConferenceLink: (data) => api.post('/learning/conference-links/', data),
  submitReviewFeedback: (reviewId, feedback) =>
    api.post(`/learning/reviews/${reviewId}/feedback/`, { feedback }),
};

// Student API calls
export const studentAPI = {
  createTeam: (teammateId) => api.post('/learning/teams/', { teammate_id: teammateId }),
  updateLinks: (data) => api.put('/learning/teams/links/', data),
  uploadDocument: (type, file) => {
    const formData = new FormData();
    formData.append('document_type', type);
    formData.append('file', file);
    return api.post('/learning/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  requestStatusUpdate: (data) => api.post('/learning/paper-statuses/request/', data),
  getConferenceLinks: () => api.get('/learning/conference-links/'),
};

export default api;
