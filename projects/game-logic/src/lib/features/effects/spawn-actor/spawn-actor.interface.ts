import { IBoardCoordinates, IBoardSelector } from "../../board/board.interface";
import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase } from "../effects.interface";

export interface ISpawnActor extends IEffectBase {
  effectName: EffectName.SpawnActor;
  enemyId: string;
  minSpawnDistanceFromHero: number;
}

export interface ISpawnDeclaration {
  coords: IBoardCoordinates,
  sourceActorId: string
}

export interface ISpawnActorDefinition extends IEffectDefinitionBase {
  effect: ISpawnActor & IBoardSelector;
  effectName: EffectName.SpawnActor;
  caster: IEffectCaster & { sight: number };
}

export interface ISpawnActorPayload extends ISpawnActorDefinition {
  payload: ISpawnDeclaration[];
}
