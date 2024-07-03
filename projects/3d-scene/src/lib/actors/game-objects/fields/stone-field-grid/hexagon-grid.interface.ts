import { Vector3 } from "three";
import { IRawVector2 } from "../../../../extensions/types/raw-vector2";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";


export interface IHexagonGridFieldDeclaration {
  auxId: string;
  auxCoords: string;
  verticles: IRawVector2[];
  isEven: boolean;
  radius: number;
  defaultColor: number;
  highlightColor: number;
  hoverColor: number;
  selectColor: number;
  position: Vector3;
  userData: any;
  color: number;
}

export interface IHexagonGridDeclaration {
  fields: IHexagonGridFieldDeclaration[];
  hexagonRadius: number;
}

export interface IHexagonGridField {
  position: IRawVector3;
}

