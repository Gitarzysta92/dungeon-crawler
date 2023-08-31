import { IEnemy } from "../actors/actors.interface";
import { IBoardObject } from "../board/board.interface";
import { EffectName, DamageType } from "./effects.constants";
import { IEffectBase } from "./effects.interface";

export interface IDealDamage extends IEffectBase {
  effectName: EffectName.DealDamage;
  damageType: DamageType;
  damageValue: number;
}

export interface IDealDamagePayload {
  id: string;
  effectName: EffectName.DealDamage;
  payload: (IEnemy & IBoardObject)[]
}


export interface IDealDamageByWeapoon extends IEffectBase {
  effectName: EffectName.DealDamageByWeapon,
}

export interface IDealDamageByWeapoonPayload extends IEffectPayload {
  id: string;
  effectName: EffectName.DealDamageByWeapon;
  payload: (IEnemy & IBoardObject)[]
}