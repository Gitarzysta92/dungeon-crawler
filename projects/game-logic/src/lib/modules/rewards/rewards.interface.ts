import { IEntityDeclaration } from "../../base/entity/entity.interface";
import { IActionDeclaration } from "../../cross-cutting/action/action.interface";
import { IEventListenerDeclaration } from "../../cross-cutting/event/event.interface";


export interface IAwardableDeclaration {
  isAwardable: true;
}

export interface IRewarderDeclaration extends IEntityDeclaration {
  rewards: IRewardDeclaration[];
  isRewarder: true;
}

export interface IRewardDeclaration extends IEntityDeclaration {
  rewardWhen: IEventListenerDeclaration<unknown>[];
  actions?: IActionDeclaration<unknown>[];
  claimed?: boolean;
  autoclaim?: boolean;
  isReward: true;
}