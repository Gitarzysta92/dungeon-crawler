<<<<<<< HEAD
import { ISceneFieldDeclaration } from "@3d-scene/scene/interfaces/declarations/field-declaration";
import { ISceneObjectDeclaration } from "@3d-scene/scene/interfaces/declarations/scene-object-declaration";
import { MapVectorToRawVector } from "@3d-scene/scene/types/map-vector-to-raw-vector";
import { IField, IAassignedBoardObject } from "@game-logic/lib/features/board/board.interface";
=======
import { IBoardObject, IBoardCoordinates, IBoard } from "@game-logic/lib/features/board/board.interface";
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150
import { CoordsHelper } from "@game-logic/lib/features/board/coords.helper";
import { IDungeonSceneState, ISceneField, ISceneToken } from "../interfaces/dungeon-scene-state";
import { IFieldDefinition } from "@3d-scene/lib/actors/game-objects/fields/common/field.interface";
import { ITokenDefinition } from "@3d-scene/lib/actors/game-objects/tokens/common/token.interface";
import { IRawVector3 } from "@3d-scene/lib/extensions/types/raw-vector3";
import { IBoardActorDataFeedEntity } from "../../data-feed/interfaces/data-feed-actor-entity.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";

export function mapDungeonBoardToSceneState(
  d: IBoard<IBoardActorDataFeedEntity<ISceneComposerDefinition<unknown>>>,
): IDungeonSceneState {
  // TODO : remove any assertion.
  return {
    fields: Object.fromEntries(Object.entries(d.fields)
      .map(f => [f[0], mapFieldToSceneField(f[1] as any)])),
    tokens: Object.fromEntries(Object.entries(d.objects)
      .map(f => [f[1].id, mapBoardObjectToSceneToken(f[1])]))
  } 
}

export function mapFieldToSceneField(
  f: { id: string, position: IBoardCoordinates, visualScene: IFieldDefinition<unknown> }
): ISceneField {
  return {
    id: f.id,
    auxId: CoordsHelper.createKeyFromCoordinates(f.position),
    position: mapHexagonalCoordsTo3dCoords(f.position),
    isHighlighted: false,
    isHighlightedRange: false,
    isHovered: false,
    isSelected: false,
    ...f.visualScene
  };
}

<<<<<<< HEAD

export function mapDungeonStateObjectToSceneObject(o: IActor & IAassignedBoardObject): ISceneObjectState {
=======
export function mapBoardObjectToSceneToken(
  o: IBoardObject & { visualScene: ITokenDefinition<unknown> } 
): ISceneToken {
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150
  return {
    id: o.id,
    auxId: o.id,
    takenFieldId: CoordsHelper.createKeyFromCoordinates(o.position),
    isHighlighted: false,
    isSelected: false,
    isHovered: false,
    isPreview: false,
    //position: mapHexagonalCoordsTo3dCoords(o.position),
    rotation: o.rotation,
<<<<<<< HEAD
    outlets: o.outlets,
    size: o.size,
    sourceActorId: o.sourceActorId
  }
=======
    ...o.visualScene
  };
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150
}

export function mapHexagonalCoordsTo3dCoords(c: IBoardCoordinates): IRawVector3 {
  return {
<<<<<<< HEAD
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


export function mapLogicObjectToSceneObject(o: IBoardActorDataFeedEntity & IAassignedBoardObject): ISceneObjectDeclaration {
  return {  
    auxId: o.id,
    type: "tile-on-field",
    auxFieldId: CoordsHelper.createKeyFromCoordinates(o.position),
    mapTexture: { url: o.visualScene.mapTexture },
    color: 0x0002,
    rotation: o.rotation
  } as ISceneObjectDeclaration;
=======
    x: c.q + (c.r) / 2,
    y: 0,
    z: c.r
  }
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150
}