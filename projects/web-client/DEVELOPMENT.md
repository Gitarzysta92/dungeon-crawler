# Development Guide

This guide provides comprehensive information for developers working on the Dungeon Crawler Web Client.

## Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Code Organization](#code-organization)
- [Coding Conventions](#coding-conventions)
- [Development Workflow](#development-workflow)
- [Testing Guidelines](#testing-guidelines)
- [Performance Best Practices](#performance-best-practices)
- [Debugging and Troubleshooting](#debugging-and-troubleshooting)
- [Build and Deployment](#build-and-deployment)

## Development Environment Setup

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)
- **Git**: Latest version
- **IDE**: Visual Studio Code (recommended) or WebStorm

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "angular.ng-template",
    "ms-vscode.typescript-hero",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "johnpapa.angular-essentials",
    "pkief.material-icon-theme",
    "ms-vscode.vscode-json"
  ]
}
```

### Environment Configuration

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd projects/web-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment files**
   ```bash
   # Copy environment templates
   cp src/environments/environment.ts src/environments/environment.local.ts
   ```

4. **Configure local environment** (if needed)
   ```typescript
   // src/environments/environment.local.ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api',
     enableDevTools: true,
     logLevel: 'debug'
   };
   ```

## Code Organization

### Folder Structure Conventions

```
src/app/
├── aspects/           # Cross-cutting concerns
│   ├── navigation/    # Menu, routing, breadcrumbs
│   ├── notifications/ # Toast notifications, alerts
│   └── sound-effects/ # Audio management
├── core/             # Feature modules (business logic)
│   ├── adventure/    # Adventure game mode
│   ├── dungeon/      # Dungeon combat system
│   ├── game/         # Core game mechanics
│   └── settings/     # User preferences
├── shared/           # Reusable UI components
│   ├── buttons/      # Button components
│   ├── forms/        # Form controls
│   ├── dialogs/      # Modals and overlays
│   └── animations/   # Animation definitions
├── infrastructure/   # Low-level services
│   ├── asset-loader/ # Asset management
│   ├── configuration/# App initialization
│   └── data-storage/ # Persistence layer
└── development/      # Development tools and utilities
```

### File Naming Conventions

- **Components**: `kebab-case.component.ts`
- **Services**: `kebab-case.service.ts`
- **Interfaces**: `kebab-case.interface.ts`
- **Constants**: `SCREAMING_SNAKE_CASE`
- **Enums**: `PascalCase.enum.ts`
- **Types**: `PascalCase.type.ts`

### Module Organization

Each feature module should follow this structure:

```
feature-module/
├── components/       # Feature-specific components
├── services/        # Business logic services
├── stores/          # State management
├── interfaces/      # Type definitions
├── constants/       # Module constants
├── guards/          # Route guards
├── resolvers/       # Route data resolvers
├── feature.module.ts
├── feature.routing.ts
└── api.ts          # Public API exports
```

## Coding Conventions

### TypeScript Style Guide

#### 1. Naming Conventions

```typescript
// Classes and Interfaces
export class GameService { }
export interface IGameState { }

// Constants
export const GAME_CONFIG = {
  MAX_PLAYERS: 4,
  TURN_TIMEOUT: 30000
};

// Enums
export enum GamePhase {
  Setup = 'setup',
  Playing = 'playing',
  Finished = 'finished'
}

// Methods and Variables
public calculateDamage(): number { }
private readonly playerCount = 0;
```

#### 2. Type Definitions

```typescript
// Use interfaces for object shapes
export interface IPlayer {
  readonly id: string;
  name: string;
  health: number;
  isActive: boolean;
}

// Use type aliases for unions and complex types
export type GameEvent = 
  | { type: 'PLAYER_JOINED'; player: IPlayer }
  | { type: 'GAME_STARTED'; timestamp: number }
  | { type: 'TURN_ENDED'; playerId: string };

// Use generics for reusable types
export interface IStore<T> {
  state$: Observable<T>;
  dispatch(action: string, payload?: unknown): void;
}
```

#### 3. Method Signatures

```typescript
// Use readonly for parameters that shouldn't be modified
public processMove(readonly move: IMove): Promise<IGameState> {
  // Implementation
}

// Use optional parameters appropriately
public createPlayer(name: string, options?: IPlayerOptions): IPlayer {
  // Implementation
}

// Use function overloads for complex signatures
public getData(id: string): Observable<IGameData>;
public getData(filter: IDataFilter): Observable<IGameData[]>;
public getData(param: string | IDataFilter): Observable<IGameData | IGameData[]> {
  // Implementation
}
```

### Angular Conventions

#### 1. Component Structure

```typescript
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit, OnDestroy {
  // Public properties first
  @Input() gameState: IGameState;
  @Output() moveSelected = new EventEmitter<IMove>();
  
  // Private properties
  private readonly destroy$ = new Subject<void>();
  
  constructor(
    private readonly gameService: GameService,
    private readonly cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    this.initialize();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // Public methods
  public onCellClick(position: IPosition): void {
    // Implementation
  }
  
  // Private methods
  private initialize(): void {
    // Implementation
  }
}
```

#### 2. Service Structure

```typescript
@Injectable({
  providedIn: 'root'
})
export class GameService {
  // Private properties
  private readonly _gameState$ = new BehaviorSubject<IGameState>(initialState);
  
  // Public observables
  public readonly gameState$ = this._gameState$.asObservable();
  
  constructor(
    private readonly http: HttpClient,
    private readonly store: StoreService
  ) {}
  
  // Public methods
  public async startGame(config: IGameConfig): Promise<void> {
    const gameState = await this.initializeGame(config);
    this._gameState$.next(gameState);
  }
  
  // Private methods
  private async initializeGame(config: IGameConfig): Promise<IGameState> {
    // Implementation
  }
}
```

#### 3. Template Conventions

```html
<!-- Use structural directives appropriately -->
<div *ngIf="gameState$ | async as gameState">
  <div *ngFor="let player of gameState.players; trackBy: trackPlayer">
    {{ player.name }}
  </div>
</div>

<!-- Use async pipe for observables -->
<div [class.active]="(isGameActive$ | async)">
  Game Board
</div>

<!-- Use event binding with proper naming -->
<button 
  type="button"
  [disabled]="!(canMakeMove$ | async)"
  (click)="onMoveClick($event)">
  Make Move
</button>
```

### RxJS Conventions

#### 1. Observable Naming

```typescript
// Use $ suffix for observables
public readonly gameState$: Observable<IGameState>;
private readonly _internalData$ = new BehaviorSubject<any>(null);

// Use descriptive names
public readonly isLoading$ = this.gameState$.pipe(
  map(state => state.isLoading)
);

public readonly canMakeMove$ = combineLatest([
  this.gameState$,
  this.currentPlayer$
]).pipe(
  map(([state, player]) => state.phase === 'playing' && player.isActive)
);
```

#### 2. Subscription Management

```typescript
export class BaseComponent implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  protected subscribeUntilDestroy<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(takeUntil(this.destroy$));
  }
}

// Usage in derived components
export class GameComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    this.subscribeUntilDestroy(this.gameService.gameState$)
      .subscribe(state => this.handleStateChange(state));
  }
}
```

#### 3. Error Handling

```typescript
public loadGameData(): Observable<IGameData> {
  return this.http.get<IGameData>('/api/game-data').pipe(
    retry(3),
    catchError(error => {
      console.error('Failed to load game data:', error);
      return of(this.getDefaultGameData());
    }),
    finalize(() => {
      this.loadingService.setLoading(false);
    })
  );
}
```

## Development Workflow

### 1. Feature Development Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/player-inventory-system
   ```

2. **Generate Module Structure**
   ```bash
   ng generate module core/inventory --routing
   ng generate service core/inventory/services/inventory
   ng generate component core/inventory/components/inventory-grid
   ```

3. **Implement Feature**
   - Start with interfaces and types
   - Implement services and business logic
   - Create components and templates
   - Add tests
   - Update documentation

4. **Test Locally**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

5. **Create Pull Request**
   - Ensure all tests pass
   - Update relevant documentation
   - Add screenshots for UI changes

### 2. Code Review Checklist

#### TypeScript/Angular
- [ ] Proper typing (no `any`)
- [ ] Correct lifecycle hook implementation
- [ ] Proper subscription management
- [ ] OnPush change detection where appropriate
- [ ] Proper error handling

#### Architecture
- [ ] Follows module structure conventions
- [ ] Appropriate separation of concerns
- [ ] Reusable components in shared modules
- [ ] Services are properly injectable

#### Performance
- [ ] Lazy loading for feature modules
- [ ] Efficient change detection
- [ ] Proper subscription cleanup
- [ ] Optimized bundle size

#### Security
- [ ] No hardcoded secrets
- [ ] Proper input validation
- [ ] XSS prevention
- [ ] CSRF protection

### 3. Git Workflow

#### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

**Examples:**
```
feat(inventory): add item drag and drop functionality

Implement drag and drop for inventory items with visual feedback
and proper collision detection.

Closes #123
```

```
fix(combat): correct damage calculation for critical hits

The critical hit multiplier was not being applied correctly
when calculating final damage values.

Fixes #456
```

## Testing Guidelines

### Unit Testing

#### 1. Service Testing

```typescript
describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService]
    });
    
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
  it('should start game with valid configuration', async () => {
    const config: IGameConfig = { playerCount: 2, difficulty: 'normal' };
    const expectedState: IGameState = { /* ... */ };
    
    const startGamePromise = service.startGame(config);
    
    const req = httpMock.expectOne('/api/game/start');
    expect(req.request.method).toBe('POST');
    req.flush(expectedState);
    
    const result = await startGamePromise;
    expect(result).toEqual(expectedState);
  });
});
```

#### 2. Component Testing

```typescript
describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let gameService: jasmine.SpyObj<GameService>;
  
  beforeEach(() => {
    const gameServiceSpy = jasmine.createSpyObj('GameService', ['makeMove']);
    
    TestBed.configureTestingModule({
      declarations: [GameBoardComponent],
      providers: [
        { provide: GameService, useValue: gameServiceSpy }
      ]
    });
    
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
  });
  
  it('should emit move when cell is clicked', () => {
    const position: IPosition = { x: 1, y: 1 };
    spyOn(component.moveSelected, 'emit');
    
    component.onCellClick(position);
    
    expect(component.moveSelected.emit).toHaveBeenCalledWith({
      type: 'move',
      position
    });
  });
});
```

### Integration Testing

```typescript
describe('Game Integration', () => {
  let app: ComponentFixture<AppComponent>;
  let gameService: GameService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        GameModule
      ],
      declarations: [AppComponent]
    });
    
    app = TestBed.createComponent(AppComponent);
    gameService = TestBed.inject(GameService);
  });
  
  it('should complete full game flow', async () => {
    // Start game
    await gameService.startGame({ playerCount: 2 });
    
    // Make moves
    await gameService.makeMove({ type: 'attack', target: 'enemy' });
    
    // Verify game state
    const finalState = await gameService.gameState$.pipe(take(1)).toPromise();
    expect(finalState.phase).toBe('finished');
  });
});
```

### Testing Best Practices

1. **Use TestBed for Angular-specific testing**
2. **Mock external dependencies**
3. **Test public APIs only**
4. **Use descriptive test names**
5. **Keep tests focused and isolated**
6. **Use fixtures for complex test data**

## Performance Best Practices

### 1. Change Detection Optimization

```typescript
// Use OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  
  public onDataUpdate(): void {
    // Manually trigger change detection when needed
    this.cdr.markForCheck();
  }
}
```

### 2. Memory Management

```typescript
// Proper subscription cleanup
export class ComponentWithSubscriptions implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.dataService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.handleData(data));
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 3. Lazy Loading

```typescript
// Feature module lazy loading
const routes: Routes = [
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)
  }
];
```

### 4. Bundle Optimization

```typescript
// Tree-shakable imports
import { map, filter } from 'rxjs/operators';
import { take } from 'rxjs/operators';

// Avoid importing entire libraries
// import * as _ from 'lodash'; // Don't do this
import { debounce } from 'lodash-es'; // Do this instead
```

## Debugging and Troubleshooting

### 1. Browser DevTools

#### Angular DevTools Extension
- Install Angular DevTools browser extension
- Use component inspector and profiler
- Monitor change detection cycles

#### Console Debugging
```typescript
// Development logging
if (!environment.production) {
  console.log('Game state updated:', gameState);
}

// Using debug services
@Injectable()
export class DebugService {
  public logGameState(state: IGameState): void {
    if (!environment.production) {
      console.group('Game State Debug');
      console.table(state.players);
      console.log('Current phase:', state.phase);
      console.groupEnd();
    }
  }
}
```

### 2. RxJS Debugging

```typescript
// Add tap operators for debugging
this.gameService.gameState$
  .pipe(
    tap(state => console.log('State changed:', state)),
    filter(state => state.isActive),
    tap(state => console.log('Active state:', state))
  )
  .subscribe();
```

### 3. Common Issues and Solutions

#### Memory Leaks
- Always unsubscribe from observables
- Use `takeUntil(destroy$)` pattern
- Check for event listener cleanup

#### Performance Issues
- Use OnPush change detection
- Implement trackBy functions for ngFor
- Lazy load heavy components

#### Type Errors
- Enable strict mode in TypeScript
- Use proper type guards
- Avoid `any` type

## Build and Deployment

### Development Build
```bash
npm run start              # Development server
npm run start:localnetwork # Network accessible
npm run build              # Production build
```

### Production Build
```bash
npm run build:docker       # Docker optimized build
npm run explore-modules    # Bundle analysis
```

### Environment Configuration

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.dungeon-crawler.com',
  enableDevTools: false,
  logLevel: 'error'
};
```

### Build Optimization

```json
// angular.json build configuration
"configurations": {
  "production": {
    "optimization": true,
    "outputHashing": "all",
    "sourceMap": false,
    "budgets": [
      {
        "type": "initial",
        "maximumWarning": "2mb",
        "maximumError": "5mb"
      }
    ]
  }
}
```

This development guide provides the foundation for maintaining high-quality code and efficient development workflows in the Dungeon Crawler Web Client project.