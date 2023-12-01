import { IActor } from "../../actors/actors.interface";
import {  IBoardCoordinates, IBoardObjectRotation, IBoardSelector, IField, IUnassignedBoardObject } from "../../board/board.interface";
import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase, IEffectSignatureBase } from "../effects.interface";

export interface ISpawnActor extends IEffectBase {
  effectName: EffectName.SpawnActor;
  enemyId: string;
  minSpawnDistanceFromHero: number;
}

export interface ISpawnDeclaration {
  field: IField,
  sourceActor: IActor & IUnassignedBoardObject,
  rotation: IBoardObjectRotation
}

export interface ISpawnActorDefinition extends IEffectDefinitionBase {
  effect: ISpawnActor & IBoardSelector;
  effectName: EffectName.SpawnActor;
  caster: IEffectCaster & { sight: number };
}

export interface ISpawnActorPayload extends ISpawnActorDefinition {
  payload: ISpawnDeclaration[];
}


export interface ISpawnActorSignature extends IEffectSignatureBase {
  effectName: EffectName.SpawnActor;
  data: {
    casterId: string;
    targets: Array<ISpawnActorResult>
  }
}

export interface ISpawnActorResult {
  rotation: IBoardObjectRotation;
  fieldCoords: IBoardCoordinates;
  targetId: string;
}