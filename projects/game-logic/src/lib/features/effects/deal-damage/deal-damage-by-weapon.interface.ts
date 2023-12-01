import { IBoardSelector } from "../../board/board.interface";
import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase, IEffectSignatureBase } from "../effects.interface";
import { IDealDamagePayload } from "./deal-damage.interface";

export interface IDealDamageByWeapoon extends IEffectBase {
  effectName: EffectName.DealDamageByWeapon;
}

export interface IDealDamageByWeapoonDefinition extends IEffectDefinitionBase {
  effect: IDealDamageByWeapoon & IBoardSelector;
  effectName: EffectName.DealDamageByWeapon;
  caster: IEffectCaster;
}

export interface IDealDamageByWeaponPayload extends IDealDamageByWeapoonDefinition{
  payload: IDealDamagePayload[];

  // payload: {
  //   caster: IActor & IEffectCaster & IBasicStats & Partial<IBoardObject>;
  //   effect: IDealDamage & IBoardSelector;
  //   actor: IEnemy & IBoardObject;
  // }[]
}

export interface IDealDamageByWeaponSignature extends IEffectSignatureBase {
  effectName: EffectName.DealDamageByWeapon;
  data: {
    weaponIds: string[];
  }
}