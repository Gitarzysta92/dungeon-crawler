import { IBoardCoordinates, IBoardObjectRotation } from "../board/board.interface";
import { EffectName } from "./effects.constants";
import { IEffectBase } from "./effects.interface";

export interface IModifyPosition extends IEffectBase {
  effectName: EffectName.ModifyPosition;
  allowedMaxDistance?: number;
  multiplayer?: number;
  preserveRotation: boolean;
}


export interface IModifyStatsPayload {
  id: string;
  effectName: EffectName.ModifyStats;
  payload: IMoveDeclaration[]
}


export interface IMoveDeclaration {
  coords: IBoardCoordinates;
  actorId: string;
  rotation: IBoardObjectRotation;
}