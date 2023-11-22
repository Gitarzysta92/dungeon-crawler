import { IActor } from "../../actors/actors.interface";
import { IBoardObjectRotation, IBoardSelector, IField } from "../../board/board.interface";
import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase } from "../effects.interface";

export interface IModifyPosition extends IEffectBase {
  effectName: EffectName.ModifyPosition;
  allowedMaxDistance?: number;
  multiplayer?: number;
  preserveRotation: boolean;
}


export interface IModifyPositionDefinition extends IEffectDefinitionBase {
  effect: IModifyPosition & IBoardSelector;
  effectName: EffectName.ModifyPosition;
  caster: IEffectCaster;
}


export interface IModifyPositionPayload extends IModifyPositionDefinition {
  payload: IMoveDeclaration[];
}


export interface IMoveDeclaration {
  field: IField;
  actor: IActor;
  rotation: IBoardObjectRotation;
}