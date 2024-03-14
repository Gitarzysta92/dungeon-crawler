import { Entity } from "../../../../base/entity/entity";
import { IEntity } from "../../../../base/entity/entity.interface";
import { ConditionService } from "../../../../cross-cutting/condition/condition.service";
import { IInteractionResourceProvider } from "../../../../cross-cutting/interaction/interaction.interface";
import { Constructor } from "../../../../extensions/types";
import { IPerk } from "../../perk.interface";
import { IPerkBearer, IPerkBearerDeclaration } from "./perk-bearer.interface";

export class PerkBearerFactory {

  constructor(
    private readonly _conditionService: ConditionService
  ) { }

  public validate(e: IEntity & Partial<IPerkBearer>): boolean {
    return e.isPerkBearer;
  };
  
  public create(bc: typeof Entity & Constructor<IInteractionResourceProvider>): Constructor<IPerkBearer> {
    const conditionService = this._conditionService;
    return class PerkBearer extends bc implements IPerkBearer {
      public isPerkBearer = true as const;
      public perks: IPerk[];

      private readonly _conditionService: ConditionService = conditionService;

      constructor(d: IPerkBearerDeclaration) {
        super(d);
        this.perks = d.perks;
      }
      
      public unlock(perk: IPerk): boolean {
        if (!this.perks.includes(perk)) {
          return false;
        }

        if (perk.prevPerkId && !this.perks.find(p => p.id === perk.prevPerkId)) {
          return false;
        }

        const levelToUnlock = perk.levels.find(l => l.level !== perk.unlockedLevel);
        if (!levelToUnlock || (levelToUnlock && !this._conditionService.check(levelToUnlock.unlockConditions))) {
          return false;
        }

        perk.unlockedLevel = levelToUnlock.level;
        return true; 
      }

      public hasUnlocked(perk: IPerk, level?: number): boolean {
        return this.perks.some(p => p.id === perk.id && (level == null || p.unlockedLevel === level))
      }
     
    }
  };
}