import { IActor } from "../actors/actors.interface";
import { IBoardObjectRotation, IField } from "../board/board.interface";
import { EffectName } from "./effects.constants";
import { IEffectBase, IEffectPayloadBase } from "./effects.interface";

export interface IModifyPosition extends IEffectBase {
  effectName: EffectName.ModifyPosition;
  allowedMaxDistance?: number;
  multiplayer?: number;
  preserveRotation: boolean;
}


export interface IModifyPositionPayload extends IEffectPayloadBase {
  effectName: EffectName.ModifyPosition;
  payload: IMoveDeclaration[];
}


export interface IMoveDeclaration {
  field: IField;
  actor: IActor;
  rotation: IBoardObjectRotation;
}