import { IBoardCoordinates } from "../../board/board.interface";
import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectPayloadBase } from "../effects.interface";

export interface ISpawnActor extends IEffectBase {
  effectName: EffectName.SpawnActor;
  enemyId: string;
  minSpawnDistanceFromHero: number;
}

export interface ISpawnDeclaration {
  coords: IBoardCoordinates,
  sourceActorId: string
}

export interface ISpawnActorPayload extends IEffectPayloadBase {
  effectName: EffectName.SpawnActor;
  payload: ISpawnDeclaration[];
}
