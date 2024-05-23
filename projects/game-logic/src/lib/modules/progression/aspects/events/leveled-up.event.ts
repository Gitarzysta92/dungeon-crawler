import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IProgressable } from "../../entities/progressable.interface";

export const LEVELED_UP_EVENT = "LEVELED_UP_EVENT";

export interface ILeveledUpEventListenerPayload {
  progressable: IProgressable;
  level: number;
}

export class LevelUpEvent extends EventBase {
  public delegateId = LEVELED_UP_EVENT;

  private _progressableId: Guid;
  private _level: number;

  constructor(p: IProgressable) {
    super();
    this._progressableId = p.id;
    this._level = p.level;
  }

  public isApplicableTo(d: IEventListenerDeclaration<ILeveledUpEventListenerPayload>): boolean {
    return d.delegateId === this.delegateId &&
      d.payload.progressable.isProgressable && 
      d.payload.progressable.id === this._progressableId &&
      this._level === d.payload.level;
  }
}