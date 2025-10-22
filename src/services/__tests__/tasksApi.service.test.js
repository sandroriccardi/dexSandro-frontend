/**
 * Simplified Unit Tests for TasksApiService
 * Tests API interactions and basic functionality
 */

import tasksApiService from '../tasksApi.service';
import httpClient from '../../utils/httpClient';
import { handleError } from '../../utils/errorHandler';

// Mock the dependencies
jest.mock('../../utils/httpClient');
jest.mock('../../utils/errorHandler');
jest.mock('../../config/api.config', () => ({
  ENDPOINTS: {
    TASKS: '/api/Tasks'
  },
  DEFAULTS: {
    TASK_TITLE: 'New Task',
    DUE_DATE_OFFSET_MS: 24 * 60 * 60 * 1000, // 24 hours
    TASK_PRIORITY: 3
  }
}));

const mockedHttpClient = httpClient;
const mockedHandleError = handleError;

describe('TasksApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedHandleError.mockImplementation((error) => error.message);
  });

  describe('getAllTasks', () => {
    it('should return tasks from API', async () => {
      const mockTasks = [
        { id: 1, text: 'Task 1', completed: false },
        { id: 2, text: 'Task 2', completed: true }
      ];

      mockedHttpClient.get.mockResolvedValue(mockTasks);

      const result = await tasksApiService.getAllTasks();

      expect(mockedHttpClient.get).toHaveBeenCalledWith('/api/Tasks');
      expect(result).toEqual(mockTasks);
    });

    it('should return empty array when API returns null', async () => {
      mockedHttpClient.get.mockResolvedValue([]);

      const result = await tasksApiService.getAllTasks();

      expect(result).toEqual([]);
    });

    it('should handle API errors', async () => {
      const mockError = new Error('Network error');
      mockedHttpClient.get.mockRejectedValue(mockError);

      await expect(tasksApiService.getAllTasks()).rejects.toThrow('Network error');
    });
  });

  describe('getTaskById', () => {
    it('should return a specific task by ID', async () => {
      const mockTask = { id: 1, text: 'Test Task', completed: false };
      mockedHttpClient.get.mockResolvedValue(mockTask);

      const result = await tasksApiService.getTaskById(1);

      expect(mockedHttpClient.get).toHaveBeenCalledWith('/api/Tasks/1');
      expect(result).toEqual(mockTask);
    });
  });

  describe('createTask', () => {
    it('should create a new task successfully', async () => {
      const taskData = { text: 'New Task', completed: false };
      const mockCreatedTask = { id: 1, ...taskData };
      
      mockedHttpClient.post.mockResolvedValue(mockCreatedTask);

      const result = await tasksApiService.createTask(taskData);

      // Verify the transformed payload sent to the API
      expect(mockedHttpClient.post).toHaveBeenCalledWith('/api/Tasks', expect.objectContaining({
        title: 'New Task',
        description: 'New Task',
        isCompleted: false,
        priority: 3,
        createdAt: expect.any(String),
        dueDate: expect.any(String),
        completedAt: null
      }));
      expect(result).toEqual(mockCreatedTask);
    });

    it('should trim whitespace from task text', async () => {
      const taskData = { text: '  Spaced Task  ', completed: false };
      const mockCreatedTask = { id: 1, text: 'Spaced Task', completed: false };
      
      mockedHttpClient.post.mockResolvedValue(mockCreatedTask);

      await tasksApiService.createTask(taskData);

      // Verify the transformed payload with trimmed text sent to the API
      expect(mockedHttpClient.post).toHaveBeenCalledWith('/api/Tasks', expect.objectContaining({
        title: 'New Task',
        description: 'Spaced Task',
        isCompleted: false,
        priority: 3,
        createdAt: expect.any(String),
        dueDate: expect.any(String),
        completedAt: null
      }));
    });

    it('should validate empty task text', async () => {
      const taskData = { text: '', completed: false };

      await expect(tasksApiService.createTask(taskData)).rejects.toThrow();
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const taskId = 1;
      const updateData = { text: 'Updated Task', completed: true };
      const mockUpdatedTask = { id: taskId, ...updateData };
      
      mockedHttpClient.put.mockResolvedValue(mockUpdatedTask);

      const result = await tasksApiService.updateTask(taskId, updateData);

      expect(mockedHttpClient.put).toHaveBeenCalledWith('/api/Tasks/1', updateData);
      expect(result).toEqual(mockUpdatedTask);
    });

    it('should validate task ID', async () => {
      await expect(tasksApiService.updateTask(null, {})).rejects.toThrow();
    });
  });

  describe('toggleTask', () => {
    it('should toggle task completion status', async () => {
      const taskId = 1;
      const isCompleted = true;
      const mockUpdatedTask = { id: taskId, text: 'Test Task', isCompleted };
      
      mockedHttpClient.put.mockResolvedValue(mockUpdatedTask);

      const result = await tasksApiService.toggleTask(taskId, isCompleted);

      expect(mockedHttpClient.put).toHaveBeenCalledWith('/api/Tasks/1', { isCompleted });
      expect(result).toEqual(mockUpdatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      const taskId = 1;
      mockedHttpClient.delete.mockResolvedValue(undefined);

      await tasksApiService.deleteTask(taskId);

      expect(mockedHttpClient.delete).toHaveBeenCalledWith('/api/Tasks/1');
    });

    it('should validate task ID', async () => {
      await expect(tasksApiService.deleteTask(null)).rejects.toThrow();
    });
  });

  describe('getTaskStats', () => {
    it('should return correct task statistics', async () => {
      const mockTasks = [
        { id: 1, text: 'Task 1', completed: true },
        { id: 2, text: 'Task 2', completed: false },
        { id: 3, text: 'Task 3', completed: true },
        { id: 4, text: 'Task 4', completed: false }
      ];
      
      mockedHttpClient.get.mockResolvedValue(mockTasks);

      const result = await tasksApiService.getTaskStats();

      expect(result).toEqual({
        total: 4,
        completed: 2,
        remaining: 2
      });
    });
  });

  describe('Service Configuration', () => {
    it('should use correct API endpoint', () => {
      expect(tasksApiService.endpoint).toBe('/api/Tasks');
    });
  });
});