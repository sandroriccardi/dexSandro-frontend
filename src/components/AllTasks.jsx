import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { tasksApiService } from '../services';
import AddTaskModal from './AddTaskModal';
import ConfirmModal from './ConfirmModal';
import Toast from './Toast';
import './AllTasks.css';

const AllTasks = () => {
  const { t } = useTranslation();
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
        showToast(t('toast.messages.taskDeleted'), 'success');
      } catch (err) {
        showToast(t('toast.messages.deleteTaskError'), 'error');
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
      showToast(t('toast.messages.taskAdded'), 'success');
    } catch (err) {
      showToast(t('toast.messages.addTaskError'), 'error');
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
        setError(t('toast.messages.loadTasksError'));
        showToast(t('toast.messages.loadTasksError'), 'error');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTasks();
  }, []);

  if (loading) {
    return (
      <div className="all-tasks-container" data-testid="loading-container">
        <div className="loading">{t('allTasks.messages.loading')}</div>
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
        <h1>{t('allTasks.title')}</h1>
        <p>{t('allTasks.totalTasks', { count: tasks.length })}</p>
      </div>
      
      {tasks.length === 0 ? (
        <div className="no-tasks">
          <p>{t('allTasks.messages.noTasks')}</p>
        </div>
      ) : (
        <div className="tasks-table-container">
          <table className="tasks-table">
            <thead>
              <tr className= "tasks-table-container-header">
                {/* <th>ID</th> */}
                <th scope="col">{t('allTasks.table.headers.title')}</th>
                <th scope="col">{t('allTasks.table.headers.description')}</th>
                <th scope="col">{t('allTasks.table.headers.completed')}</th>
                <th scope="col">{t('allTasks.table.headers.priority')}</th>
                <th scope="col">{t('allTasks.table.headers.createdDate')}</th>
                <th scope="col">{t('allTasks.table.headers.dueDate')}</th>
                <th scope="col">{t('allTasks.table.headers.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className={`task-row priority-${task.priority ? task.priority.toString().toLowerCase() : 'none'}`} >
                  {/* <td>{task.id}</td> */}
                  <td className="task-title">{task.title || t('allTasks.table.noTitle')}</td>
                  <td className="task-description">{task.description || t('allTasks.table.noDescription')}</td>
                  <td>
                    <span className={`status-badge status-${task.isCompleted ? 'completed' : 'not-completed'}`}>
                      {task.isCompleted ? t('tasks.status.completed') : t('tasks.status.notCompleted')}
                    </span>
                  </td>
                  <td>
                    <span className={`priority-badge priority-${task.priority ? task.priority.toString().toLowerCase() : 'none'}`}>
                      {task.priority || t('tasks.priority.none')}
                    </span>
                  </td>
                  <td>{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : t('allTasks.table.noData')}</td>
                  <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : t('allTasks.table.noData')}</td>
                  <td>
                    <button 
                      onClick={() => handleDeleteClick(task.id)} 
                      className="delete-task-btn"
                      type="button"
                      aria-label={`Delete task: ${task.title || 'Untitled task'}`}
                      title={`Delete "${task.title || 'Untitled task'}"`}
                    >
                      <span className="delete-icon" aria-hidden="true">🗑️</span>
                      {/* <span className="delete-text">Delete</span> */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="add-task-section">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="add-task-btn"
          type="button"
          aria-label="Add new task"
        >
          <span className="add-task-icon" aria-hidden="true">+</span>
          {/* <span className="add-task-text">Add New Task</span> */}
        </button>
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
        message={t('modals.confirm.message')}
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