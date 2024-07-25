
import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IPerk } from "../../perk.interface";

export interface IPerkBearer extends IPerkBearerDeclaration, IActivityDoer {
  hasUnlocked(perk: IPerk, level?: number): boolean;
  unlock(perk: IPerk): boolean;
}

export interface IPerkBearerDeclaration extends IEntityDeclaration {
  isPerkBearer: boolean;
  perks: IPerk[];

}