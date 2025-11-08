import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tasksApiService } from '../services';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import ConfirmModal from './ConfirmModal';
import TaskDetailModal from './TaskDetailModal';
import Toast from './Toast';
import './AllTasks.css';

const AllTasks = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
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
        await tasksApiService.deleteTask(taskToDelete.id);
        setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
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

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await tasksApiService.updateTask(updatedTask.id, updatedTask);
      setTasks(tasks.map(task => task.id === updatedTask.id ? response : task));
      showToast(t('toast.messages.taskUpdated'), 'success');
    } catch (err) {
      showToast(t('toast.messages.updateTaskError'), 'error');
      console.error('Error updating task:', err);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  const handleRowClick = (task, event) => {
    // Don't open detail modal if clicking on action buttons
    if (event.target.closest('.actions')) {
      return;
    }
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTask(null);
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
        <div className="loading">
          <FontAwesomeIcon icon="spinner" spin />
          {t('allTasks.messages.loading')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-tasks-container">
        <div className="error">
          <FontAwesomeIcon icon="exclamation-triangle" />
          {error}
        </div>
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
          <FontAwesomeIcon icon="exclamation-triangle" />
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
                <tr 
                  key={task.id} 
                  className={`task-row priority-${task.priority ? task.priority.toString().toLowerCase() : 'none'} clickable-row`}
                  onClick={(e) => handleRowClick(task, e)}
                  title="Click to view details"
                >
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
                                          <td className="actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditClick(task)}
                            title={t('modals.editTask.title')}
                            aria-label={`Edit task: ${task.title}`}
                          >
                            <FontAwesomeIcon icon="edit" />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteClick(task)}
                            title={t('buttons.delete')}
                            aria-label={`Delete task: ${task.title}`}
                          >
                            <FontAwesomeIcon icon="trash" style={{ color: '#dc3545' }} />
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
          <FontAwesomeIcon icon="plus" className="add-task-icon" aria-hidden="true" />
          Add New Task
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
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUpdateTask={handleUpdateTask}
        task={taskToEdit}
      />
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        task={selectedTask}
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