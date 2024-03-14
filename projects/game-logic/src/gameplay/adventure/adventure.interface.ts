import { Guid } from "../../lib/extensions/types";
import { IContinuousGameplayTemplate } from "../../lib/modules/continuous-gameplay/continuous-gameplay.interface";


export type IAdventureGameplayTemplate =
  IContinuousGameplayTemplate &
  {
    startingAreaId: Guid;
    activeQuestIds: Guid[];
  };


export interface IAdventureGameplayTemplateDataFeed {
  getAdventureGameplayTemplates: (ids?: Guid[]) => Promise<IAdventureGameplayTemplate>[];
  getAdventureGameplayTemplate: (id: Guid) => Promise<IAdventureGameplayTemplate>;
}