import { IEntity } from "../../base/entity/entity.interface";
import { Constructor } from "../../infrastructure/extensions/types";
import { IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IModificable, IModificableDeclaration, IModifier, IModifierDeclaration } from "./modifier.interface";


export class ModificableFactory implements IMixinFactory<IModificable>  {

  constructor() { }
  
  public static isModificable(data: unknown): boolean {
    return (data as IModificable).isModificable; 
  }
  
  public static asModificable<T>(data: T): T & IModificable {
    if (!this.isModificable(data)) {
      throw new Error("Provided data is not a Modificable");
    } 
    return data as T & IModificable;
  }

  public isApplicable(e: IModificable): boolean {
    return e.isModificable;
  };
  
  public create(e: Constructor<IEntity>): Constructor<IEntity> {
    return class Modificable extends e implements IModificable {

      public isModificable = true as const;
      public appliedModifiers: Map<IModifier, IModifier> = new Map()

      constructor(data: IModificableDeclaration) {
        super(data);
      }

      getModifiers(target: string): IModifier[] {
        return [];
      }
    
    };
  }
}