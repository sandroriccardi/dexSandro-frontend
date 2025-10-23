/**
 * OpenAI API Service
 * Centralizes all OpenAI API interactions
 */

import CONFIG from '../config/app.config.js';

class OpenAIService {
  constructor() {
    this.apiKey = CONFIG.OPENAI.API_KEY;
    this.baseUrl = CONFIG.OPENAI.API_BASE_URL;
    this.timeout = CONFIG.OPENAI.SETTINGS.TIMEOUT;
  }

  /**
   * Check if OpenAI API is configured
   * @returns {boolean}
   */
  isConfigured() {
    return !!this.apiKey;
  }

  /**
   * Make API call to OpenAI
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request data
   * @returns {Promise<object>} - API response
   */
  async makeRequest(endpoint, data) {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key not configured');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          ...CONFIG.OPENAI.HEADERS,
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `OpenAI API error: ${response.status}`;
        const errorType = response.status >= 500 ? 'error' : 'warning';
        throw new Error(JSON.stringify({ 
          message: errorMessage, 
          type: errorType, 
          status: response.status,
          code: errorData.error?.code 
        }));
      }

      const responseData = await response.json();
      
      // Check for warnings in the response
      if (responseData.warning) {
        console.warn('OpenAI API Warning:', responseData.warning);
      }

      return responseData;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('OpenAI API request timeout');
      }
      throw error;
    }
  }

  /**
   * Generate title using ChatGPT
   * @param {string} text - Input text
   * @param {object} options - Generation options
   * @returns {Promise<object>} - Generated title with metadata
   */
  async generateTitle(text, options = {}) {
    const {
      model = CONFIG.OPENAI.MODELS.DEFAULT,
      maxTokens = CONFIG.OPENAI.SETTINGS.MAX_TOKENS,
      temperature = CONFIG.OPENAI.SETTINGS.TEMPERATURE,
      prompt = 'Please suggest a concise and engaging title for the following text. Return only the title, nothing else:'
    } = options;

    try {
      const data = await this.makeRequest(CONFIG.OPENAI.ENDPOINTS.CHAT_COMPLETIONS, {
        model,
        messages: [
          {
            role: "user",
            content: `${prompt}\n\n${text}`
          }
        ],
        max_tokens: maxTokens,
        temperature
      });

      const result = {
        title: data.choices[0].message.content.trim(),
        success: true
      };

      // Check for any warnings or usage information
      if (data.usage && data.usage.total_tokens > (maxTokens * 0.8)) {
        result.warning = {
          message: 'Response is approaching token limit',
          type: 'warning'
        };
      }

      return result;
    } catch (error) {
      console.warn('Failed to generate AI title:', error);
      
      // Try to parse structured error
      let parsedError;
      try {
        parsedError = JSON.parse(error.message);
      } catch {
        parsedError = { 
          message: error.message, 
          type: 'error' 
        };
      }

      return {
        title: null,
        success: false,
        error: parsedError
      };
    }
  }

  /**
   * Generate task title specifically
   * @param {string} description - Task description
   * @returns {Promise<object>} - Generated task title with metadata
   */
  async generateTaskTitle(description) {
    return this.generateTitle(description, {
      prompt: 'Please suggest a concise and engaging task title for the following task description. Return only the title, nothing else:'
    });
  }

  /**
   * Generate general title for content
   * @param {string} content - Content to generate title for
   * @returns {Promise<object>} - Generated title with metadata
   */
  async generateContentTitle(content) {
    return this.generateTitle(content, {
      prompt: 'Please suggest a concise and engaging title that summarises the task to be taken for the following text. Return only the title, nothing else:'
    });
  }
}

// Create singleton instance
const openAIService = new OpenAIService();

export default openAIService;