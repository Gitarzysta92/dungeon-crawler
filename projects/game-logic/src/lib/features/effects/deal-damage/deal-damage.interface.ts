import { IActor, IBasicStats, ICreature } from "../../actors/actors.interface";
import { IAassignedBoardObject, IBoardSelector } from "../../board/board.interface";
import { EffectName, DamageType } from "../commons/effect.constants";
import { IEffectBase, IEffectCaster, IEffectDeclarationBase, IEffectSignatureBase } from "../commons/effect.interface";

export interface IDealDamage extends IEffectBase {
  effectName: EffectName.DealDamage;
  damageType: DamageType;
  damageValue: number;
}

export interface IDealDamageDefinition extends IEffectDeclarationBase  {
  effect: IDealDamage & IBoardSelector;
  effectName: EffectName.DealDamage;
  caster: IEffectCaster;
}

export interface IDealDamagePayload extends IDealDamageDefinition {
  payload: {
    origin: IActor & IEffectCaster & IBasicStats & Partial<IAassignedBoardObject>;
    actor: ICreature & IAassignedBoardObject;
  }[];
}

export interface IDealDamageSignature extends IEffectSignatureBase {
  effectName: EffectName.DealDamage;
  data: {
    damageType: DamageType;
    casterId: string;
    targets: Array<{
      damageDone: number;
      targetId: string;
    }>
  }
}