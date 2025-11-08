import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Toast.css';

const Toast = ({ message, type = 'info', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'times-circle';
      case 'warning':
        return 'exclamation-triangle';
      default:
        return 'info-circle';
    }
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <FontAwesomeIcon icon={getToastIcon()} className="toast-icon" />
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={onClose}>
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
    </div>
  );
};

export default Toast;