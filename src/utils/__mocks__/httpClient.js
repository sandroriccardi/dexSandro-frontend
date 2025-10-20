/**
 * Mock HTTP Client for Testing
 */

const httpClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn()
};

export default httpClient;