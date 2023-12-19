import { IActor } from "../../actors/actors.interface";
import {  IBoardCoordinates, IBoardObjectRotation, IBoardSelector, IField, IBoardObject } from "../../board/board.interface";
import { EffectName } from "../commons/effect.constants";
import { IEffectBase, IEffectCaster, IEffectDeclarationBase, IEffectSignatureBase } from "../commons/effect.interface";

export interface ISpawnActor extends IEffectBase {
  effectName: EffectName.SpawnActor;
  enemyId: string;
  minSpawnDistanceFromHero: number;
}

export interface ISpawnActorDeclaration extends IEffectDeclarationBase {
  effect: ISpawnActor & IBoardSelector;
  effectName: EffectName.SpawnActor;
  caster: IEffectCaster & { sight: number };
}

export interface ISpawnActorResolvableDeclaration extends ISpawnActorDeclaration {
  payload: ISpawnDefinition[];
}

export interface ISpawnDefinition {
  field: IField,
  sourceActor: IActor & IBoardObject,
  rotation: IBoardObjectRotation
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

export interface ISpawnActorContext {
  getFieldsBySelector(effect: ISpawnActor & IBoardSelector): unknown;

}