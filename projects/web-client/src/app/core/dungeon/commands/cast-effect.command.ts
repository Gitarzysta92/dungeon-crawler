
import { IEffect, IEffectCaster } from "@game-logic/lib/modules/effects/entities/effect.interface";
import { DungeonStateStore } from "../stores/dungeon-state.store";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { IEntityDeclaration } from "@game-logic/lib/base/entity/entity.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";


export interface ICastEffectCommand extends IEntityDeclaration {
  isCastEffectCommand: true;
  isActivity: true
} 

export class CastEffectCommand implements IMixinFactory<any> {

  constructor() {}
  
  validate(e: ICastEffectCommand & IEffect): boolean {
    return e.isCastEffectCommand && e.isEffect;
  }

  create(e: Constructor<IEffect>): Constructor<any> {
    class Command extends e implements ICastEffectCommand {
      public isActivity: true;
      public isCastEffectCommand: true;
      
      constructor(d: unknown) {
        super(d);
      }


      public async castEffect(caster: IEffectCaster, dungeonStateStore: DungeonStateStore): Promise<void> {
        const effect = this.clone()
        const transaction = await dungeonStateStore.initializeTransaction();
        const process = effect.initializeCastingProcess(caster);
        process.onBeforeDataGathered(async () => null)
        process.onAfterDataGathered(async () => null)
        
        await process.gatherData();
        
        // const directive = await this._castEffectActivity.perform(effect);
        // try {
        //   await transaction.dispatch(directive);
        // } catch(err) {
        //   transaction.abandonTransaction();
        //   throw err;
        // }
        // await dungeonStateStore.dispatch(directive);
      }

    }
    return Command;
  }
}