import { IBasicStats, IEnemy } from "../actors/actors.interface";
import { IDealDamage } from "./deal-damage.interface";
import { DamageType } from "./effects.constants";


export function dealDamage(hero: IBasicStats, effect: IDealDamage, enemy: IEnemy): number {
  let modifier = 0;
  if (effect.damageType === DamageType.Magical) {
    modifier = hero.spellPower;
  } else if (effect.damageType === DamageType.Phisical) {
    modifier = hero.attackPower;
  }

  const damage = modifier + effect.damageValue - enemy.defence;
  return damage > 0 ? damage : 0;
}