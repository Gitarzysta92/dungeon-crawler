import { IActor } from "../../actors/actors.interface";
import { IBoardCoordinates, IAassignedBoardObject, IBoardObjectRotation, IBoardSelector, IBoardSelectorOrigin, IField } from "../../board/board.interface";
import { EffectName } from "../commons/effects-commons.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase, IEffectSignatureBase } from "../commons/effects-commons.interface";

export interface IModifyPosition extends IEffectBase {
  effectName: EffectName.ModifyPosition;
  allowedMaxDistance?: number;
  multiplayer?: number;
  preserveRotation: boolean;
}


export interface IModifyPositionDefinition extends IEffectDefinitionBase {
  effect: IModifyPosition & IBoardSelector;
  effectName: EffectName.ModifyPosition;
  caster: IEffectCaster & Partial<IAassignedBoardObject>;
}


export interface IModifyPositionPayload extends IModifyPositionDefinition {
  payload: IMoveDeclaration[];
  origin: IAassignedBoardObject;
}


export interface IMoveDeclaration {
  origin: IBoardSelectorOrigin;
  field: IField;
  actor: IActor;
  rotation: IBoardObjectRotation;
}


export interface IModifyPositionSignature extends IEffectSignatureBase {
  effectName: EffectName.ModifyPosition;
  data: {
    casterId: string;
    targets: Array<IModifyPositionResult>;
  }
}


export interface IModifyPositionResult {
  targetId: string;
  position: IBoardCoordinates;
  rotation: IBoardObjectRotation;
}