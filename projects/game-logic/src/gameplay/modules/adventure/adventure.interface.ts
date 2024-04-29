import { IEntityDeclaration } from "../../../lib/base/entity/entity.interface";
import { Guid } from "../../../lib/extensions/types";
import { IContinuousGameplayState } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.interface";


export type IAdventureTemplate =
  IContinuousGameplayState &
  { entities: IEntityDeclaration[], id: Guid; }

export interface IAdventureDataFeed {
  getAdventureGameplayTemplate: () => Promise<IAdventureTemplate>;
}