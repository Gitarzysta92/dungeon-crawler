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
import { IInteractableMedium } from "src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface";
import { Hoverable } from "@3d-scene/lib/behaviors/hoverable/hoverable.mixin";


export class SceneMediumFactory implements IMixinFactory<ISceneMedium> {

  constructor() {}

  public validate(e: ISceneMediumDeclaration): boolean {
    return e.isSceneMedium;
  }

  public create(e: Constructor<IEntity & Partial<IInteractableMedium>>): Constructor<ISceneMediumDeclaration> {
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

      private get _associatedActors() { 
        if (this.actorsManager?.deref()) {
          return this.getComputedDeclarations()
            .map(d => this.actorsManager.deref().getObjectById(d.auxId))
        } else {
          return []
        }
      }

      private _selectDelegate = (isSelected: boolean) => {
        for (let actor of this._associatedActors) {
          if (isSelected) {
            Selectable.validate(actor).select(this.id);
          } else {
            Selectable.validate(actor).deselect(this.id);
          }
        }
      }

      private _highlightDelegate = (isHighlighted: boolean) => {
        for (let actor of this._associatedActors) {
          if (isHighlighted) {
            Highlightable.validate(actor).highlight(this.id);
          } else {
            Highlightable.validate(actor).settle(this.id);
          }
        }
      }

      private _hoverDelegate = (isHovered: boolean) => {
        for (let actor of this._associatedActors) {
          if (isHovered) {
            Hoverable.validate(actor).hover(this.id);
          } else {
            Hoverable.validate(actor).settle(this.id);
          }
        }
      }

      constructor(d: ISceneMediumDeclaration) {
        super(d);
        this.scene = d.scene;
      }

      public onInitialize(): void {
        this.registerInteractionHandler('highlight', this._highlightDelegate);
        this.registerInteractionHandler('select', this._selectDelegate);
        this.registerInteractionHandler('hover', this._hoverDelegate);
        super.onInitialize();
      }

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
          onHighlight: s => this.isHighlighted = s,
          onSelect: s => this.isSelected = s,
          onHover: s => this.isHovered = s
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