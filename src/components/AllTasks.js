import React, { useState, useEffect } from 'react';
import { tasksApiService } from '../services';
import AddTaskModal from './AddTaskModal';
import ConfirmModal from './ConfirmModal';
import Toast from './Toast';
import './AllTasks.css';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      try {
        await tasksApiService.deleteTask(taskToDelete);
        setTasks(tasks.filter((task) => task.id !== taskToDelete));
        showToast('Task deleted successfully', 'success');
      } catch (err) {
        showToast('Failed to delete task', 'error');
        console.error('Error deleting task:', err);
      }
    }
    setIsConfirmModalOpen(false);
    setTaskToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
    setTaskToDelete(null);
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await tasksApiService.createTask(taskData);
      setTasks([newTask, ...tasks]);
      setIsModalOpen(false);
      showToast('Task added successfully', 'success');
    } catch (err) {
      showToast('Failed to add task', 'error');
      console.error('Error adding task:', err);
    }
  };

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        setLoading(true);
        const data = await tasksApiService.getAllTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks');
        showToast('Failed to fetch tasks', 'error');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTasks();
  }, []);

  if (loading) {
    return (
      <div className="all-tasks-container">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-tasks-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="all-tasks-container">
      <div className="all-tasks-header">
        <h1>All Tasks</h1>
        <p>Total tasks: {tasks.length}</p>
      </div>
      
      {tasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks available.</p>
        </div>
      ) : (
        <div className="tasks-table-container">
          <table className="tasks-table">
            <thead>
              <tr className= "tasks-table-container-header">
                {/* <th>ID</th> */}
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Completed</th>
                <th scope="col">Priority</th>
                <th scope="col">Created Date</th>
                <th scope="col">Due Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className={`task-row priority-${task.priority ? task.priority.toString().toLowerCase() : 'none'}`} >
                  {/* <td>{task.id}</td> */}
                  <td className="task-title">{task.title || 'No title'}</td>
                  <td className="task-description">{task.description || 'No description'}</td>
                  <td>
                    <span className={`status-badge status-${task.isCompleted ? 'completed' : 'not-completed'}`}>
                      {task.isCompleted ? 'Completed' : 'Not Completed'}
                    </span>
                  </td>
                  <td>
                    <span className={`priority-badge priority-${task.priority ? task.priority.toString().toLowerCase() : 'none'}`}>
                      {task.priority || 'None'}
                    </span>
                  </td>
                  <td>{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button onClick={() => handleDeleteClick(task.id)} className="status-badge status-danger">
                      <span role="img" aria-label="delete" style={{ color: 'red' }}>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       <div className="add-task-container">
        <button onClick={() => setIsModalOpen(true)} className="status-badge status-primary">Add Task</button>
      </div>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this task?"
      />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default AllTasks;