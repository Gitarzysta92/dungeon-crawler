import { IActor } from "../../actors/actors.interface";
import { IBoardCoordinates, IBoardObjectRotation, IBoardSelector, IField, IUnassignedBoardObject } from "../../board/board.interface";
import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase } from "../effects.interface";

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
