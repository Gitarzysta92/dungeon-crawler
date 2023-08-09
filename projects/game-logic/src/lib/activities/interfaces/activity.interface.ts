import { IStateChangeRecord } from "../../state-dispatcher/interfaces/dispatcher-directive.interface";
import { AdventureActivityName, DungeonActivityName } from "../constants/activity-name";


type DefaultPayload = { [key: string]: unknown };

export interface IActivity<T = DefaultPayload> extends IStateChangeRecord {
  turn?: number;
  name: AdventureActivityName | DungeonActivityName;
  payload?: T;
}

export type IActivityWithPayload<P extends (...args: any) => any> = IActivity<Parameters<P>[0]>
