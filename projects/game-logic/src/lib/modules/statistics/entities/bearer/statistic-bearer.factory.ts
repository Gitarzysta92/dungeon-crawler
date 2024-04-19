import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { IActivityCost, IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { Constructor } from "../../../../extensions/types";
import { IStatistic } from "../statistic/statistic.interface";
import { IStatisticBearer } from "./statistic-bearer.interface";

export class StatisticBearerFactory implements IMixinFactory<IStatisticBearer>  {

  constructor() { }
  
  public validate(e: IStatisticBearer): boolean {
    return e.isStatisticBearer;
  };

  public create(bc: Constructor<IEntity & IActivityResourceProvider>): Constructor<IStatisticBearer> {
    return class StatisticBearer extends bc implements IStatisticBearer, IActivityResourceProvider {

      public isStatisticBearer = true as const;
      public get statistics(): IStatistic[] {
        return Object.entries(this)
          .map(([_, v]) => v as IStatistic)
          .filter(s => s?.isStatistic );
      }
    
      constructor(e: IStatisticBearer) { 
        super(e);
        Object.assign(this, Object.fromEntries(Object.entries(e).filter(e => e[1]?.isStatistic)));
      }
      
      public onInitialize(): void {
        this.statistics.forEach(s => {
          s.bearer = this;
        });
        super.onInitialize();
      }
    
      public onDestroy(): void {
        super.onDestroy();
      }

      public validateActivityResources(cs: IActivityCost[]): boolean {
        let isValid = true;
        for (let c of cs) {
          const statistic = this.getStatisticById(c.resourceId);
          if (statistic) {
            continue;
          }
          isValid = statistic.value > c.value;
        }

        if (super.validateActivityResources) {
          return super.validateActivityResources(cs) && isValid;
        }
        return isValid;
      }

      public consumeActivityResources(cs: IActivityCost[]): void {
        for (let c of cs) {
          const statistic = this.getStatisticById(c.resourceId);
          if (statistic) {
            continue;
          }
          statistic.subtract(c.value);
        }

        if (super.consumeActivityResources) {
          super.consumeActivityResources(cs);
        }
      }
    
      public calculateStatistics(): this {
        this.statistics.forEach(s => s.calculate())
        return this;
      }
      
      public getCalculatedStatistics(): IStatistic[] {
        return this.statistics.map(s => s.clone().calculate());
      }
    
      public getCalculatedStatistic(statisticId: string): IStatistic | undefined {
        const statistic = this.getStatisticById(statisticId);
        if (!statistic) {
          return
        }
        return statistic.clone().calculate();
      }
    
      public getStatisticById(statisticId: string): IStatistic | undefined {
        return this.statistics.find(s => s.id === statisticId);
      }

      public hasStatistic(statisticId: string): boolean {
        return this.statistics.some(s => s.id === statisticId);
      }
    
      public clone() {
        return this;
      };
    }
  };
}