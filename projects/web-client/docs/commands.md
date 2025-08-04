# Build and Development Commands

This document contains all available commands for building, testing, and developing the Dungeon Crawler Web Client.

## Development Commands

### Starting the Application

```bash
# Start development server (default)
npm start
# Equivalent to: ng serve

# Start development server without live reload
npm run start:noreloading
# Equivalent to: ng serve --no-live-reload

# Start development server accessible on local network
npm run start:localnetwork
# Equivalent to: ng serve --host=0.0.0.0 --disable-host-check

# Start with production-like environment
npm run start:env:test
# Equivalent to: ng serve --configuration=productionLike

# Start for Docker environment
npm run start:docker
# Equivalent to: ng serve --host 0.0.0.0
```

### Building the Application

```bash
# Production build
npm run build
# Equivalent to: ng build --verbose --stats-json --delete-output-path --sourceMap=true --ts-config tsconfig.app.json --configuration=production

# Docker optimized build
npm run build:docker
# Equivalent to: ng build --verbose --stats-json --delete-output-path --sourceMap=true --ts-config tsconfig.build.json --configuration=production
```

## Testing Commands

```bash
# Run unit tests
npm test
# Equivalent to: ng test

# Run end-to-end tests
npm run e2e
# Equivalent to: ng e2e

# Run linting
npm run lint
# Equivalent to: ng lint
```

## Analysis Commands

```bash
# Analyze bundle size and dependencies
npm run explore-modules
# Equivalent to: source-map-explorer dist/web-client/* --no-border-checks
```

## Angular CLI Commands

### Generating Components and Services

```bash
# Generate a new component
ng generate component core/my-feature/components/my-component

# Generate a new service
ng generate service core/my-feature/services/my-service

# Generate a new module with routing
ng generate module core/my-feature --routing

# Generate a new interface
ng generate interface core/my-feature/interfaces/my-interface

# Generate a new enum
ng generate enum core/my-feature/constants/my-enum

# Generate a new directive
ng generate directive shared/directives/my-directive

# Generate a new pipe
ng generate pipe shared/pipes/my-pipe

# Generate a new guard
ng generate guard core/my-feature/guards/my-guard
```

### Module Management

```bash
# Generate a shared module
ng generate module shared/my-shared-module

# Generate a feature module with routing and lazy loading
ng generate module core/my-feature --routing --route my-feature --module app
```

## Docker Commands

```bash
# Build Docker image
docker build -t dungeon-crawler-web .

# Run Docker container
docker run -p 80:80 dungeon-crawler-web

# Run with environment variables
docker run -p 80:80 -e API_URL=https://api.example.com dungeon-crawler-web
```

## Development Workflow Commands

### Git Workflow

```bash
# Create and switch to feature branch
git checkout -b feature/my-new-feature

# Add and commit changes
git add .
git commit -m "feat(my-feature): add new functionality"

# Push feature branch
git push origin feature/my-new-feature

# Switch back to main branch
git checkout main

# Pull latest changes
git pull origin main

# Delete feature branch after merge
git branch -d feature/my-new-feature
```

### Code Quality

```bash
# Run TypeScript compiler check
npx tsc --noEmit

# Run linting with auto-fix
ng lint --fix

# Format code with Prettier (if configured)
npx prettier --write "src/**/*.{ts,html,scss}"

# Check for unused dependencies
npx depcheck
```

## Environment-Specific Commands

### Local Development

```bash
# Install dependencies
npm ci

# Clean install (removes node_modules first)
rm -rf node_modules package-lock.json && npm install

# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix
```

### CI/CD Pipeline Commands

```bash
# Install dependencies (CI environment)
npm ci --only=production

# Run tests with coverage
ng test --watch=false --browsers=ChromeHeadless --code-coverage

# Build for production
npm run build:docker

# Run e2e tests in headless mode
ng e2e --webdriver-update false
```

## Debugging Commands

### Angular DevTools

```bash
# Enable Angular DevTools in development
# Add to main.ts:
# import { enableDebugTools } from '@angular/platform-browser';
# enableDebugTools(appRef.components[0]);
```

### Performance Analysis

```bash
# Analyze bundle size
npm run explore-modules

# Generate build stats
ng build --stats-json

# Analyze with webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/web-client/stats.json
```

### Memory and Performance Profiling

```bash
# Build with source maps for debugging
ng build --source-map

# Serve production build locally for testing
npx http-server dist/web-client -p 8080

# Run Lighthouse audit
npx lighthouse http://localhost:4200 --output html --output-path ./lighthouse-report.html
```

## Custom npm Scripts

These are custom scripts defined in `package.json`:

```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "start:noreloading": "ng serve --no-live-reload",
    "start:localnetwork": "ng serve --host=0.0.0.0 --disable-host-check",
    "start:env:test": "ng serve --configuration=productionLike",
    "start:docker": "ng serve --host 0.0.0.0",
    "build": "ng build --verbose --stats-json --delete-output-path --sourceMap=true --ts-config tsconfig.app.json --configuration=production",
    "build:docker": "ng build --verbose --stats-json --delete-output-path --sourceMap=true --ts-config tsconfig.build.json --configuration=production",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "explore-modules": "source-map-explorer dist/web-client/* --no-border-checks"
  }
}
```

## Configuration Files

### Key Configuration Files and Their Purposes

- **angular.json**: Angular CLI workspace configuration
- **package.json**: Dependencies and npm scripts
- **tsconfig.json**: TypeScript compiler configuration
- **tsconfig.app.json**: App-specific TypeScript configuration
- **tsconfig.spec.json**: Test-specific TypeScript configuration
- **karma.conf.js**: Unit test configuration
- **protractor.conf.js**: E2E test configuration (deprecated)
- **tslint.json**: TypeScript linting rules

### Environment Files

- **src/environments/environment.ts**: Development environment
- **src/environments/environment.prod.ts**: Production environment

## Troubleshooting Commands

### Common Issues

```bash
# Clear npm cache
npm cache clean --force

# Clear Angular CLI cache
ng cache clean

# Rebuild node_modules
rm -rf node_modules package-lock.json
npm install

# Check Node and npm versions
node --version
npm --version

# Verify Angular CLI version
ng version

# Check for TypeScript errors
ng build --dry-run
```

### Memory Issues

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max_old_space_size=8192"
npm run build

# Or set it for a single command
NODE_OPTIONS="--max_old_space_size=8192" npm run build
```

### Port Conflicts

```bash
# Start on different port
ng serve --port 4201

# Kill process using port 4200
lsof -ti:4200 | xargs kill -9
```

## Performance Optimization

### Build Optimization Commands

```bash
# Analyze bundle size and optimization opportunities
ng build --stats-json
npx webpack-bundle-analyzer dist/web-client/stats.json

# Enable experimental build optimization
ng build --build-optimizer

# Check for unused code
npx ts-unused-exports tsconfig.json
```

### Runtime Performance

```bash
# Profile application performance
# Use Chrome DevTools Performance tab
# Enable Angular DevTools for component profiling
```

This command reference should help you efficiently work with the Dungeon Crawler Web Client during development, testing, and deployment phases.