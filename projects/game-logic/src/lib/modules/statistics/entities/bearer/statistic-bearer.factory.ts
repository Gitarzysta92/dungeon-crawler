import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { IInteractionCost, IInteractionResourceProvider } from "../../../../cross-cutting/interaction/interaction.interface";
import { Constructor } from "../../../../extensions/types";
import { IStatistic } from "../statistic/statistic.interface";
import { IStatisticBearer } from "./statistic-bearer.interface";

export class StatisticBearerFactory implements IEntityFactory<IStatisticBearer>  {

  constructor() { }
  
  public validate(e: IEntity & Partial<IStatisticBearer>): boolean {
    return e.isStatisticBearer;
  };

  public create(bc: typeof Entity & Constructor<IInteractionResourceProvider>): Constructor<IStatisticBearer> {
    return class StatisticBearer extends bc implements IStatisticBearer {

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

      public validateInteractionResources(cs: IInteractionCost[]): boolean {
        let isValid = true;
        for (let c of cs) {
          const statistic = this.getStatisticById(c.resourceId);
          if (statistic) {
            continue;
          }
          isValid = statistic.value > c.value;
        }

        if (super.validateInteractionResources) {
          return super.validateInteractionResources(cs) && isValid;
        }
        return isValid;
      }

      public consumeInteractionResources(cs: IInteractionCost[]): void {
        for (let c of cs) {
          const statistic = this.getStatisticById(c.resourceId);
          if (statistic) {
            continue;
          }
          statistic.subtract(c.value);
        }

        if (super.consumeInteractionResources) {
          super.consumeInteractionResources(cs);
        }
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
    
      public clone() {
        return this;
      };
    }
  };
}