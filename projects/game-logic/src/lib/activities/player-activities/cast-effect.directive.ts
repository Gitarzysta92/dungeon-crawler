import { IBoardSelector, IBoardCoordinates, IBoardObject } from "../../features/board/board.interface";
import { IEffect, IEffectBase } from "../../features/effects/effects.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IReusable, IDisposable } from "../../features/interactions/interactions.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { hero } from "../../../data/commons.data";
import { EffectName } from "../../features/effects/effects.constants";
import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { AdventureActivityName } from "../constants/activity-name";
import { dealDamage } from "../../features/effects/deal-damage.effect";
import { MoveDeclaration, moveActors } from "../../features/effects/move-actors.effect";
import { SpawnDeclaration, spawnActor } from "../../features/effects/spawn-actors.effect";
import { IItem } from "../../features/items/items.interface";
import { calculateStats, modifyStats } from "../../features/effects/modify-statistics.effect";
import { validateTargets } from "./make-attack.directive";
import { IEnemy } from "../../features/actors/actors.interface";

interface UseEffectPayload {
  effect: IEffect & (IReusable | IDisposable) & IBoardSelector,
  targets: (IEnemy &IBoardObject)[] | SpawnDeclaration[] | MoveDeclaration[] 
}

export const castEffect = (payload: UseEffectPayload): IDispatcherDirective =>
  (state: DungeonState, feed: IGameFeed) => {
   
    const effectItemIds = state.heroInventory.getAllItems<IEffectBase & IItem>()
      .filter(i => !!i.effectName)
      .map(i => i.id);
    
    const allowedEffectIds = state.preparedSpellAndAbilityIds.concat(effectItemIds);
    if (!allowedEffectIds.some(id => payload.effect.id === id)) {
      throw new Error("Effect not possesed");
    }
    
    resolveCostAndInteraction(payload.effect, hero, true);

    if (!payload.effect.selectorOrigin) {
      payload.effect.selectorOrigin = state.board.getObjectById(state.hero.id)?.position!;
    }
    
    if (payload.effect.effectName === EffectName.DealDamage) {
      const actualTargets = validateTargets<IEnemy & IBoardObject>(state, payload.effect, payload.targets as (IEnemy &IBoardObject)[]);
      if (payload.targets.length > actualTargets.length) {
        throw new Error("Not all selected targets are available to take an attack");
      }

      const effects = state.getAllEffects();
      const heroStats = calculateStats(state.hero, effects);
      const actualTargetStats = actualTargets.map(t => calculateStats(t, effects));
      dealDamage(heroStats, payload.effect, actualTargetStats);  
    }
  
    if (payload.effect.effectName === EffectName.SpawnActor) {
      spawnActor(state.board, payload.effect, payload.targets as SpawnDeclaration[]);
    }
  
    if (payload.effect.effectName === EffectName.ModifyPosition) {
      moveActors(state.board, payload.effect, payload.targets as MoveDeclaration[]);
    }

    if (payload.effect.effectName === EffectName.ModifyStats) {
      modifyStats(payload.effect, payload.targets as (IEnemy &IBoardObject)[]);
    }

    return [{
      name: AdventureActivityName.BuyItem,
      payload: payload,
    }]
  }
