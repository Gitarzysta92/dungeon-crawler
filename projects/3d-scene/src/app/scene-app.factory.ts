import { PerspectiveCamera, Scene, TextureLoader } from "three";
import { ActorsManager } from "../lib/actors/actors-manager";
import { CollisionDispatcher } from "../lib/behaviors/collidable/collision.dispatcher";
import { DragDispatcher } from "../lib/behaviors/draggable/drag.dispatcher";
import { HoveringService } from "../lib/behaviors/hoverable/hovering.service";
import { BoardComponent } from "../lib/components/board/board.component";
import { RotateControlComponent } from "../lib/components/rotation-control/rotate-control.component";
import { PointerHandler } from "../lib/interactions/pointer/pointer-handler";
import { MainLoop } from "../lib/core/main-loop";
import { Renderer } from "../lib/core/renderer";
import { SceneWrapper } from "../lib/core/scene-wrapper";
import { TasksQueue } from "../lib/utils/tasks-queue/tasks-queue";
import { SceneComposer } from "../lib/helpers/scene-composer/scene-composer";
import { SceneApp } from "./scene-app";
import { RenderingPipeline } from "../lib/core/rendering-pipeline";
import { AnimationService } from "../lib/animations/animation.service";
import { StoneFieldFactory } from "../lib/actors/game-objects/fields/stone-field/stone-field.factory";
import { ISceneAppDeps } from "./scene-app.interface";
import { IAssetsProvider } from "../lib/assets/assets.interface";
import { NuclearRodFactory } from "../lib/actors/game-objects/environment-details/nuclear-rod/nuclear-rod.factory";
import { ParticlesFactory } from "../lib/actors/game-objects/environment-details/particles/particles.factory";
import { BlankFieldFactory } from "../lib/actors/game-objects/fields/blank-field/blank-field.factory";
import { SimpleFieldFactory } from "../lib/actors/game-objects/fields/simple-field/simple-field.factory";
import { FloatingRockTerrainFactory } from "../lib/actors/game-objects/terrains/floating-rock/floating-rock-terrain.factory";
import { CampFireFactory } from "../lib/actors/game-objects/tokens/camp-fire/camp-fire.factory";
import { CommonTileFactory } from "../lib/actors/game-objects/tokens/common-tile/common-tile.factory";
import { MagicGateFactory } from "../lib/actors/game-objects/tokens/magic-gate/magic-gate.factory";
import { AmbientLightFactory } from "../lib/actors/light-objects/ambient-light/ambient-light.factory";
import { DirectionalLightFactory } from "../lib/actors/light-objects/directional-light/directional-light.factory";
import { HemisphereLightFactory } from "../lib/actors/light-objects/hemisphere-light/hemisphere-light.factory";
import { PointLightFactory } from "../lib/actors/light-objects/point-light/point-light.factory";
import { RotateArrowFactory } from "../lib/actors/gui-objects/rotate-arrow/rotate-arrow.factory";
import { PlainTileFactory } from "../lib/actors/game-objects/tokens/plain-tile/plain-tile.factory";
import { SkySphereFactory } from "../lib/actors/game-objects/environment-details/sky-sphere/sky-sphere.factory";
import { TreasureChestFactory } from "../lib/actors/game-objects/tokens/treasure-chest/treasure-chest.factory";
import { BarrelWithCandlesFactory } from "../lib/actors/game-objects/tokens/barrel-with-candles/barrel-with-candles.factory";
import { MenuSceneApp } from "./menu-scene-app";
import { FogOfWarFactory } from "../lib/actors/game-objects/environment-details/fog-of-war/fog-of-war.factory";
import { HexagonalPlainsTerrainFactory } from "../lib/actors/game-objects/terrains/hexagonal-plains/hexagonal-plains.factory";
import { BoardCreationComponent } from "../lib/components/board-creation/board-creation.component";
import { HexagonBordersComponent } from "../lib/components/hexagon-border/hexagon-border.component";
import { HexagonTerrainComponent } from "../lib/components/hexagon-terrain/hexagon-terrain.component";
import { HexagonGridComponent } from "../lib/components/hexagon-grid/hexagon-grid.component";
import { PathIndicatorComponent } from "../lib/components/path-indicator/path-indicator.component";
import { PreviewComponent } from "../lib/components/preview/preview.component";
import { RotateControlFactory } from "../lib/actors/gui-objects/rotate-control/rotate-control.factory";
import { AnimationPlayerComponent } from "../lib/components/animation-player/animation-player";
import { SceneScaleComponent } from "../lib/components/scene-scale/scene-scale.component";


export class SceneAppFactory {

  public create(data: ISceneAppDeps) {
    const core = this._initializeCore(data);
    const services = this._initializeServices(core);
    const infrastructure =  this._initializeInfrastructure(core, services, data.assetsProvider);
    const components = this._initializeComponents(services, infrastructure, data, core);
    const sceneApp = new SceneApp(services.actorsManager, core.sceneWrapper, core.renderer, core.tasksQueue, core.mainLoop, core.pipeline);
    const menuApp = new MenuSceneApp(services.actorsManager, core.sceneWrapper, core.renderer, core.tasksQueue, core.mainLoop, core.pipeline);
    return { sceneApp, components, services, infrastructure, menuApp }
  }

  private _initializeCore(
    data: ISceneAppDeps
  ) {
    const scene = new Scene();
    const camera = new PerspectiveCamera();
    const sceneWrapper = new SceneWrapper(scene, camera, data.width, data.height);
    const renderer = new Renderer(data); 
    const core = {
      mainLoop: new MainLoop(data.animationFrameProvider),
      textureLoader: new TextureLoader(),
      tasksQueue: new TasksQueue(),
      pipeline: new RenderingPipeline(renderer, sceneWrapper)
    }
    return { sceneWrapper, renderer, ...core }
  }

  private _initializeServices(
    core: ReturnType<SceneAppFactory['_initializeCore']>,
  ) {
    const actorsManager = new ActorsManager(core.sceneWrapper, core.renderer);
    const pointerHandler = new PointerHandler(actorsManager, core.sceneWrapper);
    const common = {
      animationService: new AnimationService(core.tasksQueue),
      dragDispatcher: new DragDispatcher(core.sceneWrapper, core.tasksQueue, pointerHandler),
      collisionsDispatcher: new CollisionDispatcher(actorsManager, core.tasksQueue),
      hoverDispatcher: new HoveringService(core.tasksQueue)
    }
    return {
      actorsManager,
      pointerHandler,
      ...common
    }
  }

  private _initializeInfrastructure(
    core: ReturnType<SceneAppFactory['_initializeCore']>,
    services: ReturnType<SceneAppFactory['_initializeServices']>,
    assetsProvider: IAssetsProvider
  ) {    
    const lightObjectFactories = this._initializeLightObjectFactories(services.actorsManager)
    const gameObjectFactories = this._initializeGameObjectFactories(services, lightObjectFactories, assetsProvider);
    assetsProvider.registerProviders([ ...Object.values(lightObjectFactories), ...Object.values(gameObjectFactories) ])
    const sceneComposer = new SceneComposer([ ...Object.values(lightObjectFactories), ...Object.values(gameObjectFactories) ]);
    return {
      sceneComposer,
      factories: gameObjectFactories
    }
  }

  private _initializeLightObjectFactories(actorsManager: ActorsManager) {
    return {
      ambientLightFactory: new AmbientLightFactory(actorsManager),
      directionalLightFactory: new DirectionalLightFactory(actorsManager),
      hemisphereLightFactory: new HemisphereLightFactory(actorsManager),
      pointLightFactory: new PointLightFactory(actorsManager)
    }
  }

  private _initializeGameObjectFactories(
    services: ReturnType<SceneAppFactory['_initializeServices']>,
    lights: ReturnType<SceneAppFactory['_initializeLightObjectFactories']>,
    assetsProvider: IAssetsProvider
  ) {
    return {
      nuclearRodFactory: new NuclearRodFactory(services.actorsManager),
      particlesFactory: new ParticlesFactory(services.actorsManager),
      stoneFieldFactory: new StoneFieldFactory(assetsProvider, services.actorsManager, services.animationService),
      blankFieldFactory: new BlankFieldFactory(services.actorsManager),
      simpleFieldFactory: new SimpleFieldFactory(services.actorsManager),
      floatingRockTerrain: new FloatingRockTerrainFactory(assetsProvider, services.actorsManager, services.animationService),
      campFireToken: new CampFireFactory(services.actorsManager, assetsProvider, services.animationService),
      barrelWithCandles: new BarrelWithCandlesFactory(services.actorsManager, assetsProvider, services.animationService),
      commonTileToken: new CommonTileFactory(services.actorsManager, assetsProvider, services.animationService),
      plainTileToken: new PlainTileFactory(services.actorsManager, assetsProvider, services.animationService),
      magicGateToken: new MagicGateFactory(services.actorsManager, assetsProvider, services.animationService),
      treasureChestToken: new TreasureChestFactory(services.actorsManager, assetsProvider, services.animationService),
      rotateArrowFactory: new RotateArrowFactory(services.actorsManager),
      skySphereFactory: new SkySphereFactory(services.actorsManager),
      fogOfWar: new FogOfWarFactory(services.actorsManager, assetsProvider),
      hexagonalPlains: new HexagonalPlainsTerrainFactory(assetsProvider, services.actorsManager, services.animationService),
      rotateControl: new RotateControlFactory(services.actorsManager)
    }
  }

  private _initializeComponents(
    services: ReturnType<SceneAppFactory['_initializeServices']>,
    infrastructure: ReturnType<SceneAppFactory['_initializeInfrastructure']>,
    data: ISceneAppDeps,
    core: any
  ) {
    const boardComponent = new BoardComponent(services.actorsManager, services.pointerHandler, services.hoverDispatcher, infrastructure.sceneComposer, services.animationService);
    const rotateMenuComponent = new RotateControlComponent(services.actorsManager, services.pointerHandler, services.hoverDispatcher, infrastructure.factories.rotateControl);
    const boardCreationComponent = new BoardCreationComponent(services.actorsManager, services.pointerHandler);
    const hexagonBorders = new HexagonBordersComponent(services.actorsManager, services.pointerHandler, services.hoverDispatcher, infrastructure.sceneComposer, services.animationService);
    const hexagonTerrain = new HexagonTerrainComponent(services.actorsManager, data.assetsProvider);
    const hexagonGrid = new HexagonGridComponent(services.actorsManager, services.pointerHandler, services.animationService);
    const pathIndicator = new PathIndicatorComponent(services.actorsManager, services.animationService);
    const previewComponent = new PreviewComponent(services.actorsManager, infrastructure.factories.commonTileToken);
    const animationPlayerComponent = new AnimationPlayerComponent(data.assetsProvider, services.actorsManager, services.animationService, core.sceneWrapper);
    const sceneScaleComponent = new SceneScaleComponent(services.actorsManager);

    infrastructure.sceneComposer.register([boardComponent, hexagonBorders, hexagonGrid]);

    return {
      boardComponent,
      rotateMenuComponent,
      boardCreationComponent,
      hexagonBorders,
      hexagonTerrain,
      hexagonGrid,
      pathIndicator,
      previewComponent,
      animationPlayerComponent,
      sceneScaleComponent
    }
  }
}