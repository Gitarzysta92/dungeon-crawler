import { IActivitySubject } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { Value } from "../../../../base/value/value";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { IModifierDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { ModifierService } from "../../../../cross-cutting/modifier/modifier.service";

import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IMPROVE_STATISTIC_ACTIVITY, StatisticType } from "../../statistics.constants";
import { IStatisticBearer } from "../bearer/statistic-bearer.interface";
import { IStatistic, IStatisticDeclaration } from "./statistic.interface";

export class StatisticFactory implements IMixinFactory<IStatistic>  {

  constructor(
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService
  ) { }
  
  public isApplicable(e: IEntityDeclaration & Partial<IStatistic>): boolean {
    return e.isStatistic;
  };

  public create(bc: Constructor<IEntity & IActivitySubject>): Constructor<IStatistic> {
    const modifierService = this._modifierService;
    const eventService = this._eventService;

    class Statistic extends bc implements IStatistic {
      id: string;
      type: StatisticType;
      isStatistic = true as const;
      value?: number;
      baseValue?: number;
      regainValue?: number;
      modifiers: IModifierDeclaration<unknown>[];
      
      public get isRegainable() { return this.regainValue != undefined }
      public get isImprovable() { return this.activities.some(a => a.id === IMPROVE_STATISTIC_ACTIVITY) }

      @NotEnumerable()
      public statisticBearer: WeakRef<IStatisticBearer>;
  
      constructor(
        data: IStatisticDeclaration,
      ) {
        super(data);
        this.id = data.id;
        this.type = data.type;
        this.value = data.value;
        this.baseValue = data.baseValue;
        this.regainValue = data.regainValue;
        this.modifiers = data.modifiers;
      }
  
    
      public onInitialize(): void {
        if (isNaN(this.value)) {
          this.value = this.baseValue;
        }
        super.onInitialize();
      }
    
      public onDestroy(): void {
        super.onDestroy();
      }
    
    
      public add(value: number): void {
        this.value += value;
      }
    
      public subtract(value: number): number {
        this.value -= value;
        if (this.value > 0) {
          return 0
        }
        return this.value;
      }
      
      public setback(value: number): void {
        if (!isNaN(this.value)) {
          this.value -= value;
        }
        if (!isNaN(this.baseValue)) {
          this.baseValue -= value;
        }
      }
    
      public improve(value: number): void {
        if (!isNaN(this.value)) {
          this.value += value;
        }
        if (!isNaN(this.baseValue)) {
          this.baseValue += value;
        }
      }
    
      public regain(value?: number) {
        if (isNaN(this.regainValue) && isNaN(value) || isNaN(this.baseValue) || isNaN(this.value)) {
          throw new Error("Statistic is not regainable");
        }
    
        this.value += value ?? this.regainValue;
        if (this.value > this.baseValue) {
          this.value = this.baseValue;
        }
      }
    
      public calculate(): this {
        modifierService.process(this, this.statisticBearer.deref());
        return this;
      }
    
      public clone(): Statistic {
        return this;
      }
    
      // public toJSON(): IStatistic {
      //   return Object.assign(
      //     super.toJSON(),
      //     SerializationHelper.prepare<IStatisticDeclaration>(this.clone())
      //   )
      // }
    }
    return Statistic;
  };

}