import { ISceneFieldDeclaration } from "@3d-scene/scene/interfaces/declarations/field-declaration";
import { ISceneObjectDeclaration } from "@3d-scene/scene/interfaces/declarations/scene-object-declaration";
import { MapVectorToRawVector } from "@3d-scene/scene/types/map-vector-to-raw-vector";
import { IField, IBoardObject } from "@game-logic/lib/features/board/board.interface";

export function mapLogicFieldToSceneField(f: IField): MapVectorToRawVector<ISceneFieldDeclaration> {
  return {
    id: f.id,
    auxCoords: `${f.coords.q}${f.coords.r}${f.coords.s}`,
    auxId: `${f.coords.q}${f.coords.r}${f.coords.s}`,
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
    auxFieldId: `${o.position.q}${o.position.r}${o.position.s}`,
    mapTexture: { url: o.textureUrl },
    color: 0x0002,
    rotation: o.rotation
  } as ISceneObjectDeclaration;
}