import { IEntity } from "../../../lib/base/entity/entity.interface";
import { IContinuousGameplayState } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.interface";


export type IAdventureGameplayTemplate =
  IContinuousGameplayState &
  { entities: IEntity[] }

export interface IAdventureGameplayDataFeed {
  getAdventureGameplayTemplate: () => Promise<IAdventureGameplayTemplate>;
}