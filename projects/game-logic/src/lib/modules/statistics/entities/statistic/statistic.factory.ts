import { IActivitySubject } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { IModificable } from "../../../../cross-cutting/modifier/modifier.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IStatisticModifier } from "../../aspects/modifiers/statistic-modifier.mixin";
import { IStatisticBearer } from "../bearer/statistic-bearer.interface";
import { IStatistic, IStatisticDeclaration } from "./statistic.interface";

export class StatisticFactory implements IMixinFactory<IStatistic>  {

  constructor() { }
  
  public isApplicable(e: IEntityDeclaration & Partial<IStatistic>): boolean {
    return e.isStatistic;
  };

  public create(bc: Constructor<IEntity & IActivitySubject & IModificable>): Constructor<IStatistic> {
    class Statistic extends bc implements IStatistic {
      public id: string;
      public isStatistic = true as const;
      public isModificable = true as const;
      public appliedModifiers: Map<IStatisticModifier, IStatisticModifier>;

      public get value() { return this.getStatisticValue() };
      public baseValue: number;
      public maxBaseValue?: number;
      public minBaseValue?: number;
 
      @NotEnumerable()
      public statisticBearer: WeakRef<IStatisticBearer>;

      constructor(
        data: IStatisticDeclaration,
      ) {
        super(data);
        this.id = data.id;
        this.baseValue = data.baseValue;
        this.maxBaseValue = data.maxBaseValue;
        this.minBaseValue = data.minBaseValue;
      }
 
      public add(value: number): void {
        this.baseValue += value;
      }
      
      public subtract(value: number): number {
        this.baseValue -= value;
        if (isNaN(this.minBaseValue) || this.minBaseValue <= this.baseValue) {
          return 0;
        }
        const temp = this.baseValue;
        this.baseValue = this.minBaseValue
        return Math.abs(temp);
      }
      
      public setback(value: number): void {
        if (!isNaN(this.value)) {
          this.baseValue -= value;
        }
        if (!isNaN(this.baseValue)) {
          this.baseValue -= value;
        }
      }
      
      public improve(value: number): void {
        if (!isNaN(this.value)) {
          this.baseValue += value;
        }
        if (!isNaN(this.baseValue)) {
          this.baseValue += value;
        }
      }
      
      public regain(value: number) {
        if (isNaN(this.maxBaseValue) && isNaN(value) || isNaN(this.baseValue) || isNaN(this.value)) {
          throw new Error("Statistic is not regainable");
        }
      
        this.baseValue += value;
        if (this.baseValue > this.maxBaseValue) {
          this.baseValue = this.maxBaseValue;
        }
      }

      public getStatisticValue() {
        let value = this.baseValue;
        if (this.isModificable) {

          // for (let m of this.appliedModifiers.values()) {
          //   console.log(m);
          //   //value = m.process(this.value)
          // }
        }
        return value;
      }
  
    }

    return Statistic;
  };

}




// public get isRegainable() { return this.regainValue != undefined }
// 




