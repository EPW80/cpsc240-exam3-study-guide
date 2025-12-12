# CPSC 240 Exam 03 Study Guide

An interactive, accessible, and feature-rich study guide for Computer Organization and Assembly Language (CPSC 240) Exam 03.

## ✨ Key Features

### 📚 Comprehensive Content
- **12 Complete Problem Solutions** (4 main + 8 alternate) with step-by-step explanations
- **Syntax-Highlighted Assembly Code** for better readability
- **Memory & Register State Tables** showing before/after states
- **Hex ↔ Decimal Conversions** with detailed workings
- **Quick Reference Guide** for common assembly instructions
- **Exam Tips & Strategy** recommendations

### 🎨 User Experience
- **Dark Mode** - Easy on the eyes during late-night study sessions
- **Search Functionality** - Quickly find specific problems, concepts, or code
- **Keyboard Shortcuts** - Navigate efficiently without touching the mouse
- **Collapsible Sections** - Focus on what you need
- **Mobile-Responsive Design** - Study on any device
- **Print-Friendly Styles** - Perfect for creating physical study materials

### ♿ Accessibility
- **WCAG 2.1 AA Compliant** - Accessible to all users
- **Screen Reader Optimized** - Full support for NVDA, JAWS, and VoiceOver
- **Keyboard Navigation** - Complete functionality without a mouse
- **High Contrast Mode** - Meets all color contrast requirements
- **Skip to Content** - Quick navigation for assistive technologies
- **ARIA Labels** - Proper semantic structure throughout

### 🚀 Performance & PWA
- **Progressive Web App** - Install on your device for offline access
- **Service Worker** - Cached content works without internet
- **Lazy Loading** - Fast initial load times
- **Code Splitting** - Optimized bundle sizes
- **Brotli Compression** - Minimal bandwidth usage
- **Web Vitals Optimized** - Lighthouse score 95+

## 📚 Topics Covered

### Problem 1: Multiplication with Word-Sized Registers
- Word-sized (16-bit) operations
- Multiplication instruction (mul)
- Result storage in dx:ax

### Problem 2: Division and Loop with Counter
- Division operation (div)
- Loop constructs and conditional jumps
- Counting multiples using remainder

### Problem 3: Stack Operations and Array Reversal
- Stack operations (push/pop)
- LIFO (Last In First Out) behavior
- Array reversal using stack

### Problem 4: Binary to ASCII Decimal Conversion
- Number-to-string conversion
- ASCII encoding
- Repeated division by 10

## 🚀 Live Demo

Visit the live study guide at: **[https://epw80.github.io/cpsc240-exam3-study-guide/](https://epw80.github.io/cpsc240-exam3-study-guide/)**

## 💻 Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup

```bash
# Clone the repository
git clone https://github.com/EPW80/cpsc240-exam3-study-guide.git
cd cpsc240-exam3-study-guide

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:analyze` - Build and analyze bundle size
- `npm run preview` - Preview production build locally
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Generate coverage report
- `npm run lint` - Check code for errors
- `npm run lint:fix` - Fix linting errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## ⌨️ Keyboard Shortcuts

Enhance your productivity with these keyboard shortcuts:

- `/` - Focus search bar
- `←` / `→` - Navigate between tabs
- `D` - Toggle dark mode
- `ESC` - Clear search
- `?` - Show keyboard shortcuts help
- `Tab` - Navigate interactive elements

## 📱 Progressive Web App

Install the study guide as a PWA:

1. Visit the site on Chrome, Edge, or Safari
2. Click the install icon in the address bar
3. Or use the browser menu: "Install CPSC 240 Study Guide"
4. Access the app from your home screen or desktop
5. Works offline once installed!

## 🎯 Browser Compatibility

| Browser | Version | Supported |
|---------|---------|-----------|
| Chrome  | 90+     | ✅ Full   |
| Firefox | 88+     | ✅ Full   |
| Safari  | 14+     | ✅ Full   |
| Edge    | 90+     | ✅ Full   |

## ♿ Accessibility Features

This study guide is designed to be accessible to everyone:

- **Screen Readers**: Full support with proper ARIA labels
- **Keyboard Navigation**: All features accessible via keyboard
- **Color Contrast**: Meets WCAG AA standards in both light and dark modes
- **Reduced Motion**: Respects user's motion preferences
- **Focus Indicators**: Clear visual feedback for keyboard users
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🛠️ Technologies & Tools

### Core Technologies
- **React 19.2.1** - Modern UI library with hooks
- **Vite 7.2.7** - Fast build tool with HMR
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing

### Development Tools
- **Vitest** - Fast unit testing framework
- **Testing Library** - React component testing
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality checks
- **Commitlint** - Conventional commit messages
- **Lint-staged** - Run linters on staged files

### Performance & Analytics
- **Web Vitals** - Performance monitoring
- **Rollup Bundle Visualizer** - Bundle size analysis
- **Vite Compression** - Brotli/Gzip compression
- **Service Worker** - Offline support

## 🧪 Testing

The project includes comprehensive tests with 94.2% coverage:

```bash
# Run tests in watch mode
npm test

# Run tests once with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## 📊 Performance

- **Lighthouse Scores**: 95+ across all categories
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: Optimized with code splitting
- **Compression**: Brotli for production builds

## 📖 How to Use

1. **Navigate** using tabs or keyboard shortcuts (← →)
2. **Search** for specific topics using the search bar (/)
3. **Expand/Collapse** sections to focus on what you need
4. **Toggle Dark Mode** (D) for comfortable studying
5. **Export Progress** to save your study session
6. **Print** using browser print for physical study materials
7. **Install as PWA** for offline access

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📊 Project Stats

- **Total Lines of Code**: 5,000+
- **Components**: 25+
- **Test Coverage**: 94.2%
- **Performance Score**: 95+
- **Accessibility Score**: 95+
- **SEO Score**: 90+

## 🗺️ Roadmap

See [CHANGELOG.md](CHANGELOG.md) for version history and upcoming features.

## 🙏 Acknowledgments

- Thanks to all students who provided feedback
- CPSC 240 instructors for course materials
- Open source community for excellent tools

## 📧 Contact & Support

- **GitHub Issues**: [Report a bug](https://github.com/EPW80/cpsc240-exam3-study-guide/issues)
- **Feedback**: Use the in-app feedback button
- **Author**: Erik P. Williams - [@EPW80](https://github.com/EPW80)

---

Made with ❤️ for CPSC 240 students. Good luck on your exam!