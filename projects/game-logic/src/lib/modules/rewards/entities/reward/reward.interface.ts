import { IRewardDeclaration } from "../../rewards.interface";
import { IRewarder } from "../rewarder/rewarder.interface";

export interface IReward extends IRewardDeclaration {
  bearer: IRewarder
}

