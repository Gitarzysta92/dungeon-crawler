import { IEntity } from "../../base/entity/entity.interface";
import { Constructor } from "../../infrastructure/extensions/types";
import { IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IParameterExposer, IParameter, IParameterExposerDeclaration } from "./parameter.interface";

export class ParameterExposerFactory implements IMixinFactory<IParameterExposer>  {

  constructor() {}

  public isApplicable(e: IParameterExposer): boolean {
    return e.isParameterExposer;
  };
  
  public create(e: Constructor<IEntity>): Constructor<IEntity> {
    return class ParameterExposer extends e implements IParameterExposer {

      public isParameterExposer = true as const;
      public parameters: { [key: string]: IParameter; };

      constructor(data: IParameterExposerDeclaration) {
        super(data);
        this.parameters = data.parameters as unknown as { [key: string]: IParameter; };
      }

      public onInitialize(): void {
        for (let parameter of Object.values(this.parameters)) {
          Object.defineProperty(parameter, 'parameterExposer', { value: this, enumerable: false })
        }
        if (super.onInitialize) {
          super.onInitialize();
        }
      }
      
      public getParameters(): IParameter[] {
        return Object.values(this.parameters)
      }
    
    };
  }
}