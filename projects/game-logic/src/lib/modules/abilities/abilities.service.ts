import { EntityService } from "../../base/entity/entity.service";
import { IAbilitiesDataFeed } from "./abilities.interface";
import { IAbilityPerformer } from "./entities/performer/ability-performer.interface";
import { Guid } from "../../extensions/types";
import { IAbility } from "./entities/ability/ability.interface";

export class AbilitiesService {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _dataFeed: IAbilitiesDataFeed
  ) { }

  public async addAbility(id: Guid, performer: IAbilityPerformer): Promise<void> {
    if (performer.hasAbility(id)) {
      return;
    }

    let ability = await this._dataFeed.getAbility(id);
    if (!ability) {
      throw new Error('There are no abilities of given id');
    }

    ability = (await this._entityService.create(ability)) as IAbility;
    performer.addAbility(ability);
  }
}