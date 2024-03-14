import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { ModifierService } from "../../../../cross-cutting/modifier/modifier.service";
import { Constructor } from "../../../../extensions/types";
import { IStatistic } from "../../../statistics/entities/statistic/statistic.interface";
import { IReward } from "../reward/reward.interface";
import { IRewarder } from "./rewarder.interface";

export class RewarderFactory implements IEntityFactory<IRewarder>  {

  constructor(
    private readonly _modifierService: ModifierService
  ) { }
  
  public validate(e: IEntity & Partial<IRewarder>): boolean {
    return e.isRewarder;
  };

  public create(bc: typeof Entity): Constructor<IRewarder> {
    const modifierService = this._modifierService;
    const c = class Rewarder extends bc implements IRewarder {

      public id: string;
      public toRemove?: boolean;
      public isEntity: true;
      public isRewarder = true as const;
      public rewards: IReward[];

    
      public get statistics(): IStatistic[] {
        return Object.entries(this)
          .map(([_, v]) => v as IStatistic)
          .filter(s => s.isStatistic);
      }
    
      constructor(e: IRewarder) { 
        super(e);
        Object.assign(this, e);
      }

      public onInitialize(): void {
        this.rewards.forEach(r => r.bearer = this)
        super.onInitialize();
      }
    
      public onDestroy(): void {
        super.onDestroy();
      }

    }

    return c; 
  };
}