/**
 * Mock Error Handler for Testing
 */

export const handleError = jest.fn((error, context) => {
  // Return the original error message for testing purposes
  return error.message;
});