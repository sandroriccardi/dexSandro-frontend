# API Integration Documentation

This document describes the API integration implementation for the Tasks application, following corporate standards and best practices.

## Architecture Overview

The API integration is organized into several layers to ensure maintainability, testability, and separation of concerns:

```
src/
├── config/
│   └── api.config.js           # API configuration and constants
├── services/
│   ├── index.js                # Services barrel export
│   └── tasksApi.service.js     # Tasks API service
├── utils/
│   ├── httpClient.js           # HTTP client utility with error handling
│   └── errorHandler.js         # Centralized error handling
├── hooks/
│   ├── index.js                # Hooks barrel export
│   └── useTasks.js             # Custom hook for tasks state management
└── components/
    └── Tasks.js                # Updated component using the API
```

## Configuration

### API Configuration (`src/config/api.config.js`)
Centralizes all API-related configuration:
- Base URL (configurable via environment variables)
- API endpoints
- HTTP status codes
- Default headers
- Request timeout settings

### Environment Variables
Create a `.env` file in the project root:
```
REACT_APP_API_BASE_URL=http://localhost:5135
```

## Services Layer

### HTTP Client (`src/utils/httpClient.js`)
A robust HTTP client that provides:
- Standardized request methods (GET, POST, PUT, DELETE)
- Request timeout handling
- Automatic JSON parsing
- Comprehensive error handling
- Custom `ApiError` class for structured error information

### Tasks API Service (`src/services/tasksApi.service.js`)
Encapsulates all tasks-related API operations:
- `getAllTasks()` - Fetch all tasks
- `getTaskById(id)` - Fetch a specific task
- `createTask(data)` - Create a new task
- `updateTask(id, data)` - Update an existing task
- `toggleTask(id, completed)` - Toggle task completion status
- `deleteTask(id)` - Delete a task
- `getTaskStats()` - Get task statistics

## Error Handling

### Error Utilities (`src/utils/errorHandler.js`)
Provides centralized error handling:
- Error type categorization (NETWORK, API, VALIDATION, UNKNOWN)
- User-friendly error messages
- Error logging for debugging and monitoring
- Context-aware error handling

### Error Types
- **Network Errors**: Connection issues, timeouts
- **API Errors**: HTTP status-based errors (4xx, 5xx)
- **Validation Errors**: Client-side validation failures
- **Unknown Errors**: Unexpected errors

## State Management

### Custom Hook (`src/hooks/useTasks.js`)
Provides a clean interface for managing tasks state:
- Automatic data fetching on component mount
- Loading states for different operations
- Error state management
- Optimistic UI updates
- Task statistics calculation

### Hook API
```javascript
const {
  // State
  tasks,
  loading,
  error,
  isLoading,
  isCreating,
  isUpdating,
  isDeleting,
  
  // Operations
  addTask,
  toggleTask,
  updateTask,
  deleteTask,
  loadTasks,
  clearError,
  getTaskStats
} = useTasks();
```

## API Endpoints

The service expects the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/Tasks` | Get all tasks |
| GET | `/api/Tasks/{id}` | Get task by ID |
| POST | `/api/Tasks` | Create new task |
| PUT | `/api/Tasks/{id}` | Update task |
| DELETE | `/api/Tasks/{id}` | Delete task |

### Request/Response Format

#### Task Object
```json
{
  "id": 1,
  "text": "Task description",
  "completed": false,
  "createdAt": "2023-10-20T10:00:00Z",
  "updatedAt": "2023-10-20T10:00:00Z"
}
```

#### Create Task Request
```json
{
  "text": "New task description",
  "completed": false
}
```

## Component Integration

### Updated Tasks Component
The Tasks component now uses the `useTasks` hook for:
- Automatic data fetching from the API
- Real-time error display with dismissal
- Loading states for better UX
- Disabled states during operations
- Empty state handling

### Features
- ✅ Fetches tasks from API on component mount
- ✅ Creates new tasks via API
- ✅ Updates task completion status
- ✅ Deletes tasks with confirmation
- ✅ Displays loading states
- ✅ Shows user-friendly error messages
- ✅ Handles network failures gracefully
- ✅ Calculates and displays task statistics

## Error Handling Strategy

1. **Network Layer**: HTTP client catches network errors and timeouts
2. **Service Layer**: Services handle API-specific errors and validation
3. **Hook Layer**: Custom hook manages error state and provides error clearing
4. **Component Layer**: UI displays user-friendly error messages

## Best Practices Implemented

### 1. Separation of Concerns
- Configuration separated from business logic
- HTTP client abstracted from API services
- State management separated from UI components

### 2. Error Handling
- Structured error types with meaningful messages
- Centralized error logging
- User-friendly error display

### 3. Loading States
- Granular loading states for different operations
- Disabled UI elements during operations
- Visual feedback for user actions

### 4. Code Organization
- Barrel exports for cleaner imports
- Consistent file naming conventions
- Comprehensive JSDoc documentation

### 5. Type Safety
- JSDoc type definitions for better IDE support
- Input validation in service methods
- Defensive programming practices

## Development Workflow

1. **Start the API server** on `http://localhost:5135`
2. **Run the React application**: `npm start`
3. **Build for production**: `npm run build`

## Testing Recommendations

1. **Unit Tests**: Test individual service methods
2. **Integration Tests**: Test hook behavior with mocked API
3. **E2E Tests**: Test complete user workflows
4. **Error Scenarios**: Test network failures and error handling

## Future Enhancements

1. **Caching**: Implement request caching for better performance
2. **Optimistic Updates**: Add optimistic UI updates for better UX
3. **Offline Support**: Add offline capabilities with local storage
4. **Real-time Updates**: Implement WebSocket for real-time task updates
5. **Authentication**: Add authentication headers and token management
6. **Pagination**: Implement pagination for large task lists

## Monitoring and Logging

In production, consider adding:
- API response time monitoring
- Error rate tracking
- User action analytics
- Performance metrics collection

This implementation provides a solid foundation for a scalable, maintainable API integration that follows corporate standards and best practices.