import { IActor, IBasicStats, IEnemy } from "../../actors/actors.interface";
import { IBoardObject, IBoardSelector } from "../../board/board.interface";
import { EffectName, DamageType } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase } from "../effects.interface";
import { IDealDamageByWeapoonDefinition } from "./deal-damage-by-weapon.interface";

export interface IDealDamage extends IEffectBase {
  effectName: EffectName.DealDamage;
  damageType: DamageType;
  damageValue: number;
}

export interface IDealDamageDefinition extends IEffectDefinitionBase  {
  effect: IDealDamage & IBoardSelector;
  effectName: EffectName.DealDamage;
  caster: IEffectCaster;
}

export interface IDealDamagePayload extends IDealDamageDefinition {
  payload: {
    caster: IActor & IEffectCaster & IBasicStats & Partial<IBoardObject>;
    actor: IEnemy & IBoardObject;
  }[];
}