import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewTalkModal from './NewTalkModal';
import TalkDetailModal from './TalkDetailModal';
import VibesChart from './VibesChart';
import CONFIG from '../config/app.config';
import './Talks.css';

const Talks = () => {
  const { t } = useTranslation();
  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTalk, setSelectedTalk] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const fetchTalks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${CONFIG.API.BASE_URL}/api/Talks`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setTalks(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching talks:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTalks();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (err) {
      return dateString;
    }
  };

  const handleNewTalk = async (talkData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${CONFIG.API.BASE_URL}/api/Talks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(talkData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTalk = await response.json();
      
      // Add the new talk to the list and sort by date
      setTalks(prevTalks => {
        const updatedTalks = [...prevTalks, newTalk];
        return updatedTalks.sort((a, b) => new Date(b.date) - new Date(a.date));
      });

      console.log('Talk created successfully:', newTalk);
    } catch (err) {
      console.error('Error creating talk:', err);
      throw err; // Re-throw to be handled by the modal
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    if (!rating || rating === 0) return 'N/A';
    return '★'.repeat(rating) + '☆'.repeat(5 - rating) + ` (${rating}/5)`;
  };

  const handleRowClick = (talk) => {
    setSelectedTalk(talk);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTalk(null);
  };

  if (loading) {
    return (
      <div className="talks-container">
        <div className="talks-header">
          <h1>{t('header.navigation.talks')}</h1>
        </div>
        <div className="talks-loading">
          <FontAwesomeIcon icon="spinner" spin />
          <p>Loading talks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="talks-container">
        <div className="talks-header">
          <h1>{t('header.navigation.talks')}</h1>
        </div>
        <div className="talks-error">
          <FontAwesomeIcon icon="exclamation-triangle" />
          <p>Error loading talks: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="talks-container">
      <div className="talks-header">
        <h1>{t('header.navigation.talks')}</h1>
        <p className="talks-count">Total talks: {talks.length}</p>
      </div>

      <div className="talks-actions">
        <button 
          className="btn btn-primary new-talk-btn"
          onClick={() => setIsModalOpen(true)}
          disabled={isSubmitting}
        >
          <FontAwesomeIcon icon="plus" />
          New Talk
        </button>
      </div>

      <VibesChart talks={talks} />
      
      {talks.length === 0 ? (
        <div className="talks-empty">
          <p>No talks found.</p>
        </div>
      ) : (
        <div className="talks-table-container">
          <table className="talks-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Personal Vibe</th>
                <th>Manager Vibe</th>
              </tr>
            </thead>
            <tbody>
              {talks.map((talk, index) => (
                <tr 
                  key={talk.id || index} 
                  className="talk-row clickable-row"
                  onClick={() => handleRowClick(talk)}
                  title="Click to view details"
                >
                  <td className="talk-date">{formatDate(talk.date)}</td>
                  <td className="talk-personal-vibe">{renderStars(talk.personalVibe)}</td>
                  <td className="talk-manager-vibe">{renderStars(talk.managerVibe)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NewTalkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewTalk}
      />

      <TalkDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        talk={selectedTalk}
      />
    </div>
  );
};

export default Talks;