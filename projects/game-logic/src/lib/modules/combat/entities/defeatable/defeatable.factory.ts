import { IEntity } from "../../../../base/entity/entity.interface";
import { IConditionDeclaration } from "../../../../cross-cutting/condition/condition.interface";
import { ConditionService } from "../../../../cross-cutting/condition/condition.service";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ICombatStatistic } from "../combat-statistic/combat-statistic.interface";
import { IDefeatable, IDefeatableDeclaration, IDefeater } from "./defeatable.interface";


export class DefeatableFactory implements IMixinFactory<IDefeatable>  {

  constructor(
    private readonly _conditionService: ConditionService
  ) { }

  public static isDefeatable(e: any): boolean {
    return e.isDefeatable;
  }
  
  public static asDamageReciver<T>(data: T): T & IDefeatable {
    if (!this.isDefeatable(data)) {
      throw new Error("Provided data is not a DamageReciver");
    } 
    return data as T & IDefeatable
  }

  public isApplicable(e: IDefeatable): boolean {
    return e.isDefeatable;
  };

  public create(bc: Constructor<IEntity>): Constructor<IDefeatable> {
    const conditionService = this._conditionService;
    class Defeatable extends bc implements IDefeatable {

      public isDefeatable = true;
      public entities: ICombatStatistic[];
      public defeatConditions: IConditionDeclaration<unknown>[];

      @NotEnumerable()
      public defeater: IDefeater;
   
      constructor(e: IDefeatableDeclaration) {
        super(e);
        this.defeatConditions = e.defeatConditions
      }

      public isDefeated(): boolean {
        return conditionService.check(this.defeatConditions, this);
      }
    }
    return Defeatable;
  };
}