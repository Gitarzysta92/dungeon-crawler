import { IActor, IBasicStats, IEnemy } from "../../actors/actors.interface";
import { IBoardObject, IBoardSelector } from "../../board/board.interface";
import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase, IEffectSignatureBase } from "../effects.interface";
import { IDealDamage } from "./deal-damage.interface";


export interface IDealDamageByWeapoonDefinition extends IEffectDefinitionBase {
  effect: IDealDamageByWeapoon & IBoardSelector;
  effectName: EffectName.DealDamageByWeapon;
  caster: IEffectCaster;
}

export interface IDealDamageByWeapoon extends IEffectBase {
  effectName: EffectName.DealDamageByWeapon;
}

export interface IDealDamageByWeaponPayload extends IDealDamageByWeapoonDefinition{
  payload: {
    caster: IActor & IEffectCaster & IBasicStats & Partial<IBoardObject>;
    effect: IDealDamage & IBoardSelector;
    actor: IEnemy & IBoardObject;
  }[]
}

export interface IDealDamageByWeapoonSignature extends IEffectSignatureBase {
  effectName: EffectName.DealDamageByWeapon;
  data: {
    weaponIds: string[];
  }
}