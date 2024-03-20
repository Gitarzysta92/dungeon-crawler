import { IPlayer } from "../../framework/base/player/players.interface";
import { IStateChangeRecord } from "../../framework/base/state/state.interface";
import { Guid } from "../../framework/extensions/types";

export type ActivityName = string;

export type DefaultPayload = { [key: string]: unknown };

export interface IActivity<T = DefaultPayload> extends IStateChangeRecord {
  turn?: number;
  name: ActivityName;
  playerId?: string;
  payload?: T;
};

export type IActivityWithPayload<P extends (...args: any) => any> = IActivity<Parameters<P>[0]>;

export interface IActivityContext<T> {
  feed: T,
  authority: IPlayer,
  getControlledActorId: () => Guid;
}
