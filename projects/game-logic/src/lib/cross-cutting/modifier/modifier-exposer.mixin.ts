import { IEntity, IEntityDeclaration } from "../../base/entity/entity.interface";
import { IClonable } from "../../infrastructure/extensions/interfaces";
import { Constructor } from "../../infrastructure/extensions/types";
import { IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IModificable, IModifier, IModifierExposer, IModifierExposerDeclaration } from "./modifier.interface";

export class ModifierExposerFactory implements IMixinFactory<IModifierExposer>  {

  constructor() {}

  public isApplicable(e: IModifierExposer): boolean {
    return e.isModifierExposer
  };
  
  public create(e: Constructor<IEntity>): Constructor<IEntity> {
    return class ModifierExposer extends e implements IModifierExposer {

      public isModifierExposer = true as const;
      public modifiers: IModifier[];
      public entities: Array<IEntity & Partial<IModifierExposer>>;

      constructor(data: IModifierExposerDeclaration) {
        super(data);
        this.modifiers = data.modifiers as IModifier[] ?? [];
      }

      public assingModifiers<T extends IModificable & IClonable>(target: T): T {
        if (!('clone' in target)) {
          throw new Error("Cannot apply modifiers. Provided target is not Clonable.");
        }

        if (!target.isModificable) {
          throw new Error("Cannot apply modifiers. Provided target is not Modificable.")
        }
        const modifiers = this.getModifiers(target);
        for (let modifier of modifiers) {
          modifier.applyModifier(target)
        }
        return target;
      }
      
      public getModifiers(target: IModificable) {
        let modifiers = this.modifiers.filter(m => m.isApplicable(target));
        if (this.entities) { 
          for (let entitiy of this.entities) {
            if (entitiy.isModifierExposer) {
              modifiers = modifiers.concat(entitiy.getModifiers(target))
            }
          }
        }
        return modifiers;
      }

      public getAllModifiers(): IModifier[] {
        let modifiers = this.modifiers;
        if (this.entities) { 
          for (let entitiy of this.entities) {
            if (entitiy.isModifierExposer) {
              modifiers = modifiers.concat(entitiy.getAllModifiers())
            }
          }
        }
        return modifiers
      }
    
      public onInitialize() {
        super.onInitialize && super.onInitialize();
      };

      public onDestroy() { 
        super.onDestroy && super.onDestroy();
      };
    
      public toJSON(): IEntityDeclaration {
        return this;
      }
    
    };
  }
}