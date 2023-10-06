import { ISceneFieldDeclaration } from "@3d-scene/scene/interfaces/declarations/field-declaration";
import { ISceneObjectDeclaration } from "@3d-scene/scene/interfaces/declarations/scene-object-declaration";
import { MapVectorToRawVector } from "@3d-scene/scene/types/map-vector-to-raw-vector";
import { IField, IBoardObject } from "@game-logic/lib/features/board/board.interface";
import { CoordsHelper } from "@game-logic/lib/features/board/coords.helper";
import { DungeonState } from "@game-logic/lib/game/dungeon-state";
import { IDungeonSceneState } from "../interfaces/dungeon-scene-state";

export function mapDungeonStateToSceneState(d: DungeonState): IDungeonSceneState {
  return {
    board: {
      fields: Object.fromEntries(Object.entries(d.board.fields)
        .map(f => [f[0], Object.assign({}, { isHighlighted: false, isHighlightedRange: false, isSelected: false, isHovered: false })])),
      actors: Object.fromEntries(Object.entries(d.board.objects)
      .map(f => [f[1].id, Object.assign({}, { isHighlighted: false, isSelected: false, isHovered: false, position: f[1].position, rotation: f[1].rotation })])),
    }
  } 
}


export function mapLogicFieldToSceneField(f: IField): MapVectorToRawVector<ISceneFieldDeclaration> {
  return {
    id: f.id,
    auxCoords: f.coords,
    auxId: CoordsHelper.createKeyFromCoordinates(f.coords),
    coords: {
      x: f.coords.q + (f.coords.r) / 2,
      y: 0,
      z: f.coords.r
    },
    disabled: false,
    highlighted: {
      color: 0
    }
  } as MapVectorToRawVector<ISceneFieldDeclaration>;
}


export function mapLogicObjectToSceneObject(o: IBoardObject & { textureUrl: string }): ISceneObjectDeclaration {
  return {  
    auxId: o.id,
    type: "tile-on-field",
    auxFieldId: CoordsHelper.createKeyFromCoordinates(o.position),
    mapTexture: { url: o.textureUrl },
    color: 0x0002,
    rotation: o.rotation
  } as ISceneObjectDeclaration;
}