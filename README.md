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

2. Install dependencies for individual projects:
   ```bash
   npm install --prefix projects/3d-scene
   npm install --prefix projects/game-logic
   npm install --prefix projects/utils
   npm install --prefix projects/game-ai
   npm install --prefix projects/web-client
   ```

## Development

### Build

Build all projects:
```bash
npm run build
```

Build specific project:
```bash
npx nx build 3d-scene
npx nx build game-logic
npx nx build utils
npx nx build game-ai
npx nx build web-client
```

### Test

Run tests for all projects:
```bash
npm run test
```

Run tests for specific project:
```bash
npx nx test 3d-scene
npx nx test game-logic
npx nx test utils
npx nx test game-ai
npx nx test web-client
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

### Serve (Web Client)

Start the development server for the web client:
```bash
npx nx serve web-client
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

## Nx Commands

- `npx nx graph` - View dependency graph
- `npx nx affected:build` - Build affected projects
- `npx nx affected:test` - Test affected projects
- `npx nx reset` - Clear Nx cache

## Contributing

1. Make changes in the appropriate project directory
2. Run tests: `npx nx test <project-name>`
3. Run linting: `npx nx lint <project-name>`
4. Commit changes following conventional commit format

## License

MIT
