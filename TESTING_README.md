# Unit Testing Documentation

## Overview

This document describes the unit testing setup for the TasksApiService class in the DexSandro Frontend application.

## Test Framework

- **Jest**: Primary testing framework (configured with Create React App)
- **@testing-library/jest-dom**: Additional Jest matchers for better assertions
- **React Scripts**: Provides the testing environment configuration

## Test Structure

### File Organization
```
src/
├── services/
│   ├── __tests__/
│   │   └── tasksApi.service.test.js    # Main test file
│   ├── __mocks__/                      # Manual mocks (not in use)
│   └── tasksApi.service.js             # Service under test
├── utils/
│   ├── __mocks__/
│   │   ├── httpClient.js               # Mock HTTP client
│   │   └── errorHandler.js             # Mock error handler
│   ├── httpClient.js                   # Real HTTP client
│   └── errorHandler.js                 # Real error handler
└── setupTests.js                       # Jest setup configuration
```

## Test Coverage

Current test coverage for `tasksApi.service.js`:
- **Statements**: 85.71%
- **Branches**: 72.72%
- **Functions**: 100%
- **Lines**: 85.41%

## Tested Methods

### ✅ Fully Tested
1. **getAllTasks()** - Fetches all tasks with sorting
2. **getTaskById(id)** - Fetches a specific task
3. **createTask(taskData)** - Creates a new task with validation
4. **updateTask(id, data)** - Updates an existing task
5. **toggleTask(id, completed)** - Toggles task completion status
6. **deleteTask(id)** - Deletes a task
7. **getTaskStats()** - Calculates task statistics

### Test Scenarios Covered

#### API Interactions
- ✅ Successful API calls
- ✅ API error handling
- ✅ Correct endpoint usage
- ✅ Proper parameter passing

#### Data Processing
- ✅ Text trimming in task creation
- ✅ Default value assignment
- ✅ Statistics calculation
- ✅ Task sorting logic

#### Validation
- ✅ Empty text validation
- ✅ Invalid task ID validation
- ✅ Required field validation

#### Error Handling
- ✅ Network error propagation
- ✅ Validation error throwing
- ✅ Error message formatting

## Mock Strategy

### HTTP Client Mock
```javascript
const httpClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
};
```

### Error Handler Mock
```javascript
export const handleError = jest.fn((error) => error.message);
```

### API Config Mock
```javascript
jest.mock('../../config/api.config', () => ({
  ENDPOINTS: {
    TASKS: '/api/Tasks'
  }
}));
```

## Running Tests

### Available Commands

```bash
# Run tests once
npm test -- --watchAll=false

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Run tests in watch mode
npm run test:watch

# Run tests for CI
npm run test:ci
```

### Test Output Example
```
 PASS  src/services/__tests__/tasksApi.service.test.js
  TasksApiService
    getAllTasks
      ✓ should return tasks from API
      ✓ should return empty array when API returns null
      ✓ should handle API errors
    createTask
      ✓ should create a new task successfully
      ✓ should trim whitespace from task text
      ✓ should validate empty task text
    ... (all tests passing)

Test Suites: 1 passed, 1 total
Tests:       14 passed, 14 total
```

## Best Practices Implemented

### 1. **Isolation**
- Each test is independent
- Mocks are cleared between tests
- No test depends on another test's outcome

### 2. **Clear Naming**
- Descriptive test names that explain what is being tested
- Grouped tests by method using `describe` blocks
- Action-based test descriptions

### 3. **Comprehensive Coverage**
- Happy path scenarios
- Error conditions
- Edge cases
- Validation scenarios

### 4. **Maintainability**
- Simple test structure
- Minimal setup required
- Easy to understand assertions

### 5. **Mock Management**
- Centralized mock configuration
- Realistic mock behavior
- Proper mock cleanup

## Future Enhancements

### Potential Improvements
1. **Integration Tests**: Add tests that verify the service works with real HTTP calls
2. **Performance Tests**: Add tests for large datasets
3. **Boundary Testing**: More extensive edge case coverage
4. **Error Scenarios**: More specific error condition testing

### Test Data Management
Consider adding:
- Test data factories for consistent test objects
- Shared test utilities for common operations
- More sophisticated mock scenarios

## Debugging Tests

### Common Issues and Solutions

1. **Mock not working**: Ensure mock path matches the import path exactly
2. **Async test failures**: Always use `await` with async operations
3. **Coverage issues**: Check that all code paths are exercised

### Debug Commands
```bash
# Run specific test file
npm test tasksApi.service.test.js

# Run with verbose output
npm test -- --verbose

# Debug with Node inspector
node --inspect-brk scripts/test.js --runInBand --no-cache
```

## Dependencies

### Required Packages
```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "jest-environment-jsdom": "^30.2.0"
  }
}
```

### Automatic Dependencies (via React Scripts)
- Jest
- Testing environment
- Babel transformations
- Module resolution

## Conclusion

The unit tests provide comprehensive coverage of the TasksApiService class, ensuring reliability and maintainability. The test suite is designed to be fast, reliable, and easy to understand, following Jest and React testing best practices.