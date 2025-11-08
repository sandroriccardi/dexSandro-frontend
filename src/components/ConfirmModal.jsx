import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="form-actions">
          <button onClick={onConfirm} className="confirm-button">
            <FontAwesomeIcon icon="check" />
            Yes
          </button>
          <button onClick={onClose} className="cancel-button">
            <FontAwesomeIcon icon="times" />
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
