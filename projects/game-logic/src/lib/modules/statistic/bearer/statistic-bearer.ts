import { ModifierService } from "../../../cross-cutting/modifier/modifier.service";
import { IClonable } from "../../../extensions/interfaces";
import { IStatistic } from "../statistic.interface";
import { IStatisticBearer } from "./statistic-bearer.interface";

export class StatisticBearer implements IStatisticBearer<[]>, IClonable {

  isStatisticBearer = true as const;

  public get statistics() {
    return Object.entries(this)
      .map(e => e[1] as IStatistic)
      .filter(s => s.isStatistic);
  }

  constructor(
    private readonly modifierService: ModifierService
  ) { }
  
  public getCalculatedStats(): IStatistic[] {
    return this.statistics.map(s => this.modifierService.process(s, this as any))
  }

  public getCalculatedStatisticClone(): this {
    const clone = this.clone();
    return clone;
  }

  public clone() {
    return this;
  };
}