import React from 'react';
import './TalkDetailModal.css';

const StarRating = ({ rating }) => {
  if (!rating || rating === 0) return <span className="no-rating">No rating</span>;
  
  return (
    <div className="star-display">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'star-filled' : 'star-empty'}`}
        >
          ★
        </span>
      ))}
      <span className="rating-text">({rating}/5)</span>
    </div>
  );
};

const TalkDetailModal = ({ isOpen, onClose, talk }) => {
  if (!isOpen || !talk) return null;

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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="talk-detail-modal-overlay" onClick={handleOverlayClick}>
      <div className="talk-detail-modal-content">
        <div className="talk-detail-header">
          <h2>Talk Details</h2>
          <button 
            className="talk-detail-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        
        <div className="talk-detail-body">
          <div className="talk-detail-section">
            <h3>Date & Time</h3>
            <div className="talk-detail-datetime">
              <div className="talk-detail-date">{formatDate(talk.date)}</div>
              <div className="talk-detail-time">{formatTime(talk.date)}</div>
            </div>
          </div>

          <div className="talk-detail-section">
            <h3>Description</h3>
            <div className="talk-detail-description">
              {talk.description || 'No description provided'}
            </div>
          </div>

          <div className="talk-detail-section">
            <h3>Personal Vibe</h3>
            <StarRating rating={talk.personalVibe} />
          </div>

          <div className="talk-detail-section">
            <h3>Manager Vibe</h3>
            <StarRating rating={talk.managerVibe} />
          </div>

          {talk.id && (
            <div className="talk-detail-section">
              <h3>Talk ID</h3>
              <div className="talk-detail-id">#{talk.id}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalkDetailModal;