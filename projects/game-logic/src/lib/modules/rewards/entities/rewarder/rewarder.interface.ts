import { IRewarderDeclaration } from "../../rewards.interface";
import { IReward } from "../reward/reward.interface";

export interface IRewarder extends IRewarderDeclaration {
  rewards: IReward[];
  isRewarder: true;
}