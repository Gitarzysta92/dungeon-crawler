import { IEnemy } from "../../features/actors/actors.interface";
import { IBoardObject, IBoardSelector } from "../../features/board/board.interface";
import { dealDamage } from "../../features/effects/deal-damage.effect";
import { IDealDamage, IDealDamageByWeapoon } from "../../features/effects/deal-damage.interface";
import { EffectName } from "../../features/effects/effects.constants";
import { IImmediateEffect  } from "../../features/effects/effects.interface";
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

      const actualTargets = state.board.getSelectedObjects<IEnemy & IBoardObject>(weapon, payload.targets);
      if (payload.targets.length > actualTargets.length) {
        throw new Error("Not all selected targets are available to take an attack");
      }

      const effects = state.getAllEffects();
      const heroStats = calculateStats(state.hero, effects);
      for (let actualTarget of actualTargets) {
        const damage = dealDamage(heroStats, weapon, calculateStats(actualTarget, effects));
        actualTarget.health -= damage;
      }

    } else if (payload.attack.effectName === EffectName.DealDamage) {

      const actualTargets = state.board.getSelectedObjects<IEnemy & IBoardObject>(payload.attack, payload.targets);
      if (payload.targets.length > actualTargets.length) {
        throw new Error("Not all selected targets are available to take an attack");
      }

      const effects = state.getAllEffects();
      const heroStats = calculateStats(state.hero, effects);
      for (let actualTarget of actualTargets) {
        const damage = dealDamage(heroStats, payload.attack, calculateStats(actualTarget, effects));
        actualTarget.health -= damage;
      }

    } else {
      throw new Error(`Effect ${payload.attack.effectName} is not supported by makeAttack directive`)
    }

    resolveCostAndInteraction(payload.attack, state.hero, true);

    return [{
      name: DungeonActivityName.MakeAttack,
      payload: payload,
    }]
  }