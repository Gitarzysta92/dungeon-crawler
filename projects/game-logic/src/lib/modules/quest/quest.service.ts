import { EntityService } from "../../base/entity/entity.service";
import { IQuest } from "./entities/quest/quest.interface";
import { IQuestDataFeed } from "./quest.interface";


export class QuestService {
  
  constructor(
    private readonly _dataFeed: IQuestDataFeed,
    private readonly _entityService: EntityService
  ) {}

  public async createQuest(questId: string): Promise<IQuest> {
    let quest = await this._dataFeed.getQuest(questId);
    return this._entityService.create<IQuest>(quest);
  }
}