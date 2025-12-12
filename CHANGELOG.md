# Changelog

All notable changes to the CPSC 240 Exam 03 Study Guide will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-01-11

### Added - Phase 7: Accessibility & SEO
- ✅ WCAG 2.1 AA compliance with comprehensive ARIA labels
- ✅ Semantic HTML with proper role attributes (header, nav, main, footer)
- ✅ Skip-to-content link for keyboard navigation
- ✅ Improved focus indicators for keyboard users
- ✅ Screen reader optimization with aria-live regions
- ✅ SEO optimization with meta tags, Open Graph, and Twitter Card
- ✅ Structured data (JSON-LD) for educational content
- ✅ Robots.txt and sitemap.xml for search engines
- ✅ Reduced motion support for user preferences
- ✅ Tab panel ARIA attributes for proper navigation

### Added - Phase 8: Analytics & Feedback
- ✅ User feedback modal component with rating system
- ✅ Feedback storage in localStorage
- ✅ Web Vitals performance monitoring
- ✅ Ready for analytics integration (GA4/Plausible)

### Added - Phase 9: Documentation & PWA
- ✅ Comprehensive README with feature highlights
- ✅ ISC License file
- ✅ CHANGELOG.md with version history
- ✅ CONTRIBUTING.md for contributors
- ✅ Progressive Web App (PWA) support
- ✅ Service Worker for offline functionality
- ✅ Web App Manifest for installation
- ✅ Browser compatibility documentation
- ✅ Keyboard shortcuts reference

### Improved
- Enhanced dark mode support throughout all components
- Better color contrast in both light and dark modes
- Improved TabNavigation with proper ARIA attributes
- CollapsibleSection now has aria-expanded states
- Footer with proper semantic HTML
- Loading spinner with accessibility attributes

## [1.0.0] - 2024-12-15

### Added - Phase 6: Feature Enhancement
- ✅ Search functionality with debouncing
- ✅ Keyboard shortcuts system (/, ←, →, D, ESC, ?)
- ✅ Dark mode with localStorage persistence
- ✅ Print-friendly CSS styles
- ✅ Progress export/import functionality
- ✅ Keyboard shortcuts help modal
- ✅ Enhanced mobile responsiveness

### Added - Phase 5: Performance Optimization
- ✅ Lazy loading for problem components
- ✅ Code splitting with React.lazy()
- ✅ Brotli compression for production builds
- ✅ Web Vitals monitoring and reporting
- ✅ Bundle size visualization
- ✅ Resource hints (preconnect, dns-prefetch)

### Added - Phase 4: Developer Experience
- ✅ Husky for Git hooks
- ✅ ESLint for code quality
- ✅ Prettier for code formatting
- ✅ Commitlint for conventional commits
- ✅ Lint-staged for pre-commit checks

### Added - Phase 3: Testing & Quality
- ✅ Vitest testing framework
- ✅ React Testing Library setup
- ✅ 41 comprehensive tests
- ✅ 94.2% test coverage
- ✅ Component tests for shared components
- ✅ Context and hooks testing

### Added - Phase 2: Architecture Improvements
- ✅ React Context for state management
- ✅ Custom hooks (useLocalStorage, useKeyboardShortcuts)
- ✅ Component composition and reusability
- ✅ Proper file structure and organization
- ✅ Modular CSS with Tailwind

### Added - Phase 1: Initial Release
- ✅ 11 complete problem solutions (4 main + 7 alternate)
- ✅ Interactive collapsible sections
- ✅ Syntax-highlighted assembly code
- ✅ Memory and register state tables
- ✅ Hex-decimal conversion tables
- ✅ Quick reference guide
- ✅ Exam tips and strategies
- ✅ Mobile-responsive design
- ✅ Tailwind CSS styling

## [Unreleased]

### Planned Features
- Analytics dashboard with usage metrics
- Problem completion tracking with visual progress
- Spaced repetition study mode
- Flashcard mode for key concepts
- Quiz mode with randomized questions
- Notes and annotations system
- Share individual problems via URL
- Multi-language support
- PDF export functionality
- Video tutorial integration

---

**Note**: This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible changes
- **MINOR** version for new features (backwards compatible)
- **PATCH** version for bug fixes (backwards compatible)
