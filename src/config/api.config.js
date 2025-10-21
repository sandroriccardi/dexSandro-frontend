/**
 * API Configuration
 * Centralizes all API-related configuration settings
 */

const API_CONFIG = {
  // Base API URL
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5135',
  
  // API endpoints
  ENDPOINTS: {
    TASKS: '/api/Tasks'
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

  DEFAULTS: {
    TASK_TITLE: 'New Task',
    DUE_DATE_OFFSET_MS: 24 * 60 * 60 * 1000, // 24 hours
  },
  
  // HTTP status codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  }
};

export default API_CONFIG;