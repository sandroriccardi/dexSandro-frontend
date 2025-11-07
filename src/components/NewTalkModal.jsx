import React, { useState } from 'react';
import './NewTalkModal.css';

const StarRating = ({ rating, onRatingChange, disabled = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (star) => {
    if (!disabled) {
      onRatingChange(star);
    }
  };

  const handleStarHover = (star) => {
    if (!disabled) {
      setHoverRating(star);
    }
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${
            star <= (hoverRating || rating) ? 'star-filled' : 'star-empty'
          } ${disabled ? 'star-disabled' : ''}`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleStarLeave}
          disabled={disabled}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
      <span className="rating-text">({rating}/5)</span>
    </div>
  );
};

const NewTalkModal = ({ isOpen, onClose, onSubmit }) => {
  // Function to get current date and time in the format needed for datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    // Format: YYYY-MM-DDTHH:mm
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    date: getCurrentDateTime(),
    description: '',
    personalVibe: 0,
    managerVibe: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Update the date to current time whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        date: getCurrentDateTime()
      }));
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleRatingChange = (field, rating) => {
    setFormData(prev => ({
      ...prev,
      [field]: rating
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Date and time are required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.personalVibe === 0) {
      newErrors.personalVibe = 'Personal vibe rating is required';
    }

    if (formData.managerVibe === 0) {
      newErrors.managerVibe = 'Manager vibe rating is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        date: getCurrentDateTime(),
        description: '',
        personalVibe: 0,
        managerVibe: 0
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error submitting talk:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        date: getCurrentDateTime(),
        description: '',
        personalVibe: 0,
        managerVibe: 0
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Talk</h2>
          <button 
            className="modal-close-btn" 
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="talk-form">
          <div className="form-group">
            <label htmlFor="date">Date & Time *</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={errors.description ? 'error' : ''}
              rows="8"
              placeholder="Describe the talk in detail..."
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>Personal Vibe *</label>
            <StarRating
              rating={formData.personalVibe}
              onRatingChange={(rating) => handleRatingChange('personalVibe', rating)}
              disabled={isSubmitting}
            />
            {errors.personalVibe && <span className="error-message">{errors.personalVibe}</span>}
          </div>

          <div className="form-group">
            <label>Manager Vibe *</label>
            <StarRating
              rating={formData.managerVibe}
              onRatingChange={(rating) => handleRatingChange('managerVibe', rating)}
              disabled={isSubmitting}
            />
            {errors.managerVibe && <span className="error-message">{errors.managerVibe}</span>}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Talk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTalkModal;