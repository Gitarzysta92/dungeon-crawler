import { IEnemy } from "../../actors/actors.interface";
import { IBoardObject } from "../../board/board.interface";
import { EffectName, DamageType } from "../effects.constants";
import { IEffectBase, IEffectPayloadBase } from "../effects.interface";

export interface IDealDamage extends IEffectBase {
  effectName: EffectName.DealDamage;
  damageType: DamageType;
  damageValue: number;
}

export interface IDealDamagePayload extends IEffectPayloadBase {
  effectName: EffectName.DealDamage;
  payload: (IEnemy & IBoardObject)[]
}

export interface IDealDamageByWeapoon extends IEffectBase {
  effectName: EffectName.DealDamageByWeapon,
}

export interface IDealDamageByWeaponPayload extends IEffectPayloadBase {
  effectName: EffectName.DealDamageByWeapon;
  payload: (IEnemy & IBoardObject & { effectId: string })[]
}
