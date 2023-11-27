import { IActor } from "../../actors/actors.interface";
import { IBoardObject, IBoardObjectRotation, IBoardSelector, IBoardSelectorOrigin, IField } from "../../board/board.interface";
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
  caster: IEffectCaster & Partial<IBoardObject>;
}


export interface IModifyPositionPayload extends IModifyPositionDefinition {
  payload: IMoveDeclaration[];
  origin: IBoardObject;
}


export interface IMoveDeclaration {
  origin: IBoardSelectorOrigin;
  field: IField;
  actor: IActor;
  rotation: IBoardObjectRotation;
}