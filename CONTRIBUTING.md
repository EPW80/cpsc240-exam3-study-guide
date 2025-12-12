# Contributing to CPSC 240 Study Guide

First off, thank you for considering contributing to the CPSC 240 Study Guide! It's people like you that make this resource better for all students.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. By participating, you are expected to uphold this standard.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title** - A concise description of the issue
- **Steps to reproduce** - How to trigger the bug
- **Expected behavior** - What you expected to happen
- **Actual behavior** - What actually happened
- **Screenshots** - If applicable
- **Environment** - Browser, OS, screen size, etc.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When suggesting an enhancement:

- **Use a clear title** - Describe the enhancement
- **Provide detailed description** - Explain why this would be useful
- **Include examples** - Show how it would work
- **Consider alternatives** - Are there other ways to achieve this?

### Contributing Code

#### Good First Issues

Look for issues labeled `good first issue` - these are great for newcomers!

#### Areas for Contribution

- **Content**: Add new problems, improve explanations
- **Features**: Search improvements, new study tools
- **Accessibility**: Enhance WCAG compliance
- **Performance**: Optimize load times, reduce bundle size
- **Testing**: Increase test coverage
- **Documentation**: Improve guides and examples

## Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Setup Steps

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cpsc240-exam3-study-guide.git
   cd cpsc240-exam3-study-guide
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/EPW80/cpsc240-exam3-study-guide.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

### Project Structure

```
cpsc240-exam3-study-guide/
├── public/              # Static assets
│   ├── manifest.json   # PWA manifest
│   ├── robots.txt      # SEO robots file
│   └── sw.js           # Service worker
├── src/
│   ├── components/     # React components
│   │   ├── layout/    # Layout components (Header, Footer, etc.)
│   │   ├── problems/  # Problem components
│   │   ├── shared/    # Reusable components
│   │   └── reference/ # Reference guides
│   ├── context/       # React context
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   ├── constants/     # Constants and config
│   └── styles/        # CSS files
├── tests/             # Test files
└── docs/              # Documentation
```

## Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Run all tests**
   ```bash
   npm run test:run
   ```
4. **Check linting**
   ```bash
   npm run lint
   ```
5. **Format code**
   ```bash
   npm run format
   ```
6. **Build successfully**
   ```bash
   npm run build
   ```

### Submitting

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub with:
   - Clear title following commit conventions
   - Description of changes
   - Reference to related issues
   - Screenshots if UI changes
   - Checklist of completion criteria

3. **Wait for review** - Maintainers will review and may request changes

4. **Address feedback** - Make requested changes and push updates

5. **Merge** - Once approved, a maintainer will merge your PR

## Style Guidelines

### JavaScript/React

- Use functional components with hooks
- Use ES6+ features (arrow functions, destructuring, etc.)
- Keep components small and focused
- Use PropTypes or TypeScript for type checking
- Follow the existing code style

### CSS/Tailwind

- Use Tailwind utility classes when possible
- Keep custom CSS minimal
- Use dark mode variants (`dark:`)
- Ensure responsive design (`sm:`, `md:`, `lg:`)
- Maintain accessibility (focus states, contrast)

### File Naming

- Components: PascalCase (`MyComponent.jsx`)
- Utilities: camelCase (`myUtil.js`)
- Tests: `ComponentName.test.jsx`
- CSS: kebab-case (`custom-styles.css`)

### Code Organization

- One component per file
- Export at bottom of file
- Group imports: React, third-party, local
- Destructure props in function signature
- Use meaningful variable names

## Testing Guidelines

### Writing Tests

- Test user interactions, not implementation
- Use Testing Library queries (getByRole, getByText)
- Test accessibility features
- Mock external dependencies
- Aim for 80%+ coverage

### Test Structure

```javascript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test rendering
  });

  it('should handle user interaction', () => {
    // Test user events
  });

  it('should be accessible', () => {
    // Test accessibility
  });
});
```

### Running Tests

```bash
# Watch mode
npm test

# Run once
npm run test:run

# With coverage
npm run test:coverage

# UI mode
npm run test:ui
```

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```
feat(search): add fuzzy search functionality

Implement fuzzy search algorithm to improve search results.
Users can now find content with approximate matches.

Closes #123
```

```
fix(accessibility): improve keyboard navigation in tabs

- Add proper ARIA attributes
- Fix focus management
- Ensure tab key navigation works correctly

Fixes #456
```

```
docs(readme): update installation instructions

Add Node.js version requirement and troubleshooting section.
```

### Scope Examples

- `search`: Search functionality
- `dark-mode`: Dark mode feature
- `accessibility`: Accessibility improvements
- `tests`: Testing infrastructure
- `docs`: Documentation
- `ui`: User interface
- `performance`: Performance optimizations

## Questions?

Feel free to open an issue with the `question` label or reach out to [@EPW80](https://github.com/EPW80).

## Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute! 🎉
