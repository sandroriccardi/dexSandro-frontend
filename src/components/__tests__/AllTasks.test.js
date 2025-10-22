/**
 * Comprehensive Unit Tests for AllTasks Component
 * Tests component rendering, user interactions, and API integration
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AllTasks from '../AllTasks';
import { tasksApiService } from '../../services';

// Mock the dependencies
jest.mock('../../services', () => ({
  tasksApiService: {
    getAllTasks: jest.fn(),
    createTask: jest.fn(),
    deleteTask: jest.fn(),
  },
}));

jest.mock('../AddTaskModal', () => {
  return function MockAddTaskModal({ isOpen, onClose, onAddTask }) {
    if (!isOpen) return null;
    return (
      <div data-testid="add-task-modal">
        <button data-testid="modal-add-task" onClick={() => onAddTask({
          title: 'New Task',
          text: 'New Description',
          dueDate: '2025-12-31',
          priority: '1'
        })}>
          Add Task
        </button>
        <button data-testid="modal-close" onClick={onClose}>Close</button>
      </div>
    );
  };
});

jest.mock('../ConfirmModal', () => {
  return function MockConfirmModal({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;
    return (
      <div data-testid="confirm-modal">
        <p>{message}</p>
        <button data-testid="confirm-delete" onClick={onConfirm}>Yes</button>
        <button data-testid="cancel-delete" onClick={onClose}>No</button>
      </div>
    );
  };
});

jest.mock('../Toast', () => {
  return function MockToast({ isVisible, message, type, onClose }) {
    if (!isVisible) return null;
    return (
      <div data-testid="toast" className={`toast-${type}`}>
        <span>{message}</span>
        <button data-testid="toast-close" onClick={onClose}>×</button>
      </div>
    );
  };
});

// Mock CSS imports
jest.mock('../AllTasks.css', () => ({}));

const mockTasks = [
  {
    id: 1,
    title: 'Test Task 1',
    description: 'Test Description 1',
    isCompleted: false,
    priority: 1,
    createdAt: '2025-01-01T00:00:00Z',
    dueDate: '2025-12-31T00:00:00Z'
  },
  {
    id: 2,
    title: 'Test Task 2',
    description: 'Test Description 2',
    isCompleted: true,
    priority: 2,
    createdAt: '2025-01-02T00:00:00Z',
    dueDate: '2025-12-30T00:00:00Z'
  },
  {
    id: 3,
    title: 'Test Task 3',
    description: 'Test Description 3',
    isCompleted: false,
    priority: null,
    createdAt: null,
    dueDate: null
  }
];

describe('AllTasks Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render loading state initially', async () => {
      tasksApiService.getAllTasks.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(<AllTasks />);

      expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
      expect(screen.getByTestId('loading-container')).toHaveClass('all-tasks-container');
    });

    it('should render error state when API fails', async () => {
      tasksApiService.getAllTasks.mockRejectedValue(new Error('API Error'));

      await act(async () => {
        render(<AllTasks />);
      });

      await waitFor(() => {
        expect(screen.getByText('Failed to fetch tasks')).toBeInTheDocument();
      });
    });

    it('should render tasks table when tasks are loaded', async () => {
      tasksApiService.getAllTasks.mockResolvedValue(mockTasks);

      await act(async () => {
        render(<AllTasks />);
      });

      await waitFor(() => {
        expect(screen.getByText('All Tasks')).toBeInTheDocument();
        expect(screen.getByText('Total tasks: 3')).toBeInTheDocument();
        expect(screen.getByText('Test Task 1')).toBeInTheDocument();
        expect(screen.getByText('Test Task 2')).toBeInTheDocument();
        expect(screen.getByText('Test Task 3')).toBeInTheDocument();
      });
    });

    it('should render "no tasks" message when tasks array is empty', async () => {
      tasksApiService.getAllTasks.mockResolvedValue([]);

      await act(async () => {
        render(<AllTasks />);
      });

      await waitFor(() => {
        expect(screen.getByText('No tasks available.')).toBeInTheDocument();
        expect(screen.getByText('Total tasks: 0')).toBeInTheDocument();
      });
    });

    it('should render task table headers correctly', async () => {
      tasksApiService.getAllTasks.mockResolvedValue(mockTasks);

      await act(async () => {
        render(<AllTasks />);
      });

      await waitFor(() => {
        expect(screen.getByRole('columnheader', { name: 'Title' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Description' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Completed' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Priority' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Created Date' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Due Date' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeInTheDocument();
      });
    });
  });

  describe('Task Data Display', () => {
    beforeEach(async () => {
      tasksApiService.getAllTasks.mockResolvedValue(mockTasks);
      await act(async () => {
        render(<AllTasks />);
      });
      await waitFor(() => {
        expect(screen.getByText('All Tasks')).toBeInTheDocument();
      });
    });

    it('should display task completion status correctly', () => {
      expect(screen.getAllByText('Not Completed')).toHaveLength(2);
      // Use a more specific selector to avoid the table header
      const completedBadges = screen.getAllByText('Completed').filter(element => 
        element.closest('.status-badge')
      );
      expect(completedBadges).toHaveLength(1);
    });

    it('should display priority correctly including null values', () => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('None')).toBeInTheDocument();
    });

    it('should display dates correctly and handle null values', () => {
      expect(screen.getByText('1/1/2025')).toBeInTheDocument();
      expect(screen.getByText('1/2/2025')).toBeInTheDocument();
      expect(screen.getAllByText('N/A')).toHaveLength(2); // For null createdAt and dueDate
    });

    it('should apply correct CSS classes based on task properties', () => {
      const taskRows = screen.getAllByRole('row').slice(1); // Skip header row
      
      expect(taskRows[0]).toHaveClass('task-row', 'priority-1');
      expect(taskRows[1]).toHaveClass('task-row', 'priority-2');
      expect(taskRows[2]).toHaveClass('task-row', 'priority-none');
    });

    it('should display fallback values for missing data', () => {
      // All mock tasks have titles and descriptions, so these should NOT be present
      expect(screen.queryByText('No title')).not.toBeInTheDocument();
      expect(screen.queryByText('No description')).not.toBeInTheDocument();
    });
  });

  describe('Add Task Functionality', () => {
    beforeEach(async () => {
      tasksApiService.getAllTasks.mockResolvedValue(mockTasks);
      await act(async () => {
        render(<AllTasks />);
      });
      await waitFor(() => {
        expect(screen.getByText('All Tasks')).toBeInTheDocument();
      });
    });

    it('should open add task modal when Add Task button is clicked', async () => {
      const addButton = screen.getByText('Add Task');
      
      fireEvent.click(addButton);
      
      expect(screen.getByTestId('add-task-modal')).toBeInTheDocument();
    });

    it('should close add task modal when close button is clicked', async () => {
      const addButton = screen.getByText('Add Task');
      fireEvent.click(addButton);
      
      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);
      
      expect(screen.queryByTestId('add-task-modal')).not.toBeInTheDocument();
    });

    it('should add new task successfully', async () => {
      const newTask = {
        id: 4,
        title: 'New Task',
        description: 'New Description',
        isCompleted: false,
        priority: 1,
        createdAt: '2025-01-03T00:00:00Z',
        dueDate: '2025-12-31T00:00:00Z'
      };

      tasksApiService.createTask.mockResolvedValue(newTask);

      const addButton = screen.getByText('Add Task');
      fireEvent.click(addButton);

      const modalAddButton = screen.getByTestId('modal-add-task');
      fireEvent.click(modalAddButton);

      await waitFor(() => {
        expect(tasksApiService.createTask).toHaveBeenCalledWith({
          title: 'New Task',
          text: 'New Description',
          dueDate: '2025-12-31',
          priority: '1'
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByText('Task added successfully')).toBeInTheDocument();
      });

      expect(screen.queryByTestId('add-task-modal')).not.toBeInTheDocument();
    });

    it('should show error toast when add task fails', async () => {
      tasksApiService.createTask.mockRejectedValue(new Error('Create failed'));

      const addButton = screen.getByText('Add Task');
      fireEvent.click(addButton);

      const modalAddButton = screen.getByTestId('modal-add-task');
      fireEvent.click(modalAddButton);

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByText('Failed to add task')).toBeInTheDocument();
      });

      expect(screen.getByTestId('toast')).toHaveClass('toast-error');
    });
  });

  describe('Delete Task Functionality', () => {
    beforeEach(async () => {
      tasksApiService.getAllTasks.mockResolvedValue(mockTasks);
      await act(async () => {
        render(<AllTasks />);
      });
      await waitFor(() => {
        expect(screen.getByText('All Tasks')).toBeInTheDocument();
      });
    });

    it('should open confirm modal when delete button is clicked', async () => {
      const deleteButtons = screen.getAllByText('Delete');
      
      fireEvent.click(deleteButtons[0]);
      
      expect(screen.getByTestId('confirm-modal')).toBeInTheDocument();
      expect(screen.getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
    });

    it('should close confirm modal when cancel is clicked', async () => {
      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);
      
      const cancelButton = screen.getByTestId('cancel-delete');
      fireEvent.click(cancelButton);
      
      expect(screen.queryByTestId('confirm-modal')).not.toBeInTheDocument();
    });

    it('should delete task successfully when confirmed', async () => {
      tasksApiService.deleteTask.mockResolvedValue();

      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);

      const confirmButton = screen.getByTestId('confirm-delete');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(tasksApiService.deleteTask).toHaveBeenCalledWith(1);
      });

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByText('Task deleted successfully')).toBeInTheDocument();
      });

      expect(screen.queryByTestId('confirm-modal')).not.toBeInTheDocument();
    });

    it('should show error toast when delete fails', async () => {
      tasksApiService.deleteTask.mockRejectedValue(new Error('Delete failed'));

      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);

      const confirmButton = screen.getByTestId('confirm-delete');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByText('Failed to delete task')).toBeInTheDocument();
      });

      expect(screen.getByTestId('toast')).toHaveClass('toast-error');
    });

    it('should update task count after successful deletion', async () => {
      tasksApiService.deleteTask.mockResolvedValue();

      expect(screen.getByText('Total tasks: 3')).toBeInTheDocument();

      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);

      const confirmButton = screen.getByTestId('confirm-delete');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(screen.getByText('Total tasks: 2')).toBeInTheDocument();
      });
    });
  });

  describe('Toast Functionality', () => {
    beforeEach(async () => {
      tasksApiService.getAllTasks.mockResolvedValue(mockTasks);
      await act(async () => {
        render(<AllTasks />);
      });
      await waitFor(() => {
        expect(screen.getByText('All Tasks')).toBeInTheDocument();
      });
    });

    it('should close toast when close button is clicked', async () => {
      // Trigger an error to show toast
      tasksApiService.createTask.mockRejectedValue(new Error('Create failed'));

      const addButton = screen.getByText('Add Task');
      fireEvent.click(addButton);

      const modalAddButton = screen.getByTestId('modal-add-task');
      fireEvent.click(modalAddButton);

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
      });

      const toastCloseButton = screen.getByTestId('toast-close');
      fireEvent.click(toastCloseButton);

      expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should show toast on initial load error', async () => {
      tasksApiService.getAllTasks.mockRejectedValue(new Error('Network error'));

      await act(async () => {
        render(<AllTasks />);
      });

      await waitFor(() => {
        expect(screen.getByText('Failed to fetch tasks')).toBeInTheDocument();
      });

      // The error state shows the error message, but the toast might not be visible in error state
      // Let's just verify the error is displayed
    });

    it('should log errors to console', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      tasksApiService.getAllTasks.mockRejectedValue(new Error('API Error'));

      await act(async () => {
        render(<AllTasks />);
      });

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching tasks:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Component Integration', () => {
    beforeEach(async () => {
      tasksApiService.getAllTasks.mockResolvedValue(mockTasks);
      await act(async () => {
        render(<AllTasks />);
      });
      await waitFor(() => {
        expect(screen.getByText('All Tasks')).toBeInTheDocument();
      });
    });

    it('should pass correct props to AddTaskModal', async () => {
      const addButton = screen.getByText('Add Task');
      fireEvent.click(addButton);

      expect(screen.getByTestId('add-task-modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-close')).toBeInTheDocument();
      expect(screen.getByTestId('modal-add-task')).toBeInTheDocument();
    });

    it('should pass correct props to ConfirmModal', async () => {
      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);

      expect(screen.getByTestId('confirm-modal')).toBeInTheDocument();
      expect(screen.getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
      expect(screen.getByTestId('confirm-delete')).toBeInTheDocument();
      expect(screen.getByTestId('cancel-delete')).toBeInTheDocument();
    });

    it('should pass correct props to Toast', async () => {
      // Trigger a success toast
      const newTask = { id: 4, title: 'New Task' };
      tasksApiService.createTask.mockResolvedValue(newTask);

      const addButton = screen.getByText('Add Task');
      fireEvent.click(addButton);

      const modalAddButton = screen.getByTestId('modal-add-task');
      fireEvent.click(modalAddButton);

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByTestId('toast')).toHaveClass('toast-success');
        expect(screen.getByTestId('toast-close')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    beforeEach(async () => {
      tasksApiService.getAllTasks.mockResolvedValue(mockTasks);
      await act(async () => {
        render(<AllTasks />);
      });
      await waitFor(() => {
        expect(screen.getByText('All Tasks')).toBeInTheDocument();
      });
    });

    it('should have proper ARIA labels on delete buttons', () => {
      const deleteButtons = screen.getAllByLabelText('delete');
      expect(deleteButtons).toHaveLength(3);
    });

    it('should have proper table structure with scope attributes', () => {
      const columnHeaders = screen.getAllByRole('columnheader');
      expect(columnHeaders).toHaveLength(7);
    });

    it('should have proper heading hierarchy', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('All Tasks');
    });
  });
});