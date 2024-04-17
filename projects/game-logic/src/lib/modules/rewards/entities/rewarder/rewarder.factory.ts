import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { ModifierService } from "../../../../cross-cutting/modifier/modifier.service";
import { Constructor } from "../../../../extensions/types";
import { IStatistic } from "../../../statistics/entities/statistic/statistic.interface";
import { IReward } from "../reward/reward.interface";
import { IRewarder } from "./rewarder.interface";

export class RewarderFactory implements IMixinFactory<IRewarder>  {

  constructor(
    private readonly _modifierService: ModifierService
  ) { }
  
  public validate(e: IEntityDeclaration & Partial<IRewarder>): boolean {
    return e.isRewarder;
  };

  public create(bc: Constructor<IEntity>): Constructor<IRewarder> {
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