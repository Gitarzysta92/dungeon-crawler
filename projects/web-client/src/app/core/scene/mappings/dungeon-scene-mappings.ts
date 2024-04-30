
import { IDungeonSceneState, ISceneField, ISceneToken } from "../interfaces/dungeon-scene-state";
import { IFieldDefinition } from "@3d-scene/lib/actors/game-objects/fields/common/field.interface";
import { ITokenDefinition } from "@3d-scene/lib/actors/game-objects/tokens/common/token.interface";
import { IRawVector3 } from "@3d-scene/lib/extensions/types/raw-vector3";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { IBoardCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { IBoardAssignment, IBoardObjectDeclaration } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";
import { CoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";

export function mapHexagonalCoordsTo3dCoords(c: IBoardCoordinates): IRawVector3 {
  return {
    x: c.q + (c.r) / 2,
    y: 0,
    z: c.r
  }
}

// export function mapDungeonBoardToSceneState(
//   d: IBoard<IBoardActorDataFeedEntity<ISceneComposerDefinition<unknown>>>,
// ): IDungeonSceneState {
//   // TODO : remove any assertion.
//   return {
//     fields: Object.fromEntries(Object.entries(d.fields)
//       .map(f => [f[0], mapFieldToSceneField(f[1] as any)])),
//     tokens: Object.fromEntries(Object.entries(d.objects)
//       .map(f => [f[1].id, mapBoardObjectToSceneToken(f[1])]))
//   } 
// }

// export function mapFieldToSceneField(
//   f: { id: string, position: IBoardCoordinates, visualScene: IFieldDefinition<unknown> }
// ): ISceneField {
//   return {
//     id: f.id,
//     auxId: CoordsHelper.createKeyFromCoordinates(f.position),
//     position: mapHexagonalCoordsTo3dCoords(f.position),
//     isHighlighted: false,
//     isHighlightedRange: false,
//     isHovered: false,
//     isSelected: false,
//     ...f.visualScene
//   };
// }

// export function mapBoardObjectToSceneToken(
//   o: IBoardObjectDeclaration & IBoardAssignment & { visualScene: ITokenDefinition<unknown> } 
// ): ISceneToken {
//   return {
//     id: o.id,
//     auxId: o.id,
//     takenFieldId: CoordsHelper.createKeyFromCoordinates(o.position),
//     isHighlighted: false,
//     isSelected: false,
//     isHovered: false,
//     isPreview: false,
//     //position: mapHexagonalCoordsTo3dCoords(o.position),
//     rotation: o.rotation,
//     ...o.visualScene
//   };
// }