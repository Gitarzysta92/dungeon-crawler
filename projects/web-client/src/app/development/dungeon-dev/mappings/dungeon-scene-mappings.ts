
import { ISceneField, ISceneToken } from "../../../core/scene/interfaces/scene.interface";
import { ITokenDefinition } from "@3d-scene/lib/actors/game-objects/tokens/common/token.interface";
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { IBoardAssignment, IBoardObjectDeclaration } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { mapCubeCoordsTo3dCoords } from "../../../core/scene/misc/coords-mappings";
import { HexagonHelper } from "src/app/core/scene/misc/hexagon.helper";
import { HEXAGON_RADIUS } from "src/app/core/scene/constants/hexagon.constants";


export function mapFieldToSceneField(
  f: { id: string, position: ICubeCoordinates } & ITokenDefinition<unknown>
): ISceneField {
  return {
    ...f,
    id: f.id,
    auxId: CubeCoordsHelper.createKeyFromCoordinates(f.position),
    auxCoords: CubeCoordsHelper.createKeyFromCoordinates(f.position),
    position: HexagonHelper.calculatePositionInGrid(mapCubeCoordsTo3dCoords(f.position), HEXAGON_RADIUS),
    isHighlighted: false,
    isHighlightedRange: false,
    isHovered: false,
    isSelected: false,
  };
}

export function mapBoardObjectToSceneToken(
  o: IBoardObjectDeclaration & IBoardAssignment & ITokenDefinition<unknown>
): ISceneToken {
  return {
    ...o,
    id: o.id,
    auxId: o.id,
    auxCoords: CubeCoordsHelper.createKeyFromCoordinates(o.position),
    //takenFieldId: CubeCoordsHelper.createKeyFromCoordinates(o.position),
    isHighlighted: false,
    isSelected: false,
    isHovered: false,
    isPreview: false,
    position:  HexagonHelper.calculatePositionInGrid(mapCubeCoordsTo3dCoords(o.position), HEXAGON_RADIUS),
    rotation: o.rotation ?? 0
  } as any;
}