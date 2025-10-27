import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './EditTaskModal.css';
import openAIService from '../services/openai.service';

const EditTaskModal = ({ isOpen, onClose, onUpdateTask, task }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);

  // Pre-populate form when task changes or modal opens
  useEffect(() => {
    if (isOpen && task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setPriority(task.priority ? task.priority.toString() : '');
      setIsCompleted(task.isCompleted || false);
      setValidationError('');
    }
  }, [isOpen, task]);

  const generateTaskTitle = async () => {
    if (!description.trim()) {
      setValidationError(t('modals.editTask.errors.descriptionRequired'));
      return;
    }

    setIsGeneratingTitle(true);
    try {
      const result = await openAIService.generateTaskTitle(description);
      
      if (result.success) {
        setTitle(result.title);
        setValidationError('');
        
        if (result.warning) {
          console.warn('OpenAI Warning:', result.warning.message);
        }
      } else {
        console.error('Error generating title:', result.error);
        setValidationError(`AI Error: ${result.error?.message || 'Failed to generate title'}`);
        
        // Fallback: Create a simple title suggestion
        const words = description.trim().split(' ');
        const firstFewWords = words.slice(0, 4).join(' ');
        setTitle(`${firstFewWords}${words.length > 4 ? '...' : ''}`);
      }
    } catch (error) {
      console.error('Unexpected error generating title:', error);
      setValidationError('An unexpected error occurred while generating title');
      
      // Fallback: Create a simple title suggestion
      const words = description.trim().split(' ');
      const firstFewWords = words.slice(0, 4).join(' ');
      setTitle(`${firstFewWords}${words.length > 4 ? '...' : ''}`);
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setValidationError(t('modals.editTask.errors.titleRequired'));
      return;
    }

    const updatedTask = {
      ...task,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      priority: priority ? parseInt(priority) : null,
      isCompleted: isCompleted
    };

    onUpdateTask(updatedTask);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setIsCompleted(false);
    setValidationError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{t('modals.editTask.title')}</h2>
          <button className="close-btn" onClick={handleClose} aria-label="Close modal">
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="task-form">
          {validationError && (
            <div className="error-message" role="alert">
              {validationError}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="edit-task-title">
              {t('modals.editTask.fields.title')} <span className="required">*</span>
            </label>
            <div className="title-input-group">
              <input
                type="text"
                id="edit-task-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('modals.editTask.placeholders.title')}
                required
              />
              <button
                type="button"
                onClick={generateTaskTitle}
                className="generate-title-btn"
                disabled={!description.trim() || isGeneratingTitle}
                title={t('modals.editTask.generateTitle')}
              >
                {isGeneratingTitle ? '⏳' : '✨'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-task-description">
              {t('modals.editTask.fields.description')}
            </label>
            <textarea
              id="edit-task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('modals.editTask.placeholders.description')}
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-task-due-date">
                {t('modals.editTask.fields.dueDate')}
              </label>
              <input
                type="date"
                id="edit-task-due-date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-task-priority">
                {t('modals.editTask.fields.priority')}
              </label>
              <select
                id="edit-task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">{t('modals.editTask.options.noPriority')}</option>
                <option value="1">{t('modals.editTask.options.priority1')}</option>
                <option value="2">{t('modals.editTask.options.priority2')}</option>
                <option value="3">{t('modals.editTask.options.priority3')}</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
              <span className="checkmark"></span>
              {t('modals.editTask.fields.completed')}
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="btn btn-secondary">
              {t('modals.editTask.buttons.cancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              {t('modals.editTask.buttons.update')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;