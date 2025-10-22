import React, { useState } from 'react';
import './Tasks.css';
import { useTasks } from '../hooks/useTasks.js';

const Tasks = () => {
  const {
    tasks,
    loading,
    error,
    isCreating,
    isDeleting,
    addTask,
    toggleTask,
    deleteTask,
    clearError,
    getTaskStats
  } = useTasks();

  const [newTask, setNewTask] = useState('');

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const success = await addTask(newTask);
      if (success) {
        setNewTask('');
      }
    }
  };

  const handleToggleTask = async (id) => {
    await toggleTask(id);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
  };

  const stats = getTaskStats();

  return (
    <div className="tasks-container">
      <h2>Task Manager</h2>
      
      {error && (
        <div className="error-message" style={{
          background: '#fee',
          border: '1px solid #fcc',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '10px',
          color: '#c33'
        }}>
          {error}
          <button 
            onClick={clearError}
            style={{
              marginLeft: '10px',
              background: 'none',
              border: 'none',
              color: '#c33',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      )}
      
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          className="task-input"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          disabled={isCreating}
        />
        <button 
          onClick={handleAddTask} 
          className="add-btn"
          disabled={isCreating || !newTask.trim()}
        >
          {isCreating ? 'Adding...' : 'Add Task'}
        </button>
      </div>

      <div className="tasks-list">
        {loading === 'loading' ? (
          <div className="loading-message" style={{
            textAlign: 'center',
            padding: '20px',
            color: '#666'
          }}>
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="no-tasks-message" style={{
            textAlign: 'center',
            padding: '20px',
            color: '#999'
          }}>
            No tasks found. Add your first task above!
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleTask(task.id)}
                  className="task-checkbox"
                  disabled={loading === 'updating'}
                />
                <span className="task-text">{task.title}</span>
              </div>
              {/* <button
                onClick={() => handleDeleteTask(task.id)}
                className="delete-btn"
                title="Delete task"
                disabled={isDeleting}
              >
                {isDeleting ? '...' : '✕'}
              </button> */}
            </div>
          ))
        )}
      </div>

      <div className="task-stats">
        <p>Total: {stats.total} | Completed: {stats.completed} | Remaining: {stats.remaining}</p>
      </div>
    </div>
  );
};

export default Tasks;