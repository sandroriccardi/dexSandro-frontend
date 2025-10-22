import React, { useState } from 'react';
import './AI.css';
import openAIService from '../services/openai.service.js';

const AI = () => {
  const [inputText, setInputText] = useState('');
  const [proposedTitle, setProposedTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to get a title suggestion');
      return;
    }

    setIsLoading(true);
    try {
      const generatedTitle = await openAIService.generateContentTitle(inputText);
      setProposedTitle(generatedTitle);
    } catch (error) {
      console.error('Error getting title:', error);
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
    </div>
  );
};

export default AI;