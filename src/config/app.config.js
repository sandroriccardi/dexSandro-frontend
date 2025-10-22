/**
 * Application Configuration
 * Centralized configuration for API keys and other settings
 */

const CONFIG = {
  // OpenAI API Configuration
  OPENAI: {
    API_KEY: process.env.REACT_APP_OPENAI_API_KEY || null,
    API_BASE_URL: process.env.REACT_APP_OPENAI_API_BASE_URL || 'https://api.openai.com/v1',
    ENDPOINTS: {
      CHAT_COMPLETIONS: '/chat/completions'
    },
    MODELS: {
      GPT_3_5_TURBO: 'gpt-3.5-turbo',
      GPT_4: 'gpt-4',
      DEFAULT: 'gpt-3.5-turbo'
    },
    SETTINGS: {
      MAX_TOKENS: parseInt(process.env.REACT_APP_OPENAI_MAX_TOKENS) || 50,
      TEMPERATURE: parseFloat(process.env.REACT_APP_OPENAI_TEMPERATURE) || 0.7,
      TIMEOUT: parseInt(process.env.REACT_APP_OPENAI_TIMEOUT) || 30000
    },
    HEADERS: {
      'Content-Type': 'application/json'
    }
  },
  
  // Backend API Configuration
  API: {
    BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5135',
    TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000
  }
};

export default CONFIG;