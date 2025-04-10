export const USER_ROLES = {
  ADMIN: 'ADMIN',
  COORDINATOR: 'COORDINATOR',
  MENTOR: 'MENTOR',
  STUDENT: 'STUDENT',
};

export const DOCUMENT_TYPES = {
  REVIEW_FORM: 'REVIEW_FORM',
  PAPER_FORMAT: 'PAPER_FORMAT',
  REPORT_FORMAT: 'REPORT_FORMAT',
  PRESENTATION_TEMPLATE: 'PRESENTATION_TEMPLATE',
  PAPER: 'PAPER',
  REPORT: 'REPORT',
};

export const REVIEW_TYPES = {
  FIRST: 'FIRST',
  SECOND: 'SECOND',
  THIRD: 'THIRD',
  FINAL: 'FINAL',
};

export const PAPER_STATUS = {
  SUBMITTED: 'SUBMITTED',
  APPROVED: 'APPROVED',
  PUBLISHED: 'PUBLISHED',
  REJECTED: 'REJECTED',
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export const validateFileType = (file, allowedTypes) => {
  const fileType = file.name.split('.').pop().toLowerCase();
  return allowedTypes.includes(fileType);
};

export const validateFileSize = (file, maxSizeMB) => {
  const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
  return file.size <= maxSize;
};

export const getErrorMessage = (error) => {
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (typeof error.response?.data === 'string') {
    return error.response.data;
  }
  return 'An unexpected error occurred. Please try again.';
};
