/**
 * Tasks API Service
 * Handles all API operations related to tasks
 */

import httpClient from '../utils/httpClient.js';
import API_CONFIG from '../config/api.config.js';
import { handleError } from '../utils/errorHandler.js';

/**
 * Task data transfer object interface (for documentation)
 * @typedef {Object} Task
 * @property {number} id - Task unique identifier
 * @property {string} text - Task description
 * @property {boolean} completed - Task completion status
 * @property {string} [createdAt] - Task creation timestamp
 * @property {string} [updatedAt] - Task last update timestamp
 */

/**
 * Tasks API Service Class
 */
class TasksApiService {
  constructor() {
    this.endpoint = API_CONFIG.ENDPOINTS.TASKS;
  }

  /**
   * Get all tasks
   * @returns {Promise<Task[]>} - Array of tasks
   * @throws {Error} - When API call fails
   */
  async getAllTasks() {
    try {
      const tasks = await  httpClient.get(this.endpoint);
      //order tasks by due date desc and then priority desc
      tasks.sort((a, b) => {
        const dueDateA = new Date(a.dueDate);
        const dueDateB = new Date(b.dueDate);
        if (dueDateB - dueDateA !== 0) {
          return dueDateB - dueDateA;
        }
        return (b.priority || 0) - (a.priority || 0);
      });
      return tasks || [];
    } catch (error) {
      const errorMessage = handleError(error, { 
        operation: 'getAllTasks',
        endpoint: this.endpoint 
      });
      throw new Error(errorMessage);
    }
  }

  /**
   * Get a specific task by ID
   * @param {number} taskId - Task ID
   * @returns {Promise<Task>} - Task object
   * @throws {Error} - When API call fails
   */
  async getTaskById(taskId) {
    try {
      const task = await httpClient.get(`${this.endpoint}/${taskId}`);
      return task;
    } catch (error) {
      const errorMessage = handleError(error, { 
        operation: 'getTaskById',
        taskId,
        endpoint: this.endpoint 
      });
      throw new Error(errorMessage);
    }
  }

  /**
   * Create a new task
   * @param {Partial<Task>} taskData - Task data (without ID)
   * @returns {Promise<Task>} - Created task object
   * @throws {Error} - When API call fails
   */
  async createTask(taskData) {
    try {
      // Validate required fields
      if (!taskData.text || taskData.text.trim() === '') {
        throw new Error('Task text is required');
      }
      const newTask = {
        title: taskData.title || API_CONFIG.DEFAULTS.TASK_TITLE,
        description: taskData.text.trim(),
        isCompleted: false,
        dueDate: new Date(Date.now() + API_CONFIG.DEFAULTS.DUE_DATE_OFFSET_MS).toISOString(),
        priority: taskData.priority || API_CONFIG.DEFAULTS.TASK_PRIORITY
      };

      const createdTask = await httpClient.post(this.endpoint, newTask);
      return createdTask;
    } catch (error) {
      const errorMessage = handleError(error, { 
        operation: 'createTask',
        taskData,
        endpoint: this.endpoint 
      });
      throw new Error(errorMessage);
    }
  }

  /**
   * Update an existing task
   * @param {number} taskId - Task ID
   * @param {Partial<Task>} taskData - Updated task data
   * @returns {Promise<Task>} - Updated task object
   * @throws {Error} - When API call fails
   */
  async updateTask(taskId, taskData) {
    try {
      // Validate task ID
      if (!taskId || typeof taskId !== 'number') {
        throw new Error('Valid task ID is required');
      }

      const updatedTask = await httpClient.put(`${this.endpoint}/${taskId}`, taskData);
      return updatedTask;
    } catch (error) {
      const errorMessage = handleError(error, { 
        operation: 'updateTask',
        taskId,
        taskData,
        endpoint: this.endpoint 
      });
      throw new Error(errorMessage);
    }
  }

  /**
   * Toggle task completion status
   * @param {number} taskId - Task ID
   * @param {boolean} completed - New completion status
   * @returns {Promise<Task>} - Updated task object
   * @throws {Error} - When API call fails
   */
  async toggleTask(taskId, completed) {
    try {
      return await this.updateTask(taskId, { completed });
    } catch (error) {
      const errorMessage = handleError(error, { 
        operation: 'toggleTask',
        taskId,
        completed,
        endpoint: this.endpoint 
      });
      throw new Error(errorMessage);
    }
  }

  /**
   * Delete a task
   * @param {number} taskId - Task ID
   * @returns {Promise<void>}
   * @throws {Error} - When API call fails
   */
  async deleteTask(taskId) {
    try {
      // Validate task ID
      if (!taskId || typeof taskId !== 'number') {
        throw new Error('Valid task ID is required');
      }

      await httpClient.delete(`${this.endpoint}/${taskId}`);
    } catch (error) {
      const errorMessage = handleError(error, { 
        operation: 'deleteTask',
        taskId,
        endpoint: this.endpoint 
      });
      throw new Error(errorMessage);
    }
  }

  /**
   * Get task statistics
   * @returns {Promise<{total: number, completed: number, remaining: number}>}
   * @throws {Error} - When API call fails
   */
  async getTaskStats() {
    try {
      const tasks = await this.getAllTasks();
      const completed = tasks.filter(task => task.completed).length;
      
      return {
        total: tasks.length,
        completed,
        remaining: tasks.length - completed
      };
    } catch (error) {
      const errorMessage = handleError(error, { 
        operation: 'getTaskStats',
        endpoint: this.endpoint 
      });
      throw new Error(errorMessage);
    }
  }
}

// Export singleton instance
export default new TasksApiService();