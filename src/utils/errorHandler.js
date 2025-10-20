/**
 * Error Handling Utilities
 * Provides standardized error handling and logging
 */

import { ApiError } from './httpClient.js';

/**
 * Error types for categorization
 */
export const ERROR_TYPES = {
  NETWORK: 'NETWORK',
  API: 'API',
  VALIDATION: 'VALIDATION',
  UNKNOWN: 'UNKNOWN'
};

/**
 * Get error type from error object
 * @param {Error} error - Error object
 * @returns {string} - Error type
 */
export const getErrorType = (error) => {
  if (error instanceof ApiError) {
    if (error.status === 0) {
      return ERROR_TYPES.NETWORK;
    }
    return ERROR_TYPES.API;
  }
  
  if (error.name === 'ValidationError') {
    return ERROR_TYPES.VALIDATION;
  }
  
  return ERROR_TYPES.UNKNOWN;
};

/**
 * Get user-friendly error message
 * @param {Error} error - Error object
 * @returns {string} - User-friendly message
 */
export const getUserFriendlyMessage = (error) => {
  const errorType = getErrorType(error);
  
  switch (errorType) {
    case ERROR_TYPES.NETWORK:
      return 'Unable to connect to the server. Please check your internet connection.';
    
    case ERROR_TYPES.API:
      if (error.status >= 500) {
        return 'Server error occurred. Please try again later.';
      }
      if (error.status === 404) {
        return 'The requested resource was not found.';
      }
      if (error.status >= 400) {
        return error.message || 'Invalid request. Please check your input.';
      }
      return error.message || 'An error occurred while processing your request.';
    
    case ERROR_TYPES.VALIDATION:
      return error.message || 'Please check your input and try again.';
    
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

/**
 * Log error for debugging and monitoring
 * @param {Error} error - Error object
 * @param {object} context - Additional context
 */
export const logError = (error, context = {}) => {
  const errorInfo = {
    message: error.message,
    type: getErrorType(error),
    timestamp: new Date().toISOString(),
    context
  };

  if (error instanceof ApiError) {
    errorInfo.status = error.status;
    errorInfo.data = error.data;
  }

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('Error occurred:', errorInfo);
    console.error('Stack trace:', error.stack);
  }

  // In production, you would send this to your logging service
  // Example: sendToLoggingService(errorInfo);
};

/**
 * Handle error with logging and user notification
 * @param {Error} error - Error object
 * @param {object} context - Additional context
 * @returns {string} - User-friendly message
 */
export const handleError = (error, context = {}) => {
  logError(error, context);
  return getUserFriendlyMessage(error);
};