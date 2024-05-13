
import { ISceneField, ISceneToken } from "../../scene/interfaces/dungeon-scene-state";
import { ITokenDefinition } from "@3d-scene/lib/actors/game-objects/tokens/common/token.interface";
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { IBoardAssignment, IBoardObjectDeclaration } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";
import { CoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { mapCubeCoordsTo3dCoords } from "../../scene/entities/scene-element.factory";


export function mapFieldToSceneField(
  f: { id: string, position: ICubeCoordinates, visual: { scene: ITokenDefinition<unknown> } }
): ISceneField {
  return {
    id: f.id,
    auxId: CoordsHelper.createKeyFromCoordinates(f.position),
    position: mapCubeCoordsTo3dCoords(f.position),
    isHighlighted: false,
    isHighlightedRange: false,
    isHovered: false,
    isSelected: false,
    ...f.visual.scene
  };
}

export function mapBoardObjectToSceneToken(
  o: IBoardObjectDeclaration & IBoardAssignment & { visual: { scene: ITokenDefinition<unknown> } } 
): ISceneToken {
  return {
    id: o.id,
    auxId: o.id,
    takenFieldId: CoordsHelper.createKeyFromCoordinates(o.position),
    isHighlighted: false,
    isSelected: false,
    isHovered: false,
    isPreview: false,
    position: mapCubeCoordsTo3dCoords(o.position),
    rotation: o.rotation ?? 0,
    ...o.visual.scene
  };
}