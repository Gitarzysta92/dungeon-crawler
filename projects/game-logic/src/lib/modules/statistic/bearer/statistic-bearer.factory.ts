import { IEntityFactory, IEntity } from "../../../base/entity/entity.interface";
import { ModifierService } from "../../../cross-cutting/modifier/modifier.service";
import { StatisticBearer } from "./statistic-bearer";
import { IStatisticBearer } from "./statistic-bearer.interface";

export class StatisticBearerFactory implements IEntityFactory<IStatisticBearer<[]>>  {
  public get classDefinition() { return StatisticBearer };

  constructor(
    private readonly _modifierService: ModifierService
  ) { }
  
  public create(e: IStatisticBearer<[]> & IEntity): StatisticBearer {
    return new StatisticBearer(this._modifierService);
  };

  public validate(e: IEntity & Partial<IStatisticBearer<[]>>): boolean {
    return e.isStatisticBearer;
  };

}