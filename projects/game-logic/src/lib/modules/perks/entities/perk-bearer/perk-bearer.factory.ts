import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { ConditionService } from "../../../../cross-cutting/condition/condition.service";
import { Constructor } from "../../../../infrastructure/extensions/types";

import { IPerk } from "../../perk.interface";
import { IPerkBearer, IPerkBearerDeclaration } from "./perk-bearer.interface";

export class PerkBearerFactory {

  constructor(
    private readonly _conditionService: ConditionService
  ) { }

  public validate(e: IEntityDeclaration & Partial<IPerkBearer>): boolean {
    return e.isPerkBearer;
  };
  
  public create(bc: Constructor<IEntity & IActivityResourceProvider>): Constructor<IPerkBearer> {
    const conditionService = this._conditionService;
    return class PerkBearer extends bc implements IPerkBearer, IActivityResourceProvider {
      public isPerkBearer = true as const;
      public perks: IPerk[];

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
        if (!levelToUnlock || (levelToUnlock && !conditionService.check(levelToUnlock.unlockConditions))) {
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