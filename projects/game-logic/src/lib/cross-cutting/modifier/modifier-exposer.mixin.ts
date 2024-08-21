import { IEntity, IEntityDeclaration } from "../../base/entity/entity.interface";
import { Constructor } from "../../infrastructure/extensions/types";
import { IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IModifierDeclaration, IModifierExposer, IModifierExposerDeclaration } from "./modifier.interface";

export class ModifierExposerFactory implements IMixinFactory<IModifierExposer>  {

  constructor() {}

  public isApplicable(e: IModifierExposer): boolean {
    return e.isModifierExposer
  };
  
  public create(e: Constructor<IEntity>): Constructor<IEntity> {
    return class ModifierExposer extends e implements IModifierExposer {

      public isModifierExposer = true as const;
      public modifiers: IModifierDeclaration[];
      public entities?: Array<IEntity & Partial<IModifierExposer>>;

      constructor(data: IModifierExposerDeclaration) {
        super(data);
        this.modifiers = data.modifiers;
      }
      
      public getModifiers(target: string) {
        let modifiers = this.modifiers.filter(m => m.target === target);
        if (this.entities) { 
          for (let entitiy of this.entities) {
            if (entitiy.isModifierExposer) {
              modifiers = modifiers.concat(entitiy.getModifiers(target))
            }
          }
        }
        return modifiers;
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