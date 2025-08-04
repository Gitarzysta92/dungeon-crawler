# Architecture Documentation

This document provides an in-depth analysis of the Dungeon Crawler Web Client architecture, design patterns, and technical decisions.

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Module Structure](#module-structure)
- [State Management](#state-management)
- [Component Architecture](#component-architecture)
- [Service Layer](#service-layer)
- [Data Flow](#data-flow)
- [Design Patterns](#design-patterns)
- [Integration Points](#integration-points)
- [Performance Considerations](#performance-considerations)

## Overview

The Dungeon Crawler Web Client is built using Angular 14 with a sophisticated modular architecture designed for scalability, maintainability, and performance. The application integrates multiple external packages for game logic, 3D rendering, and utilities.

### Key Architectural Principles

1. **Separation of Concerns**: Clear boundaries between UI, business logic, and infrastructure
2. **Modular Design**: Feature-based modules with lazy loading
3. **Reactive Programming**: RxJS-based data flow throughout the application
4. **Type Safety**: Comprehensive TypeScript usage with advanced patterns
5. **Testability**: Dependency injection and service-oriented architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Web Client Application                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Aspects   │  │    Core     │  │   Shared    │         │
│  │             │  │             │  │             │         │
│  │ Navigation  │  │ Adventure   │  │  Buttons    │         │
│  │Notifications│  │  Dungeon    │  │   Forms     │         │
│  │ SoundFX     │  │   Game      │  │  Dialogs    │         │
│  └─────────────┘  │ GameData    │  │ Animations  │         │
│                   │ Settings    │  └─────────────┘         │
│                   └─────────────┘                          │
├─────────────────────────────────────────────────────────────┤
│                  Infrastructure Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │AssetLoader  │  │Configuration│  │DataStorage  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                   External Dependencies                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ @3d-scene   │  │@game-logic  │  │   @utils    │         │
│  │   (3D)      │  │ (Business)  │  │ (Helpers)   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## Module Structure

### Hierarchical Organization

The application follows a clear hierarchical module structure:

#### 1. Aspects (Cross-cutting Concerns)
```typescript
// aspects/
├── navigation/     // Routing, menus, breadcrumbs
├── notifications/  // User notifications system
└── sound-effects/  // Audio management
```

**Purpose**: Handle concerns that span multiple features
**Pattern**: Singleton services with `.forRoot()` methods

```typescript
@NgModule({})
export class NotificationsSharedModule {
  static forRoot(): ModuleWithProviders<NotificationsSharedModule> {
    return {
      ngModule: NotificationsSharedModule,
      providers: [
        NotificationsService,
        { provide: INITIALIZE, useExisting: NotificationsStore, multi: true }
      ]
    };
  }
}
```

#### 2. Core (Business Logic)
```typescript
// core/
├── adventure/      // Adventure mode gameplay
├── dungeon/        // Combat and dungeon mechanics
├── game/           // Core game coordination
├── game-data/      // Data management and seeding
├── game-persistence/  // Save/load functionality
├── settings/       // User preferences
└── scene/          // 3D scene management
```

**Purpose**: Feature-specific business logic and state management
**Pattern**: Lazy-loaded modules with dedicated stores

#### 3. Shared (Reusable Components)
```typescript
// shared/
├── buttons/        // Button components
├── forms/          // Form controls and validation
├── dialogs/        // Modals and overlays
├── animations/     // Animation definitions
└── commons/        // General-purpose components
```

**Purpose**: Reusable UI components across features
**Pattern**: Exportable modules without providers

#### 4. Infrastructure (Technical Services)
```typescript
// infrastructure/
├── asset-loader/   // Asset management
├── configuration/  // App initialization
├── data-storage/   // Persistence layer
└── view-templates/ // Layout templates
```

**Purpose**: Low-level technical services
**Pattern**: Singleton services with initialization hooks

## State Management

### Custom Store Implementation

The application implements a sophisticated custom state management system instead of using NgRx:

```typescript
@Injectable()
export class CustomStore<T> {
  private _state$ = new BehaviorSubject<T>(this.initialState);
  private _actions: Record<string, ActionHandler<T>> = {};

  constructor(
    private config: StoreConfig<T>,
    private storage?: StorageService
  ) {}

  public dispatch(action: string, payload?: unknown): void {
    const handler = this._actions[action];
    if (handler) {
      const newState = handler.action({
        payload,
        currentState: this._state$.value,
        initialState: this.config.initialState
      });
      
      this._state$.next(newState);
      
      if (this.storage && this.config.persist) {
        this.storage.save(this.config.key, newState);
      }
    }
  }

  public get state$(): Observable<T> {
    return this._state$.asObservable();
  }
}
```

### Transactional State Management

For complex game operations, the system supports transactional state changes:

```typescript
export interface IStateStoreTransaction<T> {
  store: Store<T>;
  dispatch: (action: string, payload: unknown) => void;
  commitTransaction: () => void;
  abandonTransaction: () => void;
}

export class TransactionalStoreService {
  private transactionStore?: Store<unknown>;
  private originalState?: unknown;

  public async setTransactionStore<T>(store: Store<T>): Promise<IStateStoreTransaction<T>> {
    this.transactionStore = store;
    this.originalState = await store.state$.pipe(take(1)).toPromise();
    
    return {
      store,
      dispatch: (action, payload) => store.dispatch(action, payload),
      commitTransaction: () => this._commit(),
      abandonTransaction: () => this._rollback()
    };
  }

  private _commit(): void {
    this.originalState = undefined;
    this.transactionStore = undefined;
  }

  private _rollback(): void {
    if (this.transactionStore && this.originalState) {
      this.transactionStore.setState(this.originalState);
    }
    this._commit();
  }
}
```

### State Persistence

The system provides multiple persistence strategies:

1. **LocalStorage**: For simple key-value data
2. **IndexedDB**: For complex objects and large datasets
3. **Session Storage**: For temporary data

```typescript
export class StoreService {
  public createStore<T>(
    key: string,
    config: {
      initialState: T;
      stateStorage?: StorageService;
      isLazyLoaded?: boolean;
      actions: Record<string, ActionHandler<T>>;
    }
  ): Store<T> {
    const store = new Store<T>(key, config.initialState);
    
    // Configure persistence
    if (config.stateStorage) {
      store.enablePersistence(config.stateStorage, key);
    }
    
    // Register actions
    Object.entries(config.actions).forEach(([action, handler]) => {
      store.registerAction(action, handler);
    });
    
    return store;
  }
}
```

## Component Architecture

### Mixin-Based Enhancement Pattern

The application uses an advanced mixin pattern for component capability composition:

```typescript
export interface IMixinFactory<T> {
  create<TBase extends Constructor>(base: TBase): Constructor<T> & TBase;
}

export class DraggableCardMixin implements IMixinFactory<IDraggableCard> {
  public create<TBase extends Constructor<ICardOnPile>>(
    base: TBase
  ): Constructor<IDraggableCard> & TBase {
    
    class DraggableCard extends base implements IDraggableCard {
      public isDraggableCard = true as const;
      public isDragging = false;
      
      @HostListener('dragstart', ['$event'])
      public onDragStart(event: DragEvent): void {
        this.isDragging = true;
        this.dragService.startDrag(this.card, event);
      }
      
      @HostListener('dragend')
      public onDragEnd(): void {
        this.isDragging = false;
        this.dragService.endDrag();
      }
    }
    
    return DraggableCard as Constructor<IDraggableCard> & TBase;
  }
}
```

### Component Communication Patterns

1. **Parent-Child**: Traditional @Input()/@Output() binding
2. **Service-Mediated**: Services act as communication hubs
3. **Store-Based**: Reactive state sharing via stores
4. **Event-Driven**: Custom event system for complex interactions

```typescript
@Component({
  selector: 'app-game-component',
  template: `...`
})
export class GameComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  constructor(
    private gameStore: GameStore,
    private interactionService: InteractionService
  ) {}
  
  ngOnInit(): void {
    // Reactive data binding
    this.gameStore.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => this.handleStateChange(state));
    
    // Event-driven communication
    this.interactionService.interactions$
      .pipe(takeUntil(this.destroy$))
      .subscribe(interaction => this.handleInteraction(interaction));
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Lifecycle Management

Consistent component lifecycle management:

```typescript
export abstract class BaseComponent implements OnInit, OnDestroy {
  protected readonly destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.initialize();
  }
  
  ngOnDestroy(): void {
    this.cleanup();
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  protected abstract initialize(): void;
  protected abstract cleanup(): void;
}
```

## Service Layer

### Service Hierarchy

The application organizes services into distinct layers:

1. **Infrastructure Services**: Configuration, storage, environment
2. **Domain Services**: Game logic, business rules
3. **UI Services**: Component coordination, user interactions
4. **Integration Services**: External API communication

### Dependency Injection Patterns

Advanced DI patterns including:

1. **Multi-providers**: For initialization hooks
2. **Factory providers**: For complex service creation
3. **Token-based injection**: For configuration objects

```typescript
// Multi-provider pattern for initialization
export const INITIALIZE = new InjectionToken<IInitializable>('INITIALIZE');

@NgModule({
  providers: [
    DataSeedService,
    { 
      provide: INITIALIZE, 
      useFactory: (service: DataSeedService) => ({
        initialize: () => service.loadGameData()
      }),
      multi: true,
      deps: [DataSeedService] 
    }
  ]
})
export class GameDataModule {}

// Application initialization
@Injectable()
export class AppInitializer {
  constructor(@Inject(INITIALIZE) private initializers: IInitializable[]) {}
  
  public async initialize(): Promise<void> {
    for (const initializer of this.initializers) {
      await initializer.initialize();
    }
  }
}
```

## Data Flow

### Reactive Data Flow Architecture

The application follows a unidirectional data flow pattern with reactive programming:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Actions   │───▶│   Stores    │───▶│ Components  │
└─────────────┘    └─────────────┘    └─────────────┘
       ▲                                      │
       └──────────────────────────────────────┘
                    User Interactions
```

### Command Pattern Implementation

Game actions follow the Command pattern for complex operations:

```typescript
export interface ICommand extends IActivity {
  isCommand: true;
  subject: IActivitySubject & IInteractableMedium;
  
  indicate(store: IGameStore): Promise<void>;
  execute(store: IGameStore, controller: unknown): Promise<void>;
  onFinalization(): void;
}

export class PlayCardCommand implements ICommand {
  public readonly isCommand = true;
  
  constructor(
    public readonly subject: ICard,
    private readonly target: ITarget
  ) {}
  
  public async indicate(store: IGameStore): Promise<void> {
    // Show preview of card effects
    const preview = await this.calculateEffects(store.state);
    store.dispatch('SHOW_CARD_PREVIEW', preview);
  }
  
  public async execute(store: IGameStore, controller: GameController): Promise<void> {
    // Validate move
    const isValid = await controller.validateMove(this.subject, this.target);
    if (!isValid) throw new Error('Invalid move');
    
    // Execute card effects
    const effects = await this.calculateEffects(store.state);
    store.dispatch('APPLY_CARD_EFFECTS', effects);
    
    // Update game state
    store.dispatch('ADVANCE_TURN');
  }
  
  public onFinalization(): void {
    // Cleanup any temporary state
  }
}
```

### Event-Driven Architecture

Complex game interactions use an event-driven approach:

```typescript
export class InteractionService {
  private _interactions$ = new Subject<IInteraction>();
  
  public get interactions$(): Observable<IInteraction> {
    return this._interactions$.asObservable();
  }
  
  public triggerInteraction(interaction: IInteraction): void {
    this._interactions$.next(interaction);
  }
}

export class GameplayService {
  constructor(private interactionService: InteractionService) {
    this.interactionService.interactions$
      .pipe(
        filter(interaction => interaction.type === 'CARD_PLAYED'),
        switchMap(interaction => this.processCardPlay(interaction))
      )
      .subscribe();
  }
  
  private processCardPlay(interaction: IInteraction): Observable<IGameEvent> {
    return from(this.executeCardCommand(interaction.payload))
      .pipe(
        map(result => ({ type: 'CARD_PLAYED_SUCCESS', data: result })),
        catchError(error => of({ type: 'CARD_PLAYED_ERROR', error }))
      );
  }
}
```

## Design Patterns

### 1. Module Pattern with Lazy Loading

All feature modules implement lazy loading for optimal performance:

```typescript
const routes: Routes = [
  {
    path: 'game',
    loadChildren: () => import('./core/game/game.module').then(m => m.GameModule),
    canActivate: [InitializationGuard],
    data: { preload: true }
  }
];
```

### 2. Factory Pattern for Dynamic Creation

Services use factories for complex object creation:

```typescript
@Injectable()
export class GameplayFactory {
  public createAdventureGameplay(config: IAdventureConfig): IAdventureGameplay {
    const builder = new AdventureGameplayBuilder();
    
    return builder
      .withHero(config.hero)
      .withDifficulty(config.difficulty)
      .withSeed(config.seed)
      .build();
  }
  
  public createDungeonGameplay(config: IDungeonConfig): IDungeonGameplay {
    const builder = new DungeonGameplayBuilder();
    
    return builder
      .withPlayers(config.players)
      .withDeck(config.deck)
      .withRules(config.rules)
      .build();
  }
}
```

### 3. Observer Pattern with RxJS

Reactive programming throughout the application:

```typescript
@Injectable()
export class GameStateService {
  private _gameState$ = new BehaviorSubject<IGameState>(initialState);
  
  public get gameState$(): Observable<IGameState> {
    return this._gameState$.asObservable();
  }
  
  public get isInCombat$(): Observable<boolean> {
    return this.gameState$.pipe(
      map(state => state.phase === GamePhase.Combat),
      distinctUntilChanged()
    );
  }
  
  public get currentPlayer$(): Observable<IPlayer | null> {
    return this.gameState$.pipe(
      map(state => state.currentPlayer),
      distinctUntilChanged((a, b) => a?.id === b?.id)
    );
  }
}
```

### 4. Strategy Pattern for AI Behavior

Different AI strategies for computer players:

```typescript
export interface IAIStrategy {
  calculateMove(gameState: IGameState): Promise<IMove>;
}

export class AggressiveAIStrategy implements IAIStrategy {
  public async calculateMove(gameState: IGameState): Promise<IMove> {
    // Prioritize attacking moves
    return this.findBestAttackMove(gameState);
  }
}

export class DefensiveAIStrategy implements IAIStrategy {
  public async calculateMove(gameState: IGameState): Promise<IMove> {
    // Prioritize defensive moves
    return this.findBestDefensiveMove(gameState);
  }
}

@Injectable()
export class AIService {
  private strategies = new Map<AIType, IAIStrategy>([
    [AIType.Aggressive, new AggressiveAIStrategy()],
    [AIType.Defensive, new DefensiveAIStrategy()],
    [AIType.Balanced, new BalancedAIStrategy()]
  ]);
  
  public async calculateAIMove(player: IPlayer, gameState: IGameState): Promise<IMove> {
    const strategy = this.strategies.get(player.aiType);
    if (!strategy) throw new Error(`Unknown AI type: ${player.aiType}`);
    
    return strategy.calculateMove(gameState);
  }
}
```

## Integration Points

### 3D Scene Integration

The application integrates with a separate 3D rendering package:

```typescript
@Injectable()
export class SceneService {
  private scene?: Scene;
  private renderer?: WebGLRenderer;
  private camera?: PerspectiveCamera;
  
  public async initializeScene(canvas: HTMLCanvasElement): Promise<void> {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    this.renderer = new WebGLRenderer({ canvas, antialias: true });
    
    // Load game-specific assets
    await this.loadGameAssets();
    
    // Start render loop
    this.startRenderLoop();
  }
  
  public addGameObject(object: GameObject): void {
    const mesh = this.createMeshFromGameObject(object);
    this.scene?.add(mesh);
  }
  
  private startRenderLoop(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer?.render(this.scene!, this.camera!);
    };
    animate();
  }
}
```

### Game Logic Integration

The client integrates with external game logic packages:

```typescript
// Integration with @game-logic package
import { 
  GameEngine, 
  IGameState, 
  IMove, 
  MoveValidator 
} from '@game-logic/core';

@Injectable()
export class GameEngineService {
  private engine: GameEngine;
  
  constructor() {
    this.engine = new GameEngine();
  }
  
  public async processMove(move: IMove): Promise<IGameState> {
    const isValid = await MoveValidator.validate(move, this.engine.currentState);
    if (!isValid) {
      throw new Error('Invalid move');
    }
    
    return this.engine.applyMove(move);
  }
}
```

## Performance Considerations

### Lazy Loading Strategy

All major modules are lazy-loaded to minimize initial bundle size:

```typescript
// Route-based code splitting
const routes: Routes = [
  {
    path: 'adventure',
    loadChildren: () => import('./core/adventure/adventure.module').then(m => m.AdventureModule)
  },
  {
    path: 'dungeon',
    loadChildren: () => import('./core/dungeon/dungeon.module').then(m => m.DungeonModule)
  }
];
```

### Change Detection Optimization

Components use OnPush change detection where appropriate:

```typescript
@Component({
  selector: 'app-game-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class GameBoardComponent {
  @Input() gameState: IGameState;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  public onGameStateChange(): void {
    // Manually trigger change detection when needed
    this.cdr.markForCheck();
  }
}
```

### Memory Management

Proper subscription management to prevent memory leaks:

```typescript
export abstract class BaseComponent implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  protected subscribeUntilDestroy<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(takeUntil(this.destroy$));
  }
}
```

### Asset Optimization

Efficient asset loading and caching:

```typescript
@Injectable()
export class AssetLoaderService {
  private cache = new Map<string, any>();
  
  public async loadAsset<T>(path: string, loader: AssetLoader<T>): Promise<T> {
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }
    
    const asset = await loader.load(path);
    this.cache.set(path, asset);
    
    return asset;
  }
  
  public preloadAssets(paths: string[]): Promise<void[]> {
    return Promise.all(paths.map(path => this.loadAsset(path, defaultLoader)));
  }
}
```

This architecture provides a solid foundation for a complex game application with excellent maintainability, scalability, and performance characteristics.