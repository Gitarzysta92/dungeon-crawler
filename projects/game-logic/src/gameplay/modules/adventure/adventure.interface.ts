import { IEntityDeclaration } from "../../../lib/base/entity/entity.interface";
import { IContinuousGameplayState } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.interface";


export type IAdventureTemplate =
  IContinuousGameplayState &
  { entities: IEntityDeclaration[] }

export interface IAdventureDataFeed {
  getAdventureGameplayTemplate: () => Promise<IAdventureTemplate>;
}