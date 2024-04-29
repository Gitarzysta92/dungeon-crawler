import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { IModifierDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { ModifierService } from "../../../../cross-cutting/modifier/modifier.service";
import { JsonPathResolver } from "../../../../extensions/json-path";
import { NotEnumerable } from "../../../../extensions/object-traverser";
import { Constructor } from "../../../../extensions/types";
import { StatisticType } from "../../statistics.constants";
import { IStatisticBearer } from "../bearer/statistic-bearer.interface";
import { IStatistic, IStatisticDeclaration } from "./statistic.interface";

export class StatisticFactory implements IMixinFactory<IStatistic>  {

  constructor(
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService
  ) { }
  
  public validate(e: IEntityDeclaration & Partial<IStatistic>): boolean {
    return e.isStatistic;
  };

  public create(bc: Constructor<IEntity>): Constructor<IStatistic> {
    const modifierService = this._modifierService;
    const eventService = this._eventService;

    class Statistic extends bc implements IStatistic {
      id: string;
      type: StatisticType;
      isStatistic = true as const;
      value?: number;
      baseValue?: number;
      regainValue?: number;
      regainWhen: IEventListenerDeclaration<unknown>[] = [];
      modifiers: IModifierDeclaration<unknown>[];
    
      @NotEnumerable()
      bearer: IStatisticBearer;
  
      constructor(
        data: IStatisticDeclaration,
      ) {
        super(data);
        this.id = data.id;
        this.type = data.type;
        this.value = data.value;
        this.baseValue = data.baseValue;
        this.regainValue = data.regainValue;
        this.regainWhen = data.regainWhen;
        this.modifiers = data.modifiers;
      }
    
      private _regainTriggerHandler = (e) => {
        const tempStatistic = this.clone();
        modifierService.process(tempStatistic, this.bearer);
        for (let trigger of tempStatistic.regainWhen) {
          if (e.isApplicableTo(JsonPathResolver.resolve(trigger, this))) {
            this.regain(tempStatistic.regainValue);
          }
        }
      }
    
      public onInitialize(): void {
        if (isNaN(this.value)) {
          this.value = this.baseValue;
        }
        eventService.listen(this._regainTriggerHandler);
        super.onInitialize();
      }
    
      public onDestroy(): void {
        eventService.stopListening(this._regainTriggerHandler);
        super.onDestroy();
      }
    
    
      public add(value: number): void {
        this.value += value;
      }
    
      public subtract(value: number): void {
        this.value -= value;
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
        modifierService.process(this, this.bearer);
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