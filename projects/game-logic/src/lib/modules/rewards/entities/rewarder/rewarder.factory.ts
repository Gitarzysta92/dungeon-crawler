import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { ModifierService } from "../../../../cross-cutting/modifier/modifier.service";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IReward } from "../../rewards.interface";
import { IRewarder, IRewarderDeclaration } from "./rewarder.interface";

export class RewarderFactory implements IMixinFactory<IRewarder>  {

  constructor(
    private readonly _modifierService: ModifierService
  ) { }


  public static isRewarder(data: unknown): boolean {
    return (data as IRewarder).isRewarder; 
  }
  
  public static asRewarder<T>(data: T): T & IRewarder {
    if (!this.isRewarder(data)) {
      throw new Error("Provided data is not a Rewarder");
    } 
    return data as T & IRewarder;
  }
  
  public isApplicable(e: IEntityDeclaration & Partial<IRewarder>): boolean {
    return e.isRewarder;
  };

  public create(bc: Constructor<IEntity>): Constructor<IRewarder> {
    const modifierService = this._modifierService;
    const c = class Rewarder extends bc implements IRewarder {

      public id: string;
      public isRewarder = true as const;
      public rewards: IReward[];

    
      // public get statistics(): IStatistic[] {
      //   return Object.entries(this)
      //     .map(([_, v]) => v as IStatistic)
      //     .filter(s => s.isStatistic);
      // }
    
      constructor(e: IRewarderDeclaration) { 
        super(e);
        this.rewards = e.rewards as IReward[];
      }

      public onInitialize(): void {
        this.rewards.forEach(r => Object.defineProperty(r, 'bearer', {
          value: this,
          enumerable: false
        }))
        super.onInitialize();
      }
    
      public onDestroy(): void {
        super.onDestroy();
      }
    }

    return c; 
  };
}