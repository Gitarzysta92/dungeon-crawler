import { IEnemy } from "../../features/actors/actors.interface";
import { IBoardObject, IBoardSelector } from "../../features/board/board.interface";
import { dealDamage } from "../../features/effects/deal-damage.effect";
import { EffectName } from "../../features/effects/effects.constants";
import { IDealDamage, IDealDamageByWeapoon, IImmediateEffect  } from "../../features/effects/effects.interface";
import { calculateStats } from "../../features/effects/modify-statistics.effect";
import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { IReusable } from "../../features/interactions/interactions.interface";
import { IItem } from "../../features/items/items.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { DungeonActivityName } from "../constants/activity-name";

export const makeAttack = (payload: {
  attack: (IDealDamage & IBoardSelector | IDealDamageByWeapoon) & IReusable & IImmediateEffect,
  weaponId?: string,
  targets: (IEnemy & IBoardObject)[]
}): IDispatcherDirective =>
  (state: DungeonState, feed: IGameFeed) => {

    if (payload.weaponId && payload.attack.effectName === EffectName.DealDamageByWeapon) {
      let weapon = state.heroInventory.getItem<IItem & IDealDamage & IBoardSelector>(payload.weaponId);
      if (!weapon) {
        throw new Error("Selected weapon is not possesed by hero");
      }
    
      if (weapon.effectName !== EffectName.DealDamage) {
        throw new Error("Selected weapon does not deal damage");
      }

      if (!weapon.selectorType) {
        throw new Error("Weapon has not defined attack range");
      }

      const heroPosition = state.board.getObjectById(state.hero.id);
      if (!heroPosition) {
        throw new Error("Cannot find hero on the board");
      }

      weapon = Object.assign({ ...weapon }, {
        selectorOrigin: heroPosition.position,
        selectorDirection: heroPosition.rotation
      });

      const actualTargets = validateTargets<IEnemy & IBoardObject>(state, weapon, payload.targets);
      if (payload.targets.length > actualTargets.length) {
        throw new Error("Not all selected targets are available to take an attack");
      }

      const effects = state.getAllEffects();
      const heroStats = calculateStats(state.hero, effects);
      const actualTargetStats = actualTargets.map(t => calculateStats(t, effects));
      dealDamage(heroStats, weapon, actualTargetStats);  

    } else if (payload.attack.effectName === EffectName.DealDamage) {

      const actualTargets = validateTargets<IEnemy & IBoardObject>(state, payload.attack, payload.targets);
      if (payload.targets.length > actualTargets.length) {
        throw new Error("Not all selected targets are available to take an attack");
      }

      const effects = state.getAllEffects();
      const heroStats = calculateStats(state.hero, effects);
      const actualTargetStats = actualTargets.map(t => calculateStats(t, effects));
      dealDamage(heroStats, payload.attack, actualTargetStats);  

    } else {
      throw new Error(`Effect ${payload.attack.effectName} is not supported by makeAttack directive`)
    }

    resolveCostAndInteraction(payload.attack, state.hero, true);

    return [{
      name: DungeonActivityName.MakeAttack,
      payload: payload,
    }]
  }


export function validateTargets<T extends IBoardObject>(state: DungeonState, selector: IBoardSelector, targets: T[]) {
  const affectableActors = state.getAllActors();
  const availableTargets = state.board.getSelectedObjects(selector);

  return targets.filter(t => {
    const x = affectableActors.some(aa => aa.id === t.id);
    const y = availableTargets.some(aa => aa.id === t.id);
    return x && y;
  })
}