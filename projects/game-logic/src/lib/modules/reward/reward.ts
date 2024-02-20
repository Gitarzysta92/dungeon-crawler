import { Delegate } from "../../base/delegate/delegate";
import { IDelegateDeclaration } from "../../base/delegate/delegate.interface";
import { IReward } from "./rewards.interface";

export class Reward implements IReward {
  awardables: { ref: string; actions: IDelegateDeclaration[]; }[];
  conditions: Delegate[];
  actions: Delegate[]
  isReward: true;
  claimed?: boolean;
  autoclaim?: boolean;
}