/**
 * Unit tests for useTasks hook - addTask function
 */

import { renderHook, act } from '../../utils/test-utils';
import { useTasks } from '../useTasks';
import tasksApiService from '../../services/tasksApi.service';
import openAIService from '../../services/openai.service';

// Mock the services
jest.mock('../../services/tasksApi.service');
jest.mock('../../services/openai.service');

const mockedTasksApiService = tasksApiService;
const mockedOpenAIService = openAIService;

describe('useTasks Hook - addTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock getAllTasks to return empty array by default
    mockedTasksApiService.getAllTasks.mockResolvedValue([]);
  });

  describe('addTask function', () => {
    it('should successfully add a task with AI-generated title', async () => {
      // Arrange
      const taskText = 'Complete the project documentation';
      const generatedTitle = 'Project Documentation Task';
      const mockCreatedTask = {
        id: 1,
        title: generatedTitle,
        text: taskText,
        isCompleted: false,
        createdAt: new Date().toISOString()
      };

      mockedOpenAIService.generateTaskTitle.mockResolvedValue({
        success: true,
        title: generatedTitle
      });
      mockedTasksApiService.createTask.mockResolvedValue(mockCreatedTask);

      const { result } = renderHook(() => useTasks());

      // Wait for initial load to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Act
      let addResult;
      await act(async () => {
        addResult = await result.current.addTask(taskText);
      });

      // Assert
      expect(addResult).toBe(true);
      expect(mockedOpenAIService.generateTaskTitle).toHaveBeenCalledWith(taskText);
      expect(mockedTasksApiService.createTask).toHaveBeenCalledWith({
        text: taskText,
        title: generatedTitle
      });
      expect(result.current.tasks).toContainEqual(mockCreatedTask);
      expect(result.current.error).toBeNull();
    });

    it('should remove quotes from AI-generated title', async () => {
      // Arrange
      const taskText = 'Write unit tests';
      const quotedTitle = '"Unit Testing Task"';
      const expectedTitle = 'Unit Testing Task';
      const mockCreatedTask = {
        id: 2,
        title: expectedTitle,
        text: taskText,
        isCompleted: false
      };

      mockedOpenAIService.generateTaskTitle.mockResolvedValue({ success: true, title: quotedTitle });
      mockedTasksApiService.createTask.mockResolvedValue(mockCreatedTask);

      const { result } = renderHook(() => useTasks());

      // Wait for initial load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Act
      await act(async () => {
        await result.current.addTask(taskText);
      });

      // Assert
      expect(mockedTasksApiService.createTask).toHaveBeenCalledWith({
        text: taskText,
        title: expectedTitle // Should be without quotes
      });
    });

    it('should remove quotes from AI-generated title but keep the inner ones', async () => {
      // Arrange
      const taskText = 'Write unit tests';
      const quotedTitle = '"Unit Testing "Task""';
      const expectedTitle = 'Unit Testing "Task"';
      const mockCreatedTask = {
        id: 2,
        title: expectedTitle,
        text: taskText,
        isCompleted: false
      };

      mockedOpenAIService.generateTaskTitle.mockResolvedValue({ success: true, title: quotedTitle });
      mockedTasksApiService.createTask.mockResolvedValue(mockCreatedTask);

      const { result } = renderHook(() => useTasks());

      // Wait for initial load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Act
      await act(async () => {
        await result.current.addTask(taskText);
      });

      // Assert
      expect(mockedTasksApiService.createTask).toHaveBeenCalledWith({
        text: taskText,
        title: expectedTitle // Should be without quotes
      });
    });

    it('should use fallback title when OpenAI service fails', async () => {
      // Arrange
      const taskText = 'This is a very long task description that should be truncated in fallback';
      const mockCreatedTask = {
        id: 3,
        title: 'This is a very...',
        text: taskText,
        isCompleted: false
      };

      mockedOpenAIService.generateTaskTitle.mockRejectedValue(new Error('OpenAI API error'));
      mockedTasksApiService.createTask.mockResolvedValue(mockCreatedTask);

      const { result } = renderHook(() => useTasks());

      // Wait for initial load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Act
      await act(async () => {
        await result.current.addTask(taskText);
      });

      // Assert
      expect(mockedOpenAIService.generateTaskTitle).toHaveBeenCalledWith(taskText);
      expect(mockedTasksApiService.createTask).toHaveBeenCalledWith({
        text: taskText,
        title: 'This is a very...' // Fallback title (first 4 words + ...)
      });
      expect(result.current.tasks).toContainEqual(mockCreatedTask);
    });

    it('should return false and set error when task text is empty', async () => {
      // Arrange
      const { result } = renderHook(() => useTasks());

      // Wait for initial load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Act
      let addResult;
      await act(async () => {
        addResult = await result.current.addTask('');
      });

      // Assert
      expect(addResult).toBe(false);
      expect(result.current.error).toBe('Task text cannot be empty');
      expect(mockedOpenAIService.generateTaskTitle).not.toHaveBeenCalled();
      expect(mockedTasksApiService.createTask).not.toHaveBeenCalled();
    });

    it('should return false and set error when task text is only whitespace', async () => {
      // Arrange
      const { result } = renderHook(() => useTasks());

      // Wait for initial load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Act
      let addResult;
      await act(async () => {
        addResult = await result.current.addTask('   ');
      });

      // Assert
      expect(addResult).toBe(false);
      expect(result.current.error).toBe('Task text cannot be empty');
      expect(mockedOpenAIService.generateTaskTitle).not.toHaveBeenCalled();
      expect(mockedTasksApiService.createTask).not.toHaveBeenCalled();
    });

    it('should return false and set error when API service fails', async () => {
      // Arrange
      const taskText = 'Valid task text';
      const generatedTitle = 'Generated Title';
      const apiError = new Error('API service error');

      mockedOpenAIService.generateTaskTitle.mockResolvedValue({ success: true, title: generatedTitle });
      mockedTasksApiService.createTask.mockRejectedValue(apiError);

      const { result } = renderHook(() => useTasks());

      // Wait for initial load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Act
      let addResult;
      await act(async () => {
        addResult = await result.current.addTask(taskText);
      });

      // Assert
      expect(addResult).toBe(false);
      expect(result.current.error).toBe('API service error');
      expect(mockedOpenAIService.generateTaskTitle).toHaveBeenCalledWith(taskText);
      expect(mockedTasksApiService.createTask).toHaveBeenCalledWith({
        text: taskText,
        title: generatedTitle
      });
      expect(result.current.tasks).toHaveLength(0);
    });

    it('should trim whitespace from task text', async () => {
      // Arrange
      const taskTextWithSpaces = '  Task with spaces  ';
      const trimmedText = 'Task with spaces';
      const generatedTitle = 'Spaces Task';
      const mockCreatedTask = {
        id: 4,
        title: generatedTitle,
        text: trimmedText,
        isCompleted: false
      };

      mockedOpenAIService.generateTaskTitle.mockResolvedValue({ success: true, title: generatedTitle });
      mockedTasksApiService.createTask.mockResolvedValue(mockCreatedTask);

      const { result } = renderHook(() => useTasks());

      // Wait for initial load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Act
      await act(async () => {
        await result.current.addTask(taskTextWithSpaces);
      });

      // Assert
      expect(mockedOpenAIService.generateTaskTitle).toHaveBeenCalledWith(trimmedText);
      expect(mockedTasksApiService.createTask).toHaveBeenCalledWith({
        text: trimmedText,
        title: generatedTitle
      });
    });

    it('should set loading state correctly during task creation', async () => {
      // Arrange
      const taskText = 'Test task';
      const generatedTitle = 'Test Title';
      const mockCreatedTask = { id: 5, title: generatedTitle, text: taskText };

      let resolveCreate;
      const createPromise = new Promise(resolve => {
        resolveCreate = resolve;
      });

      mockedOpenAIService.generateTaskTitle.mockResolvedValue({ success: true, title: generatedTitle });
      mockedTasksApiService.createTask.mockReturnValue(createPromise);

      const { result } = renderHook(() => useTasks());

      // Wait for initial load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Assert initial state
      expect(result.current.isCreating).toBe(false);
      expect(result.current.loading).toBe('idle');

      // Act - start task creation but don't await yet
      let addTaskPromise;
      act(() => {
        addTaskPromise = result.current.addTask(taskText);
      });

      // Give time for the loading state to be set
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Assert loading state
      expect(result.current.isCreating).toBe(true);
      expect(result.current.loading).toBe('creating');

      // Complete the API call
      await act(async () => {
        resolveCreate(mockCreatedTask);
        await addTaskPromise;
      });

      // Assert final state
      expect(result.current.isCreating).toBe(false);
      expect(result.current.loading).toBe('idle');
    });

    it('should add new task to existing tasks list', async () => {
      // Arrange
      const existingTasks = [
        { id: 1, title: 'Existing Task 1', text: 'First task', isCompleted: false },
        { id: 2, title: 'Existing Task 2', text: 'Second task', isCompleted: true }
      ];
      
      const newTaskText = 'New task';
      const generatedTitle = 'New Task Title';
      const newTask = { id: 3, title: generatedTitle, text: newTaskText, isCompleted: false };

      mockedTasksApiService.getAllTasks.mockResolvedValue(existingTasks);
      mockedOpenAIService.generateTaskTitle.mockResolvedValue({ success: true, title: generatedTitle });
      mockedTasksApiService.createTask.mockResolvedValue(newTask);

      const { result } = renderHook(() => useTasks());

      // Wait for initial load to complete
      await act(async () => {
        // Wait for the useEffect to run and load tasks
        await new Promise(resolve => setTimeout(resolve, 50));
      });

      // Verify existing tasks loaded
      expect(result.current.tasks).toHaveLength(2);
      expect(result.current.tasks).toContainEqual(existingTasks[0]);
      expect(result.current.tasks).toContainEqual(existingTasks[1]);

      // Act
      await act(async () => {
        await result.current.addTask(newTaskText);
      });

      // Assert
      expect(result.current.tasks).toHaveLength(3);
      expect(result.current.tasks).toContainEqual(newTask);
      expect(result.current.tasks).toContainEqual(existingTasks[0]);
      expect(result.current.tasks).toContainEqual(existingTasks[1]);
    });
  });
});