import React from 'react';
import './TaskDetailModal.css';

const TaskDetailModal = ({ isOpen, onClose, task }) => {
  if (!isOpen || !task) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (err) {
      return dateString;
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return dateString;
    }
  };

  const getPriorityColor = (priority) => {
    const priorityStr = priority?.toString()?.toLowerCase();
    switch (priorityStr) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityLabel = (priority) => {
    return priority?.toString() || 'None';
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="task-detail-modal-overlay" onClick={handleOverlayClick}>
      <div className="task-detail-modal-content">
        <div className="task-detail-header">
          <h2>Task Details</h2>
          <button 
            className="task-detail-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        
        <div className="task-detail-body">
          <div className="task-detail-section">
            <h3>Title</h3>
            <div className="task-detail-title">
              {task.title || 'No title'}
            </div>
          </div>

          <div className="task-detail-section">
            <h3>Description</h3>
            <div className="task-detail-description">
              {task.description || 'No description provided'}
            </div>
          </div>

          <div className="task-detail-row">
            <div className="task-detail-section task-detail-half">
              <h3>Status</h3>
              <div className={`task-detail-status ${task.isCompleted ? 'completed' : 'pending'}`}>
                <span className="status-icon">
                  {task.isCompleted ? '✅' : '⏳'}
                </span>
                <span className="status-text">
                  {task.isCompleted ? 'Completed' : 'Not Completed'}
                </span>
              </div>
            </div>

            <div className="task-detail-section task-detail-half">
              <h3>Priority</h3>
              <div className="task-detail-priority">
                <span 
                  className="priority-indicator"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                ></span>
                <span className="priority-text">
                  {getPriorityLabel(task.priority)}
                </span>
              </div>
            </div>
          </div>

          <div className="task-detail-row">
            <div className="task-detail-section task-detail-half">
              <h3>Created Date</h3>
              <div className="task-detail-datetime">
                <div className="task-detail-date">{formatDate(task.createdAt)}</div>
                <div className="task-detail-time">{formatTime(task.createdAt)}</div>
              </div>
            </div>

            <div className="task-detail-section task-detail-half">
              <h3>Due Date</h3>
              <div className="task-detail-datetime">
                {task.dueDate ? (
                  <>
                    <div className="task-detail-date">{formatDate(task.dueDate)}</div>
                    <div className="task-detail-time">{formatTime(task.dueDate)}</div>
                  </>
                ) : (
                  <div className="task-detail-no-date">No due date set</div>
                )}
              </div>
            </div>
          </div>

          {task.completedAt && (
            <div className="task-detail-section">
              <h3>Completed Date</h3>
              <div className="task-detail-datetime">
                <div className="task-detail-date">{formatDate(task.completedAt)}</div>
                <div className="task-detail-time">{formatTime(task.completedAt)}</div>
              </div>
            </div>
          )}

          {task.talkId && (
            <div className="task-detail-section">
              <h3>Associated Talk</h3>
              <div className="task-detail-talk-id">Talk #{task.talkId}</div>
            </div>
          )}

          {task.id && (
            <div className="task-detail-section">
              <h3>Task ID</h3>
              <div className="task-detail-id">#{task.id}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;