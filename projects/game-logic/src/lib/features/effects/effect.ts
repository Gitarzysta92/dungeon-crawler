import { EffectOwner, EffectType } from "./effects.constants";
import { IEffect } from "./effects.interface";

export class Effect implements IEffect {
  effectType!: EffectType;
  owner!: EffectOwner;
  durationInTurns!: number;
  deploymentTurn!: number;
  
}