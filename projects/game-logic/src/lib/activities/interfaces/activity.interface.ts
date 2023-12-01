import { IEffectSignature } from "../../features/effects/signature.interface";
import { PlayerType } from "../../features/players/players.constants";
import { IPlayer } from "../../features/players/players.interface";
import { IStateChangeRecord } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName, DungeonActivityName, SystemActivityName } from "../constants/activity-name";


type DefaultPayload = { [key: string]: unknown };

export interface IActivity<T = DefaultPayload> extends IStateChangeRecord {
  turn?: number;
  name: AdventureActivityName | DungeonActivityName | SystemActivityName;
  playerId?: string;
  payload?: T;
  effectSignatures?: IEffectSignature[]
}

export type IActivityWithPayload<P extends (...args: any) => any> = IActivity<Parameters<P>[0]>
