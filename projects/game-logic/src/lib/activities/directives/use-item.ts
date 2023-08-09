import { IDisposable, InteractionType, IUsable } from "../../game/interactions.interface";
import { IItem } from "../../features/items/items.interface";
import { IGameFeed } from "../../game/game.interface";
import { AdventureActivityName } from "../constants/activity-name";
import { AdventureState } from "../../game/adventure-state";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { IAction, IDealDamage, IModifyPosition, IModifyStats, ISpawnActor } from "../../features/action/actions.interface";
import { GameLayer } from "../../game/game.constants";
import { DungeonState } from "../../game/dungeon-state";
import { consumeResources, dealDamage, modifyStatictics, moveActor, MoveDeclaration, spawnActor, SpawnDeclaration } from "../../features/action/actions";
import { IBoardCoordinates, IBoardSelector } from "../../features/board/board.interface";
import { hero } from "../../../data/adventure";
import { EffectType } from "../../features/action/action.constants";
import { IEffect } from "../../features/effects/effects.interface";

interface UseItemPayload {
  item: IItem & IAction & (IUsable | IDisposable) & Partial<IEffect>
    & IBoardSelector & (IDealDamage | IModifyStats | IModifyPosition | ISpawnActor),
  target: IBoardCoordinates[] | SpawnDeclaration[] | MoveDeclaration[] 
}

export const useItem = (payload: UseItemPayload): IDispatcherDirective =>
  (state: AdventureState | DungeonState, feed: IGameFeed) => {
    
    const isDungeon = state.gameLayerName === GameLayer.Dungeon;

    if (isDungeon) {
      const reducedStats = consumeResources(payload.item, hero);
      if (!reducedStats) {
        throw new Error("");
      }  
    }

    if (!payload.item.selectorOrigin && isDungeon) {
      payload.item.selectorOrigin = state.board.getActorPositionById(state.hero.id);
    }


    if (payload.item.actionType === EffectType.DealDamage && isDungeon) {
      dealDamage(state.board, payload.item, payload.target as IBoardCoordinates[]);
    }
  
    if (payload.item.actionType === EffectType.SpawnActor && isDungeon) {
      spawnActor(state.board, payload.item, payload.target as SpawnDeclaration[]);
    }
  
    if (payload.item.actionType === EffectType.MoveActor && isDungeon) {
      moveActor(state.board, payload.item, payload.target as MoveDeclaration[]);
    }

    if (payload.item.actionType === EffectType.ModifyStats && isDungeon) {
      modifyStatictics(state.board, payload.item, payload.target as IBoardCoordinates[]);
    }
  
    if (isDungeon) {
      const objects = Object.values(state.board.objects)
        .filter()
      state.board.removeObjects(objects);
    }
    
    if (!!payload.item.durationInTurns && isDungeon) {
      state.effects.push(payload.item);
    } 

    if (payload.item.interactionType === InteractionType.Disposable) {
      payload.item.charges -= 1;
    } 

    return [{
      name: AdventureActivityName.BuyItem,
      payload: payload,
    }]
  }