# DexSandro Frontend

A modern, responsive React.js web application featuring a comprehensive task management system with beautiful UI/UX design, enterprise-grade API integration, and client-side routing.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and functional components with hooks
- **Client-Side Routing**: React Router DOM for seamless navigation
- **Enterprise API Integration**: RESTful API integration following corporate standards
- **Task Management System**: Complete CRUD operations with real-time API synchronization
- **Data Table View**: Comprehensive table display of all tasks with sorting and filtering
- **Robust Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Visual feedback for all user operations
- **Responsive Design**: Mobile-first approach that adapts to all screen sizes
- **Component-Based Structure**: Modular design with reusable components
- **Modern UI/UX**: Gradient backgrounds, glass morphism, and smooth animations
- **Auto-Rebuild Development**: Nodemon integration for seamless development workflow
- **Production Ready**: Optimized build process for deployment

## 📋 API Integration

This application integrates with a RESTful API to manage tasks. See [API_INTEGRATION.md](./API_INTEGRATION.md) for detailed documentation on:

- API configuration and setup
- Service layer architecture
- Error handling strategy
- Custom hooks for state management
- Best practices implementation

### Quick API Setup

1. Ensure your API server is running on `http://localhost:5135`
2. The application expects these endpoints:
   - `GET /api/Tasks` - Get all tasks
   - `POST /api/Tasks` - Create new task
   - `PUT /api/Tasks/{id}` - Update task
   - `DELETE /api/Tasks/{id}` - Delete task

## 🧭 Navigation & Routing

The application uses React Router DOM for client-side navigation:

### Available Routes
- **`/`** - Home page with hero section and quick task management
- **`/all-tasks`** - Comprehensive data table view of all tasks

### Navigation Features
- **Active Link Highlighting**: Current page is visually indicated in navigation
- **Seamless Transitions**: No page reloads, smooth SPA experience
- **URL Management**: Clean, bookmarkable URLs for each section
- **Mobile Responsive**: Navigation adapts to mobile devices

### Route Components
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/all-tasks" element={<AllTasks />} />
</Routes>
```

For detailed navigation system documentation, see [NAVIGATION_README.md](./NAVIGATION_README.md).

## 🧪 Testing

The application includes comprehensive unit tests for all service layer components:

### Test Coverage
- **TasksApiService**: 85.71% statement coverage with 14 test cases
- **Complete CRUD Operations**: All API methods tested
- **Error Handling**: Network and validation error scenarios
- **Edge Cases**: Data sorting, validation, and boundary conditions

### Running Tests
```bash
# Run tests once
npm test -- --watchAll=false

# Run with coverage report
npm run test:coverage

# Run in watch mode during development
npm run test:watch
```

For detailed testing documentation, see [TESTING_README.md](./TESTING_README.md).

## 📁 Project Structure

```
dexSandro-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Header.js           # Navigation header with routing links
│   │   ├── Header.css          # Header component styles
│   │   ├── Home.js             # Home page component
│   │   ├── Body.js             # Main content container
│   │   ├── Body.css            # Body component styles
│   │   ├── AllTasks.js         # Task table view with API integration
│   │   ├── AllTasks.css        # AllTasks component styles
│   │   ├── Tasks.js            # Interactive task management component
│   │   ├── Tasks.css           # Task component styles
│   │   ├── Footer.js           # Site footer with links and info
│   │   └── Footer.css          # Footer component styles
│   ├── services/
│   │   ├── index.js            # Service exports
│   │   └── tasksApi.service.js # API service layer
│   ├── config/
│   │   └── api.config.js       # API configuration
│   ├── utils/
│   │   ├── httpClient.js       # HTTP client utility
│   │   └── errorHandler.js     # Error handling utility
│   ├── hooks/
│   │   ├── index.js            # Hook exports
│   │   └── useTasks.js         # Custom task management hook
│   ├── App.js                  # Root application component with routing
│   ├── App.css                 # Global application styles
│   └── index.js                # Application entry point
├── build/                      # Production build output
├── nodemon.json               # Nodemon configuration for auto-rebuild
├── package.json               # Dependencies and scripts
├── API_INTEGRATION.md         # API integration documentation
├── NAVIGATION_README.md       # Navigation system documentation
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## 🛠️ Technologies Used

- **React 18.2.0** - Modern frontend framework with hooks
- **React DOM 18.2.0** - DOM rendering and manipulation
- **React Router DOM** - Client-side routing and navigation
- **React Scripts 5.0.1** - Build tools and development server
- **Nodemon 3.1.10** - Auto-restart development tool
- **CSS3** - Advanced styling (Grid, Flexbox, Gradients, Animations)
- **HTML5** - Semantic markup and accessibility
- **NPX/NPM** - Package management and serving

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sandroriccardi/dexSandro-frontend.git
   cd dexSandro-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Available Scripts

- **`npm start`** or **`npm run dev`** - Runs the app in development mode with hot reloading
- **`npm run build`** - Builds the app for production
- **`npm run build:watch`** - Watches for changes and rebuilds automatically using nodemon
- **`npm run serve`** - Builds and serves the production app on port 3000
- **`npm run serve:watch`** - Watches for changes, rebuilds, and serves automatically
- **`npm test`** - Launches the test runner in interactive mode
- **`npm run test:watch`** - Runs tests in watch mode
- **`npm run test:coverage`** - Runs tests with coverage report
- **`npm run test:ci`** - Runs tests for continuous integration
- **`npm run eject`** - Ejects from Create React App (one-way operation)

## 🔄 Development Workflow

### Current Recommended Setup
```bash
npm run serve:watch
```
**Benefits:**
- ✅ **Auto-detects** file changes in `src/` folder
- ✅ **Automatically rebuilds** production bundle
- ✅ **Serves updated app** immediately
- ✅ **Production-like testing** environment
- ✅ **Terminal feedback** for build status and errors

### File Watching Configuration
The `nodemon.json` configuration watches:
- **File Types**: `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.scss`, `.json`
- **Watch Folder**: `src/` directory
- **Ignore**: Test files and node_modules
- **Delay**: 1000ms to avoid rapid rebuilds

### Development Tips
- 💡 **Save any file** in `src/` to trigger rebuild
- 💡 **Check terminal** for build status and error messages
- 💡 **Browser refresh** may be needed after rebuild completion
- 💡 **Type `rs`** in terminal to manually restart nodemon

## 🎨 Component Overview

### Header Component
- Responsive navigation bar with company logo
- React Router navigation links: Home, All Tasks, Services, Contact
- Active link highlighting based on current route
- Sticky positioning with gradient background
- Mobile-responsive design

### Home Component
- Landing page with hero section
- Welcome message and description
- "Getting Started" information card
- Integrated Tasks component for quick task management

### AllTasks Component
- Comprehensive data table view of all tasks
- Real-time API data fetching with loading states
- Responsive table design with priority and status badges
- Color-coded rows based on task priority
- Error handling and empty state management
- Mobile-optimized table scrolling

### Tasks Component
- Interactive task management system
- Add new tasks with input field
- Mark tasks as complete/incomplete
- Delete tasks functionality
- Real-time task statistics
- API integration with error handling

### Footer Component
- Company information and branding
- Quick navigation links
- Contact information
- Copyright notice
- Multi-column responsive layout

## 🎯 Features in Detail

### Navigation System
- ✅ **Client-Side Routing**: React Router DOM implementation
- ✅ **Active Link States**: Visual feedback for current page
- ✅ **Seamless Navigation**: No page reloads between routes
- ✅ **URL Management**: Clean URLs for each section

### Task Management System
- ✅ **Add Tasks**: Input field with "Add Task" button and Enter key support
- ✅ **Complete Tasks**: Interactive checkboxes to mark completion status
- ✅ **Delete Tasks**: Remove unwanted tasks with delete button
- ✅ **Task Statistics**: Real-time display of total, completed, and remaining tasks
- ✅ **Visual Feedback**: Completed tasks show strikethrough and color changes
- ✅ **API Integration**: Full CRUD operations with backend synchronization
- ✅ **Responsive Interface**: Mobile-friendly task management

### Data Table Features
- 📊 **Comprehensive View**: Display all tasks in organized table format
- 🏷️ **Status Badges**: Visual indicators for task status (Pending, In Progress, Completed, etc.)
- 🎯 **Priority Indicators**: Color-coded priority levels (Low, Medium, High, Urgent)
- 📅 **Date Formatting**: Human-readable creation and due dates
- 🔄 **Loading States**: Skeleton loading during API calls
- ❌ **Error Handling**: Graceful error display and recovery
- 📱 **Mobile Responsive**: Horizontal scrolling for mobile devices

### API Integration Architecture
- 🏗️ **Service Layer**: Organized API services following enterprise patterns
- 🔧 **HTTP Client**: Centralized HTTP request handling
- ⚠️ **Error Handling**: Comprehensive error catching and user feedback
- 📝 **Type Safety**: JSDoc documentation for better development experience
- 🔄 **Custom Hooks**: React hooks for state management and API calls

### User Interface Design
- 🌈 **Gradient Backgrounds**: Purple-blue color scheme throughout
- 💨 **Smooth Animations**: Hover effects, transitions, and micro-interactions
- 📱 **Mobile-First Design**: Fully responsive on all screen sizes
- 🔍 **Glass Morphism**: Semi-transparent elements with backdrop blur
- 🎨 **Modern Typography**: Clean, readable fonts with proper hierarchy
- ⚡ **Interactive Elements**: Buttons, cards, and links with hover states

### Component Architecture
- 🏗️ **Header**: Sticky navigation with logo and React Router links
- 🏠 **Home**: Landing page component wrapping Body content
- 📄 **Body**: Main content area with hero section and task manager
- 📊 **AllTasks**: Data table component with comprehensive task display
- 📋 **Tasks**: Interactive task management component
- 🦶 **Footer**: Company information, links, and contact details
- 🎯 **Modular Design**: Reusable and maintainable component structure
- 🔄 **Routing**: React Router integration for SPA navigation

## 🚀 Production Build

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `build/` folder with:
- Minified JavaScript and CSS
- Optimized images and assets
- Performance optimizations
- Ready for deployment

### Serve Production Build Locally
```bash
npm run serve
```
Builds and serves the production app on `http://localhost:3000`

### Quick Start for Development
```bash
# Clone the repository
git clone https://github.com/sandroriccardi/dexSandro-frontend.git
cd dexSandro-frontend

# Install dependencies
npm install

# Start auto-rebuild development (recommended)
npm run serve:watch
```

### Alternative Development Methods
```bash
# Manual build and serve
npm run serve

# Auto-rebuild only (no serving)
npm run build:watch

# Traditional React development server (has webpack issues currently)
npm start
```

## 📱 Browser Support & Performance

### Supported Browsers
- ✅ **Chrome** (latest versions)
- ✅ **Firefox** (latest versions)  
- ✅ **Safari** (latest versions)
- ✅ **Edge** (latest versions)
- ✅ **Mobile Safari** (iOS)
- ✅ **Chrome Mobile** (Android)

### Performance Features
- ⚡ **Code Splitting**: Optimized bundle sizes
- 🗜️ **Minification**: Compressed CSS and JavaScript
- 🖼️ **Asset Optimization**: Optimized images and resources
- 📦 **Tree Shaking**: Unused code elimination
- 🔄 **Caching**: Browser caching for static assets

## 🛡️ Known Issues

- **Development Server**: `npm start` currently has webpack-dev-server resolution issues
- **Workaround**: Use `npm run serve:watch` for development instead
- **Status**: Production builds and serving work perfectly

## 📊 Project Stats

- **Components**: 6 main components (Header, Home, Body, AllTasks, Tasks, Footer)
- **CSS Files**: 6 stylesheets with modular design
- **Routes**: 2 main routes (Home, All Tasks)
- **Services**: Complete API service layer with error handling
- **Build Size**: ~62KB gzipped JavaScript, ~2.5KB CSS
- **Dependencies**: 4 runtime dependencies (including React Router), 1 dev dependency
- **Responsive**: Mobile-first design with breakpoints
- **API Integration**: RESTful API with comprehensive error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Sandro Riccardi**
- GitHub: [@sandroriccardi](https://github.com/sandroriccardi)
- Project: [dexSandro-frontend](https://github.com/sandroriccardi/dexSandro-frontend)

## 🎉 Acknowledgments

- Built with Create React App
- Inspired by modern web design trends
- Uses semantic HTML5 and accessible design patterns

---

**Happy Coding!** 🚀