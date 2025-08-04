# Dungeon Crawler Web Client

A sophisticated Angular-based web client for a dungeon crawler game featuring real-time gameplay, 3D graphics, and complex state management.

## Overview

This application is part of a larger dungeon crawler game system, providing the web interface for players to explore dungeons, manage characters, and engage in turn-based combat. Built with Angular 14, the client integrates with separate game logic and 3D rendering engines to deliver a rich gaming experience.

## Features

- **Real-time Dungeon Exploration**: Navigate through procedurally generated dungeons
- **Turn-based Combat**: Strategic card-based combat system
- **Character Management**: Create and customize heroes with classes, races, and origins
- **3D Graphics**: Integrated Three.js rendering for immersive visuals
- **Persistent Game State**: Save and load game progress
- **Internationalization**: Multi-language support (English, Polish)
- **Progressive Web App**: Offline capabilities and mobile-responsive design

## Technology Stack

- **Framework**: Angular 14
- **3D Graphics**: Three.js
- **State Management**: Custom store implementation
- **UI Components**: Bootstrap 4 + Custom components
- **Internationalization**: ngx-translate
- **Build Tools**: Angular CLI, Webpack
- **TypeScript**: Advanced patterns with mixins and decorators

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser with WebGL support

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd projects/web-client

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

### Build for Production

```bash
# Build for production
npm run build

# Build for Docker deployment
npm run build:docker
```

## Project Structure

```
src/
├── app/
│   ├── aspects/          # Cross-cutting concerns
│   │   ├── navigation/   # Routing and menu management
│   │   ├── notifications/# User notifications system
│   │   └── sound-effects/# Audio management
│   ├── core/            # Business logic modules
│   │   ├── adventure/   # Adventure mode gameplay
│   │   ├── dungeon/     # Dungeon combat system
│   │   ├── game/        # Core game mechanics
│   │   ├── game-data/   # Game data management
│   │   └── settings/    # User preferences
│   ├── shared/          # Reusable UI components
│   │   ├── buttons/     # Button components
│   │   ├── forms/       # Form controls
│   │   ├── dialogs/     # Modal and panel components
│   │   └── animations/  # Animation definitions
│   ├── infrastructure/ # Low-level services
│   │   ├── asset-loader/# Asset management
│   │   ├── configuration/# App configuration
│   │   └── data-storage/# Persistence layer
│   └── development/     # Development tools
└── assets/             # Static assets
    ├── audio/          # Sound effects and music
    ├── images/         # Game artwork and UI graphics
    └── i18n/           # Translation files
```

## Available Scripts

```bash
# Development
npm start                    # Start dev server
npm run start:localnetwork  # Start dev server accessible on network
npm run start:env:test      # Start with production-like environment

# Building
npm run build               # Production build
npm run build:docker        # Docker production build

# Testing
npm test                    # Run unit tests
npm run e2e                 # Run end-to-end tests
npm run lint                # Run linting

# Analysis
npm run explore-modules     # Analyze bundle size
```

## Key Concepts

### Module Architecture
The application uses a hierarchical module structure with clear separation between:
- **Aspects**: Cross-cutting concerns (navigation, notifications)
- **Core**: Business logic and game features
- **Shared**: Reusable UI components
- **Infrastructure**: Low-level technical services

### State Management
Custom state management system featuring:
- Reactive stores with RxJS
- Transactional operations for complex game state changes
- Automatic persistence to localStorage/IndexedDB
- Action-based state mutations

### Component Enhancement
Advanced TypeScript patterns including:
- Mixin-based component composition
- Runtime capability detection
- Dynamic behavior enhancement

### Game Integration
Seamless integration with game logic through:
- Command pattern for game actions
- Event-driven architecture for real-time updates
- Async/await patterns for sequential operations

## Development Workflow

1. **Feature Development**: Create feature modules in `core/` directory
2. **UI Components**: Build reusable components in `shared/` directory
3. **Services**: Implement business logic in module-specific services
4. **State Management**: Use store pattern for complex state
5. **Testing**: Add unit tests alongside components/services
6. **Documentation**: Update this README and create feature-specific docs

## Configuration

### Environment Files
- `environment.ts` - Development configuration
- `environment.prod.ts` - Production configuration

### Build Configuration
- `angular.json` - Angular CLI configuration
- `tsconfig.*.json` - TypeScript compiler settings
- `karma.conf.js` - Testing configuration

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

WebGL support required for 3D graphics.

## Performance Considerations

- Lazy loading for all major feature modules
- OnPush change detection strategy
- Asset optimization with webpack
- Service worker for caching (PWA)
- Bundle analysis tools included

## Troubleshooting

### Common Issues

**Build Errors**: Ensure all dependencies are installed with correct versions
```bash
rm -rf node_modules package-lock.json
npm install
```

**3D Graphics Issues**: Verify WebGL support in browser
```javascript
// Check WebGL support
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
console.log('WebGL supported:', !!gl);
```

**State Persistence Issues**: Clear browser storage
```javascript
localStorage.clear();
// Or open Developer Tools > Application > Storage > Clear storage
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the coding conventions
4. Add tests for new functionality
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Architecture

For detailed information about the application architecture, design patterns, and technical decisions, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Development Guide

For development setup, coding conventions, and workflow details, see [DEVELOPMENT.md](DEVELOPMENT.md).

## License

[License information to be added]