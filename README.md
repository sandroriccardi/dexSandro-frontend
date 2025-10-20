# DexSandro Frontend

A modern React.js web application featuring a clean, responsive design with task management functionality.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and functional components
- **Responsive Design**: Mobile-first approach that works on all devices
- **Task Management**: Interactive task manager with add, complete, and delete functionality
- **Component-Based Structure**: Modular design with Header, Body, Footer, and Tasks components
- **Modern UI/UX**: Gradient backgrounds, smooth animations, and hover effects
- **Glass Morphism**: Semi-transparent elements with backdrop blur effects

## 📁 Project Structure

```
dexSandro-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Header.js           # Navigation header component
│   │   ├── Header.css          # Header styles
│   │   ├── Body.js             # Main content component
│   │   ├── Body.css            # Body styles
│   │   ├── Footer.js           # Footer component
│   │   ├── Footer.css          # Footer styles
│   │   ├── Tasks.js            # Task management component
│   │   └── Tasks.css           # Tasks styles
│   ├── App.js                  # Main application component
│   ├── App.css                 # Global application styles
│   └── index.js                # Application entry point
├── package.json                # Dependencies and scripts
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## 🛠️ Technologies Used

- **React 18.2.0** - Frontend framework
- **React DOM 18.2.0** - DOM rendering
- **React Scripts 5.0.1** - Build tools and development server
- **CSS3** - Styling with modern features (Grid, Flexbox, Gradients)
- **HTML5** - Semantic markup

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

- **`npm start`** - Runs the app in development mode
- **`npm run build`** - Builds the app for production
- **`npm test`** - Launches the test runner
- **`npm run eject`** - Ejects from Create React App (one-way operation)

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

### Task Management
- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete unwanted tasks
- ✅ Real-time task statistics
- ✅ Persistent state during session
- ✅ Responsive design for mobile devices

### Design Elements
- 🌈 **Gradient Backgrounds**: Purple-blue color scheme
- 💨 **Smooth Animations**: Hover effects and transitions
- 📱 **Mobile-First Design**: Responsive on all screen sizes
- 🔍 **Glass Morphism**: Modern transparent elements
- 🎨 **Modern Typography**: Clean and readable fonts

## 🚀 Production Build

To create a production build:

```bash
npm run build
```

To serve the production build locally:

```bash
npx serve -s build -p 3000
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

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