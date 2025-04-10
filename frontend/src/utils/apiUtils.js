import { getErrorMessage } from './constants';
import api from '../services/api';

// Function to handle API requests
export const handleApiRequest = async (requestFunc, params) => {
  try {
    const response = await requestFunc(params);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// Function to handle file uploads
export const handleFileUpload = async (fileUploadFunc, file) => {
  try {
    const response = await fileUploadFunc(file);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// Function to handle authentication
export const handleAuth = async (authFunc, credentials) => {
  try {
    const response = await authFunc(credentials);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// Function to handle user profile retrieval
export const getUserProfile = async () => {
  return handleApiRequest(api.authAPI.getUserProfile);
};

// Function to handle login
export const loginUser = async (credentials) => {
  return handleAuth(api.authAPI.login, credentials);
};

// Function to handle logout
export const logoutUser = async () => {
  return handleApiRequest(api.authAPI.logout);
};

// Function to handle refreshing token
export const refreshUserToken = async () => {
  return handleApiRequest(api.authAPI.refreshToken);
};

// Function to handle uploading documents
export const uploadDocument = async (file) => {
  return handleFileUpload(api.studentAPI.uploadDocument, file);
};

// Function to handle sharing conference links
export const shareConferenceLink = async (data) => {
  return handleApiRequest(api.mentorAPI.shareConferenceLink, data);
};

// Function to handle updating links
export const updateLinks = async (data) => {
  return handleApiRequest(api.studentAPI.updateLinks, data);
};
