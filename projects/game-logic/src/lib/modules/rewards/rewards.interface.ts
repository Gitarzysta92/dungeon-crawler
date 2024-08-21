import { IActionDeclaration } from "../../cross-cutting/action/action.interface";


export interface IAwardableDeclaration {
  isAwardable: true;
}


export interface IReward extends IRewardDeclaration {

}


export interface IRewardDeclaration extends IActionDeclaration<unknown> {
}