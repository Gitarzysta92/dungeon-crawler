import { IDelegateDeclaration } from "../../base/delegate/delegate.interface";


export interface IAwardable {
  isAwardable: true;
}

export interface IRewarding {
  rewards: IReward[];
  isRewarding: true;
}

export interface IReward {
  conditions: IDelegateDeclaration[];
  awardables: { ref: string; actions: IDelegateDeclaration[]; }[];
  claimed?: boolean;
  autoclaim?: boolean;
} 

export interface IRewardBase {
  id: string;
  isUnique: boolean;
  autoclaim: boolean;
}