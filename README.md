# Dungeon Crawler

A monorepo containing various components for a dungeon crawler game, built with Nx.

## Projects

- **3d-scene**: 3D scene rendering and game objects
- **game-logic**: Core game mechanics and logic
- **utils**: Shared utilities and helpers
- **game-ai**: AI systems for game entities
- **web-client**: Angular web application

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Install dependencies for all projects:
   ```bash
   npm install
   ```

> **Note**: This monorepo uses centralized dependency management. All dependencies are installed at the root level and shared across projects. Individual project `npm install` commands are not needed.

### Dependency Management

This monorepo consolidates all dependencies in the root `package.json`:

- **Runtime dependencies**: Angular, RxJS, Three.js, Bootstrap, etc.
- **Development dependencies**: TypeScript, Jest, Webpack, ESLint, etc.
- **Build tools**: Nx, Angular CLI, TypeScript compiler
- **Testing frameworks**: Jest, Karma, Jasmine

Benefits:
- Single `npm install` for entire workspace
- Consistent dependency versions across projects
- Reduced disk space and installation time
- Better Nx caching and build optimization

## Development

### Build

Build all projects:
```bash
npm run build
```

Build specific project:
```bash
# Using Nx commands
npx nx build 3d-scene
npx nx build game-logic
npx nx build utils
npx nx build game-ai
npx nx build web-client

# Using npm scripts (recommended)
npm run build:web-client
npm run build:3d-scene
npm run build:game-logic
npm run build:utils
npm run build:game-ai
```

### Test

Run tests for all projects:
```bash
npm run test
```

Run tests for specific project:
```bash
# Using Nx commands
npx nx test 3d-scene
npx nx test game-logic
npx nx test utils
npx nx test game-ai
npx nx test web-client

# Using npm scripts (recommended)
npm run test:web-client
npm run test:3d-scene
npm run test:game-logic
npm run test:utils
npm run test:game-ai
```

### Lint

Lint all projects:
```bash
npm run lint
```

Lint specific project:
```bash
npx nx lint 3d-scene
npx nx lint game-logic
npx nx lint utils
npx nx lint game-ai
npx nx lint web-client
```

### Development Servers

Start the development server for the web client:
```bash
# Using Nx command
npx nx serve web-client

# Using npm script (recommended)
npm run serve:web-client
```

### Custom Project Commands

Run custom project-specific commands:
```bash
# 3D Scene development server
npm run start:3d-scene

# Game AI example
npm run start:game-ai

# Game Logic example
npm run start:game-logic-example

# TypeScript watch mode for libraries
npx nx run utils:compile
npx nx run game-logic:compile
npx nx run game-ai:compile

# Export packages
npx nx run utils:export
npx nx run game-logic:export
npx nx run game-ai:export
```

### Utility Commands

```bash
# View dependency graph
npm run graph
npm run dep-graph

# Explore web-client bundle
npm run explore-modules

# Nx cache management
npm run reset
```

## Project Structure

```
dungeon-crawler/
├── projects/
│   ├── 3d-scene/          # 3D scene rendering
│   ├── game-logic/         # Core game mechanics
│   ├── utils/              # Shared utilities
│   ├── game-ai/            # AI systems
│   └── web-client/         # Angular web app
├── nx.json                 # Nx configuration
├── package.json            # Root package.json
├── tsconfig.base.json      # Base TypeScript config
└── .eslintrc.json         # ESLint configuration
```

## Available Commands

### Nx Commands
- `npx nx graph` - View dependency graph
- `npx nx affected:build` - Build affected projects
- `npx nx affected:test` - Test affected projects
- `npx nx reset` - Clear Nx cache

### NPM Scripts (Recommended)
- `npm run build:*` - Build specific projects
- `npm run test:*` - Test specific projects
- `npm run serve:web-client` - Start web client dev server
- `npm run start:*` - Run project-specific commands
- `npm run graph` - View dependency graph
- `npm run explore-modules` - Analyze web-client bundle

## Contributing

1. Make changes in the appropriate project directory
2. Run tests: `npm run test:<project-name>` or `npx nx test <project-name>`
3. Run linting: `npx nx lint <project-name>`
4. Build project: `npm run build:<project-name>` or `npx nx build <project-name>`
5. Commit changes following conventional commit format

### Example Workflow
```bash
# Make changes to web-client
npm run test:web-client
npm run build:web-client
npm run serve:web-client

# Make changes to utils
npm run test:utils
npm run build:utils
```

## License

MIT
