import { ISceneMedium, ISceneMediumDeclaration } from "./scene-medium.interface";
import { Constructor } from "@game-logic/lib/extensions/types";
import { IMixinFactory } from "@game-logic/lib/base/mixin/mixin.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { mapCubeCoordsTo3dCoords } from "../../misc/coords-mappings";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { Highlightable } from "@3d-scene/lib/behaviors/highlightable/highlightable.mixin";
import { Movable } from "@3d-scene/lib/behaviors/movable/movable.mixin";
import { Rotatable } from "@3d-scene/lib/behaviors/rotatable/rotatable.mixin";
import { Selectable } from "@3d-scene/lib/behaviors/selectable/selectable.mixin";


export class SceneMediumFactory implements IMixinFactory<ISceneMedium> {

  public validate(e: ISceneMediumDeclaration): boolean {
    return e.isSceneMedium;
  }

  public create(e: Constructor<IEntity & Partial<{ position: ICubeCoordinates, rotation: 0 | 1 | 3 | 2 | 4 | 5 }>>): Constructor<ISceneMediumDeclaration> {
    class SceneMedium extends e implements ISceneMedium {
      id: string;
      auxId: string;
      isHighlighted: false;
      isSelected: false;
      isHovered: false;
      isPreview: false;
      scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; }
      isSceneMedium = true as const;

      constructor(d: ISceneMediumDeclaration) {
        super(d);
        this.scene = d.scene;
      }

      public getComposerDeclarations() {
        return this.scene.composerDeclarations.map(d => ({
          id: this.id,
          auxId: CubeCoordsHelper.createKeyFromCoordinates(this.position),
          position: mapCubeCoordsTo3dCoords(this.position),
          ...d,
        }))
      }
            
      public async updateBehavior(): Promise<void> {
        await Movable.validate(this)?.move(token.position);
        if ('rotation' in token) {
          await Rotatable.validate(this)?.rotate(token.rotation);
        }
      
        if (token.isSelected) {
          Selectable.validate(this).select();
        } else {
          Selectable.validate(this).deselect();
        }
      
        if (token.isHighlighted) {
          Highlightable.validate(this).highlight();
        } else {
          Highlightable.validate(this).unhighlight();
        }
      }

    }
    return SceneMedium;
  }
}