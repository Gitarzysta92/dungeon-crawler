import { IEnemy } from "../actors/actors.interface";
import { IHero } from "../actors/hero.interface";
import { DamageType } from "./effects.constants";
import { IDealDamage } from "./effects.interface";


export function dealDamage(hero: IHero, effect: IDealDamage, enemies: IEnemy[]) {
  for (let enemy of enemies) {
    let modifier = 0;
    if (effect.damageType === DamageType.Magical) {
      modifier = hero.spellPower;
    } else if (effect.damageType === DamageType.Phisical) {
      modifier = hero.attackPower;
    }

    const damage = modifier + effect.damageValue - enemy.defence;
    if (damage > 0) {
      enemy.health -= damage;
    }
  }
}