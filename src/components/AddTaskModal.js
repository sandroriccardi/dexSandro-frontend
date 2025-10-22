import React, { useState } from 'react';
import './AddTaskModal.css';

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState();
  const [validationError, setValidationError] = useState('');

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setValidationError('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');
    
    if (!title || !description || !dueDate) {
      setValidationError('Please fill all required fields');
      return;
    }
    
    onAddTask({
      title,
      text: description,
      dueDate,
      priority
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setValidationError('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Task</h2>
        {validationError && (
          <div className="validation-error">
            {validationError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <input
              type='number'
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">Save</button>
            <button type="button" onClick={handleClose} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
