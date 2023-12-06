import { ISceneFieldDeclaration } from "@3d-scene/scene/interfaces/declarations/field-declaration";
import { ISceneObjectDeclaration } from "@3d-scene/scene/interfaces/declarations/scene-object-declaration";
import { MapVectorToRawVector } from "@3d-scene/scene/types/map-vector-to-raw-vector";
import { IField, IBoardObject } from "@game-logic/lib/features/board/board.interface";
import { CoordsHelper } from "@game-logic/lib/features/board/coords.helper";
import { DungeonState } from "@game-logic/lib/states/dungeon-state";
import { IDungeonSceneState, ISceneFieldState, ISceneObjectState } from "../interfaces/dungeon-scene-state";
import { IBoardActorDataFeedEntity } from "../../data-feed/interfaces/data-feed-actor-entity.interface";
import { IActor } from "@game-logic/lib/features/actors/actors.interface";

export function mapDungeonStateToSceneState(
  d: DungeonState,
): IDungeonSceneState {
  return {
    board: {
      fields: Object.fromEntries(Object.entries(d.board.fields)
        .map(f => [f[0], mapDungeonStateFieldToSceneField(f[1])])),
      objects: Object.fromEntries(Object.entries(d.board.objects)
        .map(f => [f[1].id, mapDungeonStateObjectToSceneObject(f[1])])),
    },
    hero: JSON.parse(JSON.stringify(d.hero)) as any
  } 
}


export function mapDungeonStateFieldToSceneField(f: IField): ISceneFieldState {
  return {
    isHighlighted: false,
    isHighlightedRange: false,
    isSelected: false,
    isHovered: false,
  }
}


export function mapDungeonStateObjectToSceneObject(o: IActor & IBoardObject): ISceneObjectState {
  return {
    id: o.id,
    isHighlighted: false,
    isSelected: false,
    isHovered: false,
    isPreview: false,
    position: o.position,
    rotation: o.rotation,
    actorType: o.actorType,
    sourceActorId: o.sourceActorId
  }
}


export function mapLogicFieldToSceneField(f: IField): MapVectorToRawVector<ISceneFieldDeclaration> {
  return {
    id: f.id,
    auxCoords: f.position,
    auxId: CoordsHelper.createKeyFromCoordinates(f.position),
    coords: {
      x: f.position.q + (f.position.r) / 2,
      y: 0,
      z: f.position.r
    },
    disabled: false,
    highlighted: {
      color: 0
    }
  } as MapVectorToRawVector<ISceneFieldDeclaration>;
}


export function mapLogicObjectToSceneObject(o: IBoardActorDataFeedEntity & IBoardObject): ISceneObjectDeclaration {
  return {  
    auxId: o.id,
    type: "tile-on-field",
    auxFieldId: CoordsHelper.createKeyFromCoordinates(o.position),
    mapTexture: { url: o.visualScene.mapTexture },
    color: 0x0002,
    rotation: o.rotation
  } as ISceneObjectDeclaration;
}