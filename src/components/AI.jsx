import React, { useState } from 'react';
import './AI.css';
import openAIService from '../services/openai.service';
import Toast from './Toast';

const AI = () => {
  const [inputText, setInputText] = useState('');
  const [proposedTitle, setProposedTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', isVisible: false });

  const showToast = (message, type = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      showToast('Please enter some text to get a title suggestion', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const result = await openAIService.generateContentTitle(inputText);
      
      if (result.success) {
        setProposedTitle(result.title);
        
        if (result.warning) {
          // Show warning message instead of success when there's a warning
          showToast(`Title generated successfully! Warning: ${result.warning.message}`, 'warning');
        } else {
          // Show success message only when there are no warnings
          showToast('Title generated successfully!', 'success');
        }
      } else {
        // Handle error from OpenAI service
        const errorMessage = result.error?.message || 'Failed to generate title';
        const errorType = result.error?.type || 'error';
        
        showToast(errorMessage, errorType);
        
        // Fallback: Create a simple title suggestion
        const words = inputText.trim().split(' ');
        const firstFewWords = words.slice(0, 5).join(' ');
        setProposedTitle(`${firstFewWords}${words.length > 5 ? '...' : ''}`);
        
        // Show fallback message only for actual errors
        // setTimeout(() => {
        //   showToast('Using fallback title generation', 'info');
        // }, 2000);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      showToast('An unexpected error occurred', 'error');
      
      // Fallback: Create a simple title suggestion
      const words = inputText.trim().split(' ');
      const firstFewWords = words.slice(0, 5).join(' ');
      setProposedTitle(`${firstFewWords}${words.length > 5 ? '...' : ''}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-page">
      <h1>AI Page</h1>
      <div className="ai-container">
        <div className="input-section">
          <label htmlFor="text-input">Enter your text:</label>
          <textarea
            id="text-input"
            value={inputText}
            onChange={handleTextChange}
            placeholder="Type something here..."
            rows="4"
            cols="50"
          />
          <button 
            className="submit-button" 
            onClick={handleSubmit}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? 'Generating Title...' : 'Get AI Title Suggestion'}
          </button>
        </div>
        
        {/* <div className="output-section">
          <h3>Live Text Output:</h3>
          <div className="text-output">
            {inputText || 'Your text will appear here as you type...'}
          </div>
        </div> */}

        {proposedTitle && (
          <div className="summary-section">
            <h3>AI Proposed Title:</h3>
            <div className="summary-output">
              {proposedTitle}
            </div>
          </div>
        )}
      </div>
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={4000}
      />
    </div>
  );
};

export default AI;