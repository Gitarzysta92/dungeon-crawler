import { IBoardCoordinates } from "../board/board.interface";
import { EffectName } from "./effects.constants";
import { IEffectBase, IEffectPayload } from "./effects.interface";

export interface ISpawnActor extends IEffectBase {
  effectName: EffectName.SpawnActor;
  enemyId: string;
}

export interface ISpawnDeclaration {
  coords: IBoardCoordinates,
  actorId: string
}

export interface ISpawnActorPayload extends IEffectPayload {
  effectName: EffectName.SpawnActor;
  declarations: ISpawnDeclaration[];
}
