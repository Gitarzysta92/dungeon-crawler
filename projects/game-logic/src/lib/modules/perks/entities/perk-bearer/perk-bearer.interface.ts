import { IEntity } from "../../../../base/entity/entity.interface";
import { IPerk } from "../../perk.interface";

export interface IPerkBearer extends IPerkBearerDeclaration {
  hasUnlocked(perk: IPerk, level?: number): boolean;
  unlock(perk: IPerk): boolean;
}

export interface IPerkBearerDeclaration extends IEntity {
  isPerkBearer: boolean;
  perks: IPerk[];

}