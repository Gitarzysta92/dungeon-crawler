import { IBoardSelector, IBoardCoordinates } from "../../features/board/board.interface";
import { IDealDamage, IModifyPosition, IModifyStats, ISpawnActor } from "../../features/effects/effects.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IReusable, IDisposable } from "../../features/interactions/interactions.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { hero } from "../../../data/commons.data";
import { EffectName } from "../../features/effects/effects.constants";
import { resolveCostAndInteraction } from "../../features/interactions/interactions";
import { AdventureState } from "../../game/adventure-state";
import { GameLayer } from "../../game/game.constants";
import { AdventureActivityName } from "../constants/activity-name";
import { dealDamage } from "../../features/effects/deal-damage.effect";
import { MoveDeclaration, moveActors } from "../../features/effects/move-actors.effect";
import { SpawnDeclaration, spawnActor } from "../../features/effects/spawn-actors.effect";

interface UseEffectPayload {
  effect: (IDealDamage | IModifyStats<any> | IModifyPosition | ISpawnActor) & (IReusable | IDisposable) & IBoardSelector,
  target: IBoardCoordinates[] | SpawnDeclaration[] | MoveDeclaration[] 
}

export const useEffect = (payload: UseEffectPayload): IDispatcherDirective =>
  (state: AdventureState | DungeonState, feed: IGameFeed) => {
    
    const isDungeon = state.gameLayer === GameLayer.Dungeon;
    resolveCostAndInteraction(payload.effect, hero, isDungeon);

    if (!payload.effect.selectorOrigin && isDungeon) {
      payload.effect.selectorOrigin = state.board.getObjectById(state.hero.id)?.position!;
    }

    if (payload.effect.effectName === EffectName.DealDamage && isDungeon) {
      dealDamage(state.board, payload.effect, payload.target as IBoardCoordinates[]);
    }
  
    if (payload.effect.effectName === EffectName.SpawnActor && isDungeon) {
      spawnActor(state.board, payload.effect, payload.target as SpawnDeclaration[]);
    }
  
    if (payload.effect.effectName === EffectName.ModifyPosition && isDungeon) {
      moveActors(state.board, payload.effect, payload.target as MoveDeclaration[]);
    }

    if (payload.effect.effectName === EffectName.ModifyStats && isDungeon) {
      modifyStatictics(state.board, payload.effect, payload.target as IBoardCoordinates[]);
    }

    return [{
      name: AdventureActivityName.BuyItem,
      payload: payload,
    }]
  }