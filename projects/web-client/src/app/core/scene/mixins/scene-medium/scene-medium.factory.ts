import { ISceneMedium, ISceneMediumDeclaration } from "./scene-medium.interface";
import { Constructor } from "@game-logic/lib/extensions/types";
import { IMixinFactory } from "@game-logic/lib/base/mixin/mixin.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { mapCubeCoordsTo3dCoords } from "../../misc/coords-mappings";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { Selectable } from "@3d-scene/lib/behaviors/selectable/selectable.mixin";
import { Highlightable } from "@3d-scene/lib/behaviors/highlightable/highlightable.mixin";
import { ActorsManager } from "@3d-scene/lib/actors/actors-manager";
import { Camera, Renderer, Vector2 } from "three";
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";


export class SceneMediumFactory implements IMixinFactory<ISceneMedium> {

  constructor() {}

  public validate(e: ISceneMediumDeclaration): boolean {
    return e.isSceneMedium;
  }

  public create(e: Constructor<IEntity>): Constructor<ISceneMediumDeclaration> {
    class SceneMedium extends e implements ISceneMedium {
      public id: string;
      public auxId: string;
      public isSceneMedium = true as const;
      public isSceneObjectsCreated = false;
      public scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; };
      public actorsManager: WeakRef<ActorsManager>;

      public viewportCoords = new Vector2(); 
      public position: ICubeCoordinates;
      public rotation?: 0 | 1 | 3 | 2 | 4 | 5;

      public updateViewportCoords(camera: Camera, renderer: Renderer): void {
        if (!this.position) {
          return;
        }
        const auxCoords = CubeCoordsHelper.createKeyFromCoordinates(this.position);
        const actor = this.actorsManager.deref().getObjectByAuxCoords(auxCoords);
        const screenVector = actor.getViewportCoords(camera as any, 1.5, auxCoords);     
        this.viewportCoords.x = Math.round((screenVector.x + 1) * renderer.domElement.offsetWidth / 2);
        this.viewportCoords.y = Math.round((1 - screenVector.y) * renderer.domElement.offsetHeight / 2);
      }

      private _isHighlighted: false = false;
      get isHighlighted() { return this._isHighlighted };
      set isHighlighted(v) {
        if (this._isHighlighted === v) {
          return;
        }
        this._isHighlighted = v;
        for (let actor of this._associatedActors) {
          if (this._isHighlighted) {
            Highlightable.validate(actor).highlight(this.id);
          } else {
            Highlightable.validate(actor).unhighlight(this.id);
          }
        }
      }

      private _isSelected: false = false;
      get isSelected() { return this._isSelected }
      set isSelected(v) {
        if (this._isSelected === v) {
          return;
        }
        this._isSelected = v;
        for (let actor of this._associatedActors) {
          if (this._isSelected) {
            Selectable.validate(actor).select(this.id);
          } else {
            Selectable.validate(actor).deselect(this.id);
          }
        }
      }

      private get _associatedActors() { 
        if (this.actorsManager?.deref()) {
          return this.getComputedDeclarations()
            .map(d => this.actorsManager.deref().getObjectById(d.auxId))
        } else {
          return []
        }
      }

      constructor(d: ISceneMediumDeclaration) {
        super(d);
        this.scene = d.scene;
      }

      public removeSceneObjects(): Promise<void> {
        throw new Error("Method not implemented.");
      }

      public createSceneObjects(): ISceneComposerDefinition<unknown>[] {
        this.isSceneObjectsCreated = true;
        return this.getComputedDeclarations()
      }

      public getComputedDeclarations(): Array<ISceneComposerDefinition<unknown> & { auxId: string, auxCoords: string }> {
        return !this.position ? [] : this.scene.composerDeclarations.map(d => ({
          auxId: this.id,
          auxCoords: CubeCoordsHelper.createKeyFromCoordinates(this.position),
          position: mapCubeCoordsTo3dCoords(this.position),
          rotation: this.rotation ?? 0,
          ...d,
        }))
      }
            
      public async updateBehavior(): Promise<void> {
        
      }

    }
    return SceneMedium;
  }
}


// await Movable.validate(this)?.move(token.position);
// if ('rotation' in token) {
//   await Rotatable.validate(this)?.rotate(token.rotation);
// }