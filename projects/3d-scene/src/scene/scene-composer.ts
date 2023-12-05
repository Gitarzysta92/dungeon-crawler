import { Vector2, Vector3 } from "three";
import { AnimationDispatcher } from "../lib/behaviours/animations/animation.dispatcher";
import { ActorsManager } from "../lib/actors/actors-manager";
import { HexagonalBoardComponent } from "../lib/components/visual/hexagonal-board.component";
import { NuclearRodsComponent } from "../lib/components/visual/nuclear-rods.component";
import { DustParticlesComponent } from "../lib/components/visual/dust-particles.component";
import { PointerHandler } from "../lib/interactions/pointer/pointer-handler";
import { AreaParticlesComponent } from "../lib/components/visual/area-particles.component";
import { BoardComponent } from "../lib/components/functional/board.component";
import { GameObjectFactory } from "../lib/actors/game-objects.factory";
import { LightsFactory } from "../lib/actors/lights.factory";
import { FieldObject } from "../lib/actors/game-objects/field.game-object";
import { TextureHelper } from "../lib/helpers/texture-helper";
import { Observable } from "rxjs";
import { GlobalParticlesComponent } from "../lib/components/visual/global-particles.component";
import { DialogComponent } from "../lib/components/functional/dialog.component";
import { StagingComponent } from "../lib/components/functional/staging.component";
import { ROTATION_ANGLES } from "../lib/constants/tile-rotation-radians";
import { GuiObjectFactory } from "../lib/actors/gui-objects.factory";
import { ILightDeclaration, ISceneComposerSetup } from "./interfaces/scene-composer-setup";
import { IBoardDeclaration } from "./interfaces/declarations/board-declaration";
import { ITerrainDeclaration } from "./interfaces/declarations/terrain-declaration";
import { ISceneObjectDeclaration } from "./interfaces/declarations/scene-object-declaration";
import { INuclearRodsAreaDeclaration } from "./interfaces/declarations/nuclear-rods-area-declaration";
import { IGlobalParticlesDeclaration } from "./interfaces/declarations/global-particles-declaration";
import { IParticlesAreaDeclaration } from "./interfaces/declarations/particles-area-declaration";
import { IDustParticlesDeclaration } from "./interfaces/declarations/dust-particles-declaration";
import { ITileDeclaration } from "./interfaces/declarations/tile-declaration";
import { ITargetingArrowDeclaration } from "./interfaces/declarations/targeting-arrow-declaration";
import { IBoardAppearanceSetup } from "../lib/components/interfaces/board-appearance-setup";
import { TileObject } from "../lib/actors/game-objects/tile.game-object";


export class SceneComposer {
  private _cb: Function[] = [];

  constructor(
    private readonly _textureHelper: TextureHelper,
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _animationDispatcher: AnimationDispatcher,
    private readonly _boardComponent: BoardComponent,
    private readonly _dialogComponent: DialogComponent,
    private readonly _stagingComponent: StagingComponent,
    private readonly _pointerEvent$: Observable<PointerEvent>
  ) { }

  public recalculate(): void {
    this._cb.forEach(c => c());
  }

  public async createSceneObjects(setup: ISceneComposerSetup): Promise<void> {
    if (!!setup.board)
      await this._handleBoardCreation(setup.board);
      
    if (!!setup.terrain)
      await this._handleTerrainCreation(setup.terrain);
    
    if (!!setup.lights)
      await this._handleLightsCreation(setup.lights);
    
    if (Array.isArray(setup.objects))
      await this._handleObjectsCreation(setup.objects);
  }

  private _handleBoardCreation(setup: IBoardDeclaration): void {
    
    if (setup.coords) {
      setup.coords = new Vector2(setup.coords.x, setup.coords.y);
    }
    setup.fields.forEach(f => f.coords = new Vector3(f.coords.x, f.coords.y, f.coords.z));  
    switch (setup.type) {        
      case "hexagonal-game-board":
        const board = new HexagonalBoardComponent(this._actorsManager);
        board.initialize(setup as unknown as IBoardAppearanceSetup);
        break;
      
      default:
        break;
    }
  }

  private async _handleTerrainCreation(terrainSetup: ITerrainDeclaration): Promise<void> {
    const mapTexture = await this._textureHelper.preloadTexture(terrainSetup.mapTexture as any);
    const normalMapTexture = await this._textureHelper.preloadTexture(terrainSetup.normalMapTexture as any);
    const displacementMapTexture = await this._textureHelper.preloadTexture(terrainSetup.displacementMapTexture as any);
    const terrain = GameObjectFactory.createTerrain({
      mapTexture,
      normalMapTexture,
      displacementMapTexture,
      color: terrainSetup.color
    });

    const mesh = this._actorsManager.initializeObject(terrain);
    mesh.position.setY(terrainSetup.axisYOffset);
  }

  private _handleLightsCreation(lightsSetup: ILightDeclaration[]): void {
    lightsSetup.forEach(os => {
      
      this._initializeCoordsAsVector(os.params);

      switch (os.type) {        
        case "directional-light":
          this._actorsManager.initializeObject(
            LightsFactory.createDirectionalLight(os.params as any));
          break;
        
        case "ambient-light":
          this._actorsManager.initializeObject(
            LightsFactory.createAmbientLight(os.params));
          break;
        
        case "hemisphere-light":
          this._actorsManager.initializeObject(
            LightsFactory.createHemisphereLight(os.params));
          break;
        
        case "point-light":
          this._actorsManager.initializeObject(
            LightsFactory.createPointLight(os.params as any));
          break;
      
        default:
          break;
      }
    });   
  }

  private _handleObjectsCreation(objectsSetup: ISceneObjectDeclaration[]): void {
    objectsSetup.forEach(os => {
      switch (os.type) {        
        case "nuclear-rods":
          this._createNuclearRodsArea(os as INuclearRodsAreaDeclaration);
          break;
        
        case "global-particles":
          this._createGlobalParticles(os as IGlobalParticlesDeclaration);
          break;
        
        case "particles-area":
          this._createParticlesArea(os as IParticlesAreaDeclaration);
          break;
        
        case "dust-particles-pointer-effect":
          this._createDustParticlesPointerEffect(os as IDustParticlesDeclaration);
          break;
        
        case "tile-on-field":
          this.createTileOnField(os as ITileDeclaration);
          break;
        
        case "tile-in-dialog":
          this._createTileInDialog(os as ITileDeclaration);
          break;
        
        case "tile-in-staging":
          this._createTileInStaging(os as ITileDeclaration);
          break;
        
        case "targeting-arrow":
          this._createTargetingArrow(os as ITargetingArrowDeclaration)
          break;
      
        default:
          break;
      }
    });
  }
  
  private async _createGlobalParticles(cs: IGlobalParticlesDeclaration): Promise<void> {
    const particles = new GlobalParticlesComponent(this._actorsManager);
    const texture = await this._textureHelper.preloadTexture(cs.mapTexture)
    particles.initialize(texture);
    this._cb.push(() => particles.recalculate());
  }

  public async createTileOnField(cs: ITileDeclaration): Promise<TileObject> {
    //console.log(cs);
    const texture = await this._textureHelper.preloadTexture(cs.mapTexture);
    const field = this._actorsManager.getObjectByAuxId(cs.auxFieldId!) as FieldObject;

    if (!field) {
      throw new Error(`Field with given coords: ${cs.auxFieldId}, not exists`);
    }

    const tile = GameObjectFactory.createTile({
      auxId: cs.auxId,
      coords: new Vector3(0, 0, 0),
      texture,
      outlineColor: cs.color,
      rotation: cs.rotation
    });
    this._actorsManager.initializeObject(tile);
    
    if (field.takeBy) {
      const fieldCoords = field.takeBy(tile);
      tile.setCoords(fieldCoords.coords);
      tile.setQuaternion(ROTATION_ANGLES[cs.rotation]);
    }

    return tile;
  }

  public removeTile(auxId: string): void {
    const actor = this._actorsManager.getObjectByAuxId(auxId);
    if (!actor) {
      throw new Error(`Cannot find actor to remove. auxId: ${auxId}`)
    }
    this._actorsManager.detachFromScene(actor);
  }
  

  private async _createTileInDialog(cs: ITileDeclaration): Promise<void> {
    // const texture = await this._textureHelper.preloadTexture(cs.mapTexture);
    // const tile = GameObjectFactory.createTile({ auxId: cs.auxId, coords: new Vector3(0,0,0), texture, outlineColor: cs.color });
    // this._actorsManager.initializeObject(tile);
    // this._dialogComponent.assignTile(tile);
  }

  private async _createTileInStaging(cs: ITileDeclaration): Promise<void> {
    // const texture = await this._textureHelper.preloadTexture(cs.mapTexture);
    // const tile = GameObjectFactory.createTile({ auxId: cs.auxId, coords: new Vector3(0,0,0), texture, outlineColor: cs.color });
    // this._actorsManager.initializeObject(tile);
    // this._stagingComponent.assignTileWithoutAnimation(tile);
  }

  private _createParticlesArea(cs: IParticlesAreaDeclaration): void {
    const area = new AreaParticlesComponent(this._actorsManager); 
    area.initialize(new Vector3(cs.coords.x, cs.coords.y, cs.coords.z));
    this._cb.push(() => area.recalculate());
  }

  private _createNuclearRodsArea(cs: INuclearRodsAreaDeclaration): void {
    const rods = new NuclearRodsComponent(this._actorsManager)
    cs.rods.forEach(r => this._initializeCoordsAsVector(r));
    cs.lights.forEach(l => this._initializeCoordsAsVector(l))
    
    if (!!cs.coords) {
      cs.coords = new Vector2(cs.coords.x, cs.coords.y);
    }
    rods.initialize(cs as any);
    this._cb.push(() => rods.recalculate());
  }

  private async _createDustParticlesPointerEffect(cs: IDustParticlesDeclaration): Promise<void> {
    const effect = new DustParticlesComponent(
      this._actorsManager,
      this._animationDispatcher,
      this._pointerHandler,
      this._pointerEvent$
    );
    const texture = await this._textureHelper.preloadTexture(cs.mapTexture);
    effect.initialize(texture, new Vector3(cs.coords.x, cs.coords.y, cs.coords.z));
  }
  
  private _createTargetingArrow(cs: ITargetingArrowDeclaration): void {
    const fromField = this._actorsManager.getObjectByAuxId(cs.fromFieldAuxId) as FieldObject;
    const toField = this._actorsManager.getObjectByAuxId(cs.toFieldAuxId) as FieldObject;

    if (!fromField) {
      throw new Error('Create TargetingArrow: Cannot find from field');
    }
    if (!toField) {
      throw new Error('Create TargetingArrow: Cannot find to field');
    }
    
    const a = GuiObjectFactory.createMoveArrow({
      color: cs.color,
      coordsFrom: fromField.object.position.clone(),
      coordsTo: toField.object.position.clone()
    });
    this._actorsManager.initializeObject(a); 
  }

  private _initializeCoordsAsVector(setup: { [key: string]: unknown }): void {
    Object.keys(setup).forEach(key => {
      const o = ((setup as any)[key] as any);
      const isVector2 = o.hasOwnProperty("x") && o.hasOwnProperty("y");
      const isVector3 = isVector2 && o.hasOwnProperty("z");

      if (isVector3) {
        (setup as any)[key] = new Vector3(o.x, o.y, o.z);
      } else if (isVector2) {
        (setup as any)[key] = new Vector2(o.x, o.y);
      }
    });
  }

}