# AI Integration Setup Instructions

## Setting up ChatGPT Integration

The application now includes AI features in two places:
1. **AI Page**: For generating titles from text content
2. **Add Task Modal**: For generating task titles from descriptions

To enable these AI features, you need to set up an OpenAI API key:

1. **Get an OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create an account or sign in
   - Generate a new API key

2. **Set up Environment Variables:**
   - Create a `.env` file in the root directory of the project
   - Add your API key:
   ```
   REACT_APP_OPENAI_API_KEY=your_actual_openai_api_key_here
   ```
   - **Important**: Never commit your `.env` file to version control
   - See `config.properties` for detailed configuration instructions

3. **Restart the Application:**
   - Stop the current server (Ctrl+C)
   - Run `npm start` again

## How the AI Features Work

### AI Page
1. **Text Input:** Type or paste any text in the textarea
2. **Live Preview:** The text appears in real-time in the "Live Text Output" section
3. **AI Title Suggestion:** Click "Get AI Title Suggestion" to get a proposed title for your text

### Add Task Modal (All Tasks page)
1. **Open Modal:** Click "Add Task" button on the All Tasks page
2. **Enter Description:** Fill in the task description field
3. **Generate Title:** Click "🤖 AI Title" button to automatically generate a task title
4. **Complete Task:** Fill in remaining fields and save the task

Both features include fallback mechanisms that work even without the OpenAI API key.

## Features

- Real-time text mirroring (AI Page)
- AI-powered title suggestions (AI Page)
- AI-powered task title generation (Add Task Modal)
- Loading states and error handling
- Responsive design
- Clean, modern UI

## Configuration

All OpenAI API settings are now fully externalized and centralized:

### Configuration Files:
- **Environment Variables**: Set in `.env` file (see `config.properties` for all available options)
- **App Configuration**: `src/config/app.config.js` - centralizes all config values with defaults
- **OpenAI Service**: `src/services/openai.service.js` - dedicated service for all OpenAI interactions

### Available Configuration Options:
```bash
# Required
REACT_APP_OPENAI_API_KEY=your_api_key_here

# Optional (with defaults)
REACT_APP_OPENAI_API_BASE_URL=https://api.openai.com/v1
REACT_APP_OPENAI_MAX_TOKENS=50
REACT_APP_OPENAI_TEMPERATURE=0.5
REACT_APP_OPENAI_TIMEOUT=30000
```

### Architecture Benefits:
- **Centralized**: All OpenAI logic in dedicated service
- **Configurable**: All settings externalized via environment variables
- **Secure**: No hardcoded API keys
- **Maintainable**: Single point of configuration
- **Testable**: Easy to mock the OpenAI service