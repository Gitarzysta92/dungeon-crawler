import { IBoardSelector } from "../../board/board.interface";
import { EffectName } from "../commons/effects-commons.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase, IEffectSignatureBase } from "../commons/effects-commons.interface";
import { IDealDamage, IDealDamagePayload } from "./deal-damage.interface";

export interface IDealDamageByWeapoon extends IEffectBase {
  effectName: EffectName.DealDamageByWeapon;
}

export interface IDealDamageByWeapoonDefinition extends IEffectDefinitionBase {
  effect: IDealDamageByWeapoon & IBoardSelector;
  effectName: EffectName.DealDamageByWeapon;
  caster: IEffectCaster;
}

export interface IDealDamageByWeaponPayload extends IDealDamageByWeapoonDefinition{
  payload: {
    effect: IDealDamage;
  }
  nestedPayloads: IDealDamagePayload[];
}

export interface IDealDamageByWeaponSignature extends IEffectSignatureBase {
  effectName: EffectName.DealDamageByWeapon;
  data: {
    weaponIds: string[];
  }
}