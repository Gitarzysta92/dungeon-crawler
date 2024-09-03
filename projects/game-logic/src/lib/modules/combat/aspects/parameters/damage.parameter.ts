import { IModifier, IModifierExposer } from "../../../../cross-cutting/modifier/modifier.interface";
import { IParameter, IParameterDeclaration, IParameterExposer } from "../../../../cross-cutting/parameter/parameter.interface";
import { JsonPathResolver } from "../../../../infrastructure/extensions/json-path";
import { ISerializable } from "../../../../infrastructure/extensions/json-serializer";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../../infrastructure/mixin/mixin.interface";
import { IStatisticBearer } from "../../../statistics/entities/bearer/statistic-bearer.interface";
import { CombatStatisticType } from "../../combat.constants";
import { ICombatStatistic } from "../../entities/combat-statistic/combat-statistic.interface";


export interface IDamageParameter extends IParameter, IDamageParameterDeclaration {

}


export interface IDamageParameterDeclaration extends IParameterDeclaration {
  id: number;
  value: number
  isDamageParameter: true
}


export class DamageParameterFactory implements IMixinFactory<IParameter>  {

  constructor() {}

  public isApplicable(e: IParameter): boolean {
    return e.isParameter;
  };
  
  public create(e: Constructor<IMixin & ISerializable<IParameterDeclaration>>): Constructor<IMixin> {
    class DamageParameter extends e implements IParameter, ISerializable<IParameterDeclaration> {

      public id: number;
      public get value() { return this._getParameter() };
      public isParameter = true as const;
      public appliedModifiers: Map<IModifier, IModifier>;
      public isModificable = true as const;


      @NotEnumerable()
      public parameterExposer: IParameterExposer;

      private _value: number | ResolvableReference<number>;

      constructor(data: IParameterDeclaration) {
        super(data);
        this.id = data.id;
        this._value = data.value;
      }

      public toJSON(): IParameterDeclaration {
        const serializable = Object.assign({ value: this._value }, this);
        delete serializable._value
        if (super.toJSON) {

        } 
        return serializable;
      }

      private _getParameter(): number {
        let value;
        if (JsonPathResolver.isResolvableReference(this._value)) {
          if (!this.parameterExposer) {
            throw new Error("Cannot resolve jsonPath. Parameter exposer required to resolve jsonPath parameter")
          }
          value = JsonPathResolver.resolveInline(this._value, this.parameterExposer);
        } else {
          value = this._value as number;
        }

        const bearer = this.parameterExposer.getRootEntity<IModifierExposer & IStatisticBearer>();

        if (bearer.isStatisticBearer) {
          const attackPower = bearer.getEntity<ICombatStatistic>(e => e.isStatistic && e.combatStatisticType === CombatStatisticType.AttackPower);
          if (attackPower) {
            value + attackPower.value;
          }
        }

        for (let m of this.appliedModifiers.values()) {
          value = m.applyModifier(value);
        }

        return value;
      }
    
    };

    return DamageParameter;
  }
}