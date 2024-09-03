import { JsonPathResolver } from "../../infrastructure/extensions/json-path";
import { ISerializable } from "../../infrastructure/extensions/json-serializer";
import { NotEnumerable } from "../../infrastructure/extensions/object-traverser";
import { Constructor, ResolvableReference } from "../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IModifier } from "../modifier/modifier.interface";
import { IParameter, IParameterDeclaration, IParameterExposer } from "./parameter.interface";

export class ParameterFactory implements IMixinFactory<IParameter>  {

  constructor() {}

  public isApplicable(e: IParameter): boolean {
    return e.isParameter;
  };
  
  public create(e: Constructor<IMixin & ISerializable<IParameterDeclaration>>): Constructor<IMixin> {
    class Parameter extends e implements IParameter, ISerializable<IParameterDeclaration> {

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

      public setExposer(e: IParameterExposer): void {
        Object.defineProperty(this, 'parameterExposer', { value: e, enumerable: false })
      }

      public toJSON(): IParameterDeclaration {
        const serializable = Object.assign({ value: this._value }, this);
        delete serializable._value
        if (super.toJSON) {

        } 
        return serializable;
      }

      private _getParameter(): number {
        if (JsonPathResolver.isResolvableReference(this._value)) {
          if (!this.parameterExposer) {
            throw new Error("Cannot resolve jsonPath. Parameter exposer required to resolve jsonPath parameter")
          }
          return JsonPathResolver.resolveInline(this._value, this.parameterExposer);
        } else {
          return this._value as number;
        }
      }
    
    };

    return Parameter;
  }
}