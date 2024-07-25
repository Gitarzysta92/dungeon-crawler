import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { mapCubeCoordsTo3dCoords } from "../../misc/coords-mappings";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { Selectable } from "@3d-scene/lib/behaviors/selectable/selectable.mixin";
import { Highlightable } from "@3d-scene/lib/behaviors/highlightable/highlightable.mixin";
import { Vector2 } from "three";
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { IInteractableMedium } from "src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface";
import { Hoverable } from "@3d-scene/lib/behaviors/hoverable/hoverable.mixin";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { ISceneMedium, ISceneMediumDeclaration } from "./scene-medium.interface";
import { SceneService } from "../../services/scene.service";
import { IRawVector3 } from "@3d-scene/lib/extensions/types/raw-vector3";
import { hexagonGridDefinitionName } from "@3d-scene/lib/components/hexagon-grid/hexagon-grid.constants";
import { HexagonHelper } from "../../misc/hexagon.helper";
import { Movable } from "@3d-scene/lib/behaviors/movable/movable.mixin";
import { HEXAGON_RADIUS } from "../../constants/hexagon.constants";
import { IBoardObject } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";
import { IBoardField } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { Rotatable } from "@3d-scene/lib/behaviors/rotatable/rotatable.mixin";


export class SceneMediumFactory implements IMixinFactory<ISceneMedium> {

  constructor(
    private readonly _sceneService: SceneService
  ) { }

  public static isSceneMedium(data: unknown): boolean {
    return (data as ISceneMedium).isSceneMedium; 
  }
  
  public static asSceneMedium<T>(data: T): T & ISceneMedium {
    if (!this.isSceneMedium(data)) {
      throw new Error("Provided data is not a SceneMedium");
    } 
    return data as T & ISceneMedium;
  }

  public isApplicable(e: ISceneMediumDeclaration): boolean {
    return e.isSceneMedium;
  }

  public create(e: Constructor<IEntity & IInteractableMedium & Partial<Omit<IBoardObject, 'onInitialize'>> & Partial<IBoardField>>): Constructor<ISceneMediumDeclaration> {
    const sceneService = this._sceneService;
    class SceneMedium extends e implements ISceneMedium {
      public id: string;
      public auxId: string;
      public isSceneMedium = true as const;
      public isSceneObjectsCreated = false;
      public scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; };

      public viewportCoords = new Vector2(); 
      public position: ICubeCoordinates;
      public rotation?: 0 | 1 | 3 | 2 | 4 | 5;

      public get associatedActors() { 
        return this.getComputedDeclarations()
          .map(d => sceneService.services.actorsManager.getObjectById(d.auxId)).filter(d => !!d);
      }

      private _selectDelegate = (isSelected: boolean) => {
        for (let actor of this.associatedActors) {
          if (isSelected) {
            Selectable.validate(actor).select(this.id);
          } else {
            Selectable.validate(actor).deselect(this.id);
          }
        }
      }

      private _highlightDelegate = (isHighlighted: boolean) => {
        for (let actor of this.associatedActors) {
          if (isHighlighted) {
            Highlightable.validate(actor).highlight(this.id);
          } else {
            Highlightable.validate(actor).unHighlight(this.id);
          }
        }
      }

      private _hoverDelegate = (isHovered: boolean) => {
        for (let actor of this.associatedActors) {
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
        if (super.onInitialize) {
          super.onInitialize();
        }
      }


      public updateScreenCoords(): void {
        if (!this.position) {
          return;
        }
        const auxCoords = CubeCoordsHelper.createKeyFromCoordinates(this.position);
        const actor = sceneService.services.actorsManager.getObjectByPredicate(a => a.matchId(this.id))
        if (!actor) {
          return;
        }
        const screenVector = actor.getViewportCoords(sceneService.sceneApp.camera, 1.5, auxCoords);
        this.viewportCoords.x = Math.round((screenVector.x + 1) * sceneService.sceneApp.renderer.domElement.offsetWidth / 2);
        this.viewportCoords.y = Math.round((1 - screenVector.y) * sceneService.sceneApp.renderer.domElement.offsetHeight / 2);
      }


      public removeSceneObjects(): Promise<void> {
        throw new Error("Method not implemented.");
      }


      public createSceneObjects(): ISceneComposerDefinition<unknown>[] {
        return this.getComputedDeclarations()
      }


      public getComputedDeclarations(): Array<ISceneComposerDefinition<unknown> & { auxId: string, auxCoords: string }> {
        return !this.position ? [] : this.scene.composerDeclarations.map(d => this._computeDeclaration(d))
      }


      public async updateScenePosition(): Promise<void> {
        const position = HexagonHelper.calculatePositionInGrid(mapCubeCoordsTo3dCoords(this.position), HEXAGON_RADIUS);
        position.y = 0.3;
        await Promise.all(this.associatedActors.map(a => Movable.validate(a).moveAsync(position)))
      }

      
      public async updateSceneRotation(): Promise<void> {
        await Promise.all(this.associatedActors.map(a => Rotatable.validate(a).rotate(this.rotation)))
      }


      public getAssociatedActors() {
        return this.associatedActors;
      }

      public createDummy(position?: ICubeCoordinates) {

      }

      private _computeDeclaration(
        d: ISceneComposerDefinition<unknown>
      ): ISceneComposerDefinition<unknown> & { auxId: string, auxCoords: string; position: IRawVector3, rotation: number } {
        const o: any = {
          ...d,
          auxId: this.id,
          auxCoords: CubeCoordsHelper.createKeyFromCoordinates(this.position),
          position: mapCubeCoordsTo3dCoords(this.position),
          rotation: this.rotation ?? 0,
          userData: {
            getMediumRef: () => this }
        }

        if (this.isBoardObject || this.isBoardField) {
          const cp = HexagonHelper.calculatePositionInGrid(o.position, HEXAGON_RADIUS);
          o.position.x = cp.x;
          o.position.z = cp.z;
        }

        if (this.isBoardObject) {
          o.position.y = 0.3;
        }
        
        if (this.isBoardField) {
          o.position.y = 0;
        }

        if (d.definitionName === hexagonGridDefinitionName) {
          o.verticles = HexagonHelper.createHexagonPoints(o.position.x, o.position.z, o.radius);
          o.color = o.isEven ? 0xffaaff : 0xfffff
        }

        return o;
      }
    }
    return SceneMedium;
  }
}