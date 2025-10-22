/**
 * Custom hook for managing tasks state and API operations
 */

import { useState, useEffect, useCallback } from 'react';
import tasksApiService from '../services/tasksApi.service.js';
import openAIService from '../services/openai.service.js';

/**
 * Loading states for different operations
 */
const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  CREATING: 'creating',
  UPDATING: 'updating',
  DELETING: 'deleting'
};

/**
 * Custom hook for tasks management
 * @returns {object} Tasks state and operations
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Load all tasks from API
   */
  const loadTasks = useCallback(async () => {
    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);
      
      const fetchedTasks = await tasksApiService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(LOADING_STATES.IDLE);
    }
  }, []);

  /**
   * Generate task title using ChatGPT
   * @param {string} text - Task description
   * @returns {Promise<string>} - Generated title
   */
  const generateTaskTitle = useCallback(async (text) => {
    try {
      return await openAIService.generateTaskTitle(text);
    } catch (error) {
      console.warn('Failed to generate AI title, using fallback:', error);
      // Fallback: Create a simple title suggestion
      const words = text.trim().split(' ');
      const firstFewWords = words.slice(0, 4).join(' ');
      return `${firstFewWords}${words.length > 4 ? '...' : ''}`;
    }
  }, []);

  /**
   * Add a new task
   * @param {string} text - Task text/description
   * @returns {Promise<boolean>} - Success status
   */
  const addTask = useCallback(async (text) => {
    if (!text || text.trim() === '') {
      setError('Task text cannot be empty');
      return false;
    }

    try {
      setLoading(LOADING_STATES.CREATING);
      setError(null);
      
      // Generate title using ChatGPT
      let generatedTitle = await generateTaskTitle(text.trim());
      //remove start and end quote from generatedTitle
      generatedTitle = generatedTitle.replace(/^"(.*)"$/, '$1');
      
      const newTask = await tasksApiService.createTask({ 
        text: text.trim(),
        title: generatedTitle
      });
      setTasks(prevTasks => [...prevTasks, newTask]);
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Failed to add task:', err);
      return false;
    } finally {
      setLoading(LOADING_STATES.IDLE);
    }
  }, [generateTaskTitle]);

  /**
   * Toggle task completion status
   * @param {number} taskId - Task ID
   * @returns {Promise<boolean>} - Success status
   */
  const toggleTask = useCallback(async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      setError('Task not found');
      return false;
    }

    try {
      setLoading(LOADING_STATES.UPDATING);
      setError(null);
      
      const updatedTask = await tasksApiService.toggleTask(taskId, !task.completed);
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === taskId ? updatedTask : t)
      );
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Failed to toggle task:', err);
      return false;
    } finally {
      setLoading(LOADING_STATES.IDLE);
    }
  }, [tasks]);

  /**
   * Update task text
   * @param {number} taskId - Task ID
   * @param {string} newText - New task text
   * @returns {Promise<boolean>} - Success status
   */
  const updateTask = useCallback(async (taskId, newText) => {
    if (!newText || newText.trim() === '') {
      setError('Task text cannot be empty');
      return false;
    }

    try {
      setLoading(LOADING_STATES.UPDATING);
      setError(null);
      
      const updatedTask = await tasksApiService.updateTask(taskId, { text: newText.trim() });
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === taskId ? updatedTask : t)
      );
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Failed to update task:', err);
      return false;
    } finally {
      setLoading(LOADING_STATES.IDLE);
    }
  }, []);

  /**
   * Delete a task
   * @param {number} taskId - Task ID
   * @returns {Promise<boolean>} - Success status
   */
  const deleteTask = useCallback(async (taskId) => {
    try {
      setLoading(LOADING_STATES.DELETING);
      setError(null);
      
      await tasksApiService.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Failed to delete task:', err);
      return false;
    } finally {
      setLoading(LOADING_STATES.IDLE);
    }
  }, []);

  /**
   * Get task statistics
   */
  const getTaskStats = useCallback(() => {
    const completed = tasks.filter(task => task.isCompleted).length;
    return {
      total: tasks.length,
      completed,
      remaining: tasks.length - completed
    };
  }, [tasks]);

  /**
   * Load tasks on mount
   */
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    // State
    tasks,
    loading,
    error,
    isLoading: loading !== LOADING_STATES.IDLE,
    isCreating: loading === LOADING_STATES.CREATING,
    isUpdating: loading === LOADING_STATES.UPDATING,
    isDeleting: loading === LOADING_STATES.DELETING,
    
    // Operations
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    loadTasks,
    clearError,
    getTaskStats
  };
};