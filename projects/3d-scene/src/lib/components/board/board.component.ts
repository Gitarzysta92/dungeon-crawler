import { Vector2 } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { HoveringService } from "../../behaviors/hoverable/hovering.service";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { getNormalizedMouseCoordinates2 } from "../../utils/utils";
import { TokenBase } from "../../actors/game-objects/tokens/common/token-base.game-object";
import { FieldBase } from "../../actors/game-objects/fields/common/base-field.game-object";
import { SceneComposer } from "../../helpers/scene-composer/scene-composer";
import { IMovable } from "../../behaviors/movable/movable.interface";
import { ITokenComposerDefinition } from "../../actors/game-objects/tokens/common/token.interface";
import { boardComposerDefinitionName } from "./board.constants";


export class BoardComponent {

  definitionName = boardComposerDefinitionName;
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _hoverDispatcher: HoveringService,
    private readonly _sceneComposer: SceneComposer
  ) { }
  
  //TODO : introduce InstancedMesh for board fields.
  // public async compose(def: IBoardComposerDefinition): Promise<void> {

  // }

  // public async create(def: IBoardComposerDefinition): Promise<unknown> { return }
  // public validateComposer(def: string): boolean { return def === this.definitionName; }


  public async createToken(token: ITokenComposerDefinition<unknown>, fieldId: string): Promise<TokenBase> {
    const field = this.getField(fieldId);
    const uninitializedToken = await this._sceneComposer.create<TokenBase>(token);
    field?.takeBy(uninitializedToken);
    return this._actorsManager.initializeObject<TokenBase>(uninitializedToken);
  }

  public getTokenAttachedToField(field: FieldBase): TokenBase | undefined {
    let token;
    for (let a of this._actorsManager.actors.values()) {
      if (a instanceof TokenBase && a.takenFieldId === field.id) {
        token = a;
        break; 
      }
    }
    return token;
  }

  public getAllAttachedTokens(): TokenBase[] {
    const tokens = [];
    for (let a of this._actorsManager.actors.values()) {
      if (a instanceof TokenBase) {
        tokens.push(a);
      }
    }
    return tokens;
  }

  public getTargetedToken(x: number, y: number): TokenBase | undefined {
    const v = new Vector2();
    return this._pointerHandler.intersect(getNormalizedMouseCoordinates2(x, y, v))
      .find(i => i.object instanceof TokenBase)?.object as any;
  }

  public getToken(targetTokenId: string): TokenBase | undefined {
    return this._actorsManager.getObject<TokenBase>(targetTokenId) ?? this._actorsManager.getObjectByAuxId(targetTokenId);
  }

  public getTargetedField(x: number, y: number): FieldBase | undefined {
    const mc = new Vector2();
    return this._pointerHandler.intersect(getNormalizedMouseCoordinates2(x, y, mc))
      .find(i => i.object instanceof FieldBase)?.object as any;
  }

  public getField(targetFieldId: string): FieldBase | undefined {
    return this._actorsManager.getObject<FieldBase>(targetFieldId) ?? this._actorsManager.getObjectByAuxId(targetFieldId);
  }

  public async attachTokenToField(tile: TokenBase & IMovable, field: FieldBase): Promise<void> {
    const { coords } = field.takeBy(tile);
    await tile.move(coords);
  }

  public attachTokenToFieldWithoutAnimation(tile: TokenBase, field: FieldBase): void {
    const fieldCoords = field.takeBy(tile);
    tile.setPosition(fieldCoords.coords);
  }

  public async detachTokenFromField(tile: TokenBase & IMovable): Promise<void> {
    tile.takenFieldId = null as unknown as string;
    const coords = tile.coords.clone();
    coords.y = 5;
    await tile.move(coords);
  }

  public initializeFieldHovering(allowedFieldIds?: string[]) {
    this._hoverDispatcher.startHoverListener(
      (v: Vector2) => this._pointerHandler.intersect(v)
        .filter((i: any) => {
          if (allowedFieldIds) {
            return i.object instanceof FieldBase && allowedFieldIds.some(id => i.object.auxId === id);
          } else {
            return i.object instanceof FieldBase
          }
        }))
  }

  public initializeTokenHovering(allowedActorIds: string[]) {
    this._hoverDispatcher.startHoverListener(
      (v: Vector2) => this._pointerHandler.intersect(v)
        .filter((i: any) => {
          if (allowedActorIds) {
            return i.object instanceof TokenBase && allowedActorIds.some(id => i.object.auxId === id);
          } else {
            return i.object instanceof TokenBase
          }
        }))
  }

  public disableHovering() {
    this._hoverDispatcher.finishHoverListener();
  }
}


  // public async initialize(): Promise<void> {
  //   for (let actor of this._actorsManager.actors.values()) {
  //     if (actor instanceof TokenBase && actor.takenFieldId !== null) {
  //       const field = this._actorsManager.actors.get(this._actorsManager.auxIds.get(actor.takenFieldId!)!);
  //       if (field && field instanceof FieldBase) {
  //         const { coords } = field.takeBy(actor);
  //         actor.setPosition(coords);
  //       }
  //     }
  //   }
  // }