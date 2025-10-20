# DexSandro Frontend

A modern, responsive React.js web application featuring a comprehensive task management system with beautiful UI/UX design and enterprise-grade API integration.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and functional components with hooks
- **Enterprise API Integration**: RESTful API integration following corporate standards
- **Task Management System**: Complete CRUD operations with real-time API synchronization
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

## 📁 Project Structure

```
dexSandro-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Header.js           # Navigation header with sticky positioning
│   │   ├── Header.css          # Header component styles
│   │   ├── Body.js             # Main content container
│   │   ├── Body.css            # Body component styles  
│   │   ├── Footer.js           # Site footer with links and info
│   │   ├── Footer.css          # Footer component styles
│   │   ├── Tasks.js            # Interactive task management component
│   │   └── Tasks.css           # Task component styles
│   ├── App.js                  # Root application component
│   ├── App.css                 # Global application styles
│   └── index.js                # Application entry point
├── build/                      # Production build output
├── nodemon.json               # Nodemon configuration for auto-rebuild
├── package.json               # Dependencies and scripts
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## 🛠️ Technologies Used

- **React 18.2.0** - Modern frontend framework with hooks
- **React DOM 18.2.0** - DOM rendering and manipulation
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
- **`npm test`** - Launches the test runner
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
- Navigation links: Home, About, Services, Contact
- Sticky positioning with gradient background
- Mobile-responsive with collapsible menu

### Body Component
- Main content area with hero section
- Welcome message and description
- "Getting Started" information card
- Integrated Tasks component

### Tasks Component
- Interactive task management system
- Add new tasks with input field
- Mark tasks as complete/incomplete
- Delete tasks functionality
- Real-time task statistics
- Local state management with React hooks

### Footer Component
- Company information and branding
- Quick navigation links
- Contact information
- Copyright notice
- Multi-column responsive layout

## 🎯 Features in Detail

### Task Management System
- ✅ **Add Tasks**: Input field with "Add Task" button and Enter key support
- ✅ **Complete Tasks**: Interactive checkboxes to mark completion status
- ✅ **Delete Tasks**: Remove unwanted tasks with delete button
- ✅ **Task Statistics**: Real-time display of total, completed, and remaining tasks
- ✅ **Visual Feedback**: Completed tasks show strikethrough and color changes
- ✅ **Persistent State**: Tasks remain during the session
- ✅ **Responsive Interface**: Mobile-friendly task management

### User Interface Design
- 🌈 **Gradient Backgrounds**: Purple-blue color scheme throughout
- 💨 **Smooth Animations**: Hover effects, transitions, and micro-interactions
- 📱 **Mobile-First Design**: Fully responsive on all screen sizes
- 🔍 **Glass Morphism**: Semi-transparent elements with backdrop blur
- 🎨 **Modern Typography**: Clean, readable fonts with proper hierarchy
- ⚡ **Interactive Elements**: Buttons, cards, and links with hover states

### Component Architecture
- 🏗️ **Header**: Sticky navigation with logo and menu links
- 📄 **Body**: Main content area with hero section and task manager
- 🦶 **Footer**: Company information, links, and contact details
- 📋 **Tasks**: Standalone task management component
- 🎯 **Modular Design**: Reusable and maintainable component structure

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

- **Components**: 4 main components (Header, Body, Footer, Tasks)
- **CSS Files**: 5 stylesheets with modular design
- **Build Size**: ~47KB gzipped JavaScript, ~1.6KB CSS
- **Dependencies**: 3 runtime dependencies, 1 dev dependency
- **Responsive**: Mobile-first design with breakpoints

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