# Contributing to Dungeon Crawler Web Client

Thank you for your interest in contributing to the Dungeon Crawler Web Client! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Issue Reporting](#issue-reporting)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Examples of behavior that contributes to creating a positive environment include:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior include:**

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git** (latest version)
- Basic knowledge of **Angular**, **TypeScript**, and **RxJS**
- Familiarity with **Three.js** (for 3D-related contributions)

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/dungeon-crawler.git
   cd dungeon-crawler/projects/web-client
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/dungeon-crawler.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Verify setup**
   ```bash
   npm start
   # Should start the development server on http://localhost:4200
   ```

### Understanding the Codebase

Before making changes, familiarize yourself with:

- **[Architecture Documentation](ARCHITECTURE.md)**: System design and patterns
- **[Development Guide](DEVELOPMENT.md)**: Coding conventions and workflow
- **[Commands Reference](docs/commands.md)**: Available build and development commands

## Development Process

### 1. Planning Your Contribution

#### For Bug Fixes
- Check existing issues to avoid duplicates
- Create an issue if one doesn't exist
- Discuss the approach in the issue comments

#### For New Features
- Create a feature request issue first
- Wait for maintainer approval before starting work
- Consider breaking large features into smaller increments

#### For Documentation
- Check for existing documentation
- Ensure your changes align with the project's documentation standards

### 2. Creating a Feature Branch

```bash
# Ensure you're on the main branch and it's up to date
git checkout main
git pull upstream main

# Create and switch to your feature branch
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b fix/issue-description

# For documentation
git checkout -b docs/documentation-update
```

### 3. Making Changes

#### Development Guidelines

- **Follow the coding standards** outlined in this document
- **Write tests** for new functionality
- **Update documentation** as needed
- **Keep commits focused** and atomic
- **Test your changes** thoroughly

#### Code Quality Checklist

- [ ] Code follows TypeScript and Angular best practices
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] No console errors or warnings
- [ ] Performance impact considered
- [ ] Accessibility guidelines followed
- [ ] Browser compatibility maintained

### 4. Testing Your Changes

```bash
# Run unit tests
npm test

# Run linting
npm run lint

# Build the project
npm run build

# Test in different browsers
npm start
# Then test in Chrome, Firefox, Safari, Edge
```

## Coding Standards

### TypeScript Guidelines

#### 1. Type Safety
```typescript
// Good: Strong typing
interface IGameState {
  readonly phase: GamePhase;
  players: ReadonlyArray<IPlayer>;
  currentPlayerId: string | null;
}

// Avoid: Any types
// let gameData: any = {};
```

#### 2. Naming Conventions
```typescript
// Interfaces start with 'I'
interface IPlayer { }

// Classes use PascalCase
class GameService { }

// Constants use SCREAMING_SNAKE_CASE
const MAX_PLAYERS = 4;

// Methods and variables use camelCase
public calculateDamage(): number { }
private readonly playerCount = 0;
```

#### 3. Method Structure
```typescript
// Public methods first, then private
export class ExampleService {
  // Public properties
  public readonly state$: Observable<IState>;
  
  // Constructor
  constructor(private dependency: SomeDependency) {}
  
  // Public methods
  public publicMethod(): void {
    this.privateMethod();
  }
  
  // Private methods
  private privateMethod(): void {
    // Implementation
  }
}
```

### Angular Conventions

#### 1. Component Structure
```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent implements OnInit, OnDestroy {
  @Input() inputProperty: string;
  @Output() outputEvent = new EventEmitter<string>();
  
  private readonly destroy$ = new Subject<void>();
  
  constructor(private service: ExampleService) {}
  
  ngOnInit(): void {
    // Initialization logic
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

#### 2. Template Guidelines
```html
<!-- Use trackBy for performance -->
<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item.name }}
</div>

<!-- Use async pipe for observables -->
<div *ngIf="data$ | async as data">
  {{ data.title }}
</div>

<!-- Proper event handling -->
<button 
  type="button"
  [disabled]="isLoading"
  (click)="onButtonClick($event)">
  Submit
</button>
```

### RxJS Best Practices

```typescript
// Use proper subscription management
export class ExampleComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.dataService.data$
      .pipe(
        takeUntil(this.destroy$),
        map(data => this.transform(data)),
        catchError(error => this.handleError(error))
      )
      .subscribe(transformedData => this.handleData(transformedData));
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Git Commit Guidelines

#### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process or auxiliary tools

#### Examples
```bash
feat(inventory): add drag and drop for items

Implement drag and drop functionality for inventory items
with visual feedback and proper collision detection.

- Add DragService for handling drag operations
- Update InventoryComponent with drag event handlers
- Add visual indicators for valid drop zones

Closes #123

fix(combat): correct damage calculation for spell critical hits

The critical hit multiplier was not being applied to spell damage
when calculating final damage values.

Fixes #456

docs(readme): update installation instructions

Add Node.js version requirement and npm install steps.
```

## Submitting Changes

### 1. Before Submitting

- [ ] All tests pass
- [ ] Code is properly formatted and linted
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] Changes are focused and atomic

### 2. Creating a Pull Request

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request on GitHub**
   - Use a descriptive title
   - Fill out the PR template completely
   - Link related issues
   - Add screenshots for UI changes

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes made.
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   - [ ] Code refactoring
   
   ## Testing
   - [ ] Unit tests pass
   - [ ] Integration tests pass
   - [ ] Manual testing completed
   
   ## Screenshots (if applicable)
   Add screenshots here
   
   ## Related Issues
   Closes #123
   ```

### 3. Code Review Process

- **Maintainer review**: All PRs require maintainer approval
- **Automated checks**: CI/CD pipeline must pass
- **Discussion**: Be responsive to feedback and questions
- **Updates**: Make requested changes promptly

### 4. After Approval

Once your PR is approved and merged:

1. **Update your local repository**
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Delete your feature branch**
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

## Issue Reporting

### Bug Reports

When reporting bugs, include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior**
4. **Actual behavior**
5. **Environment information**:
   - Browser and version
   - Operating system
   - Node.js version
   - Application version

#### Bug Report Template
```markdown
## Bug Description
A clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear description of what you expected to happen.

## Actual Behavior
A clear description of what actually happened.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
- Browser: [e.g., Chrome 95.0]
- OS: [e.g., macOS 12.0]
- Node.js: [e.g., 16.13.0]
- Application version: [e.g., 1.0.0]

## Additional Context
Add any other context about the problem here.
```

### Feature Requests

When requesting features:

1. **Describe the feature** and its benefits
2. **Explain the use case** or problem it solves
3. **Provide examples** or mockups if possible
4. **Consider alternatives** you've thought about

## Community

### Getting Help

- **Documentation**: Check [README](README.md), [Architecture](ARCHITECTURE.md), and [Development Guide](DEVELOPMENT.md)
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions and ideas

### Recognition

Contributors are recognized in:
- Release notes for significant contributions
- Contributors section in README
- Project acknowledgments

## Project Maintainers

Current maintainers:
- [Add maintainer information]

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to the Dungeon Crawler Web Client! Your efforts help make this project better for everyone.