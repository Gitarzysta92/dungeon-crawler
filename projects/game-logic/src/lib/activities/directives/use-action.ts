import { hero } from "../../../data/adventure";
import { EffectType } from "../../features/action/action.constants";
import { consumeResources, dealDamage, modifyStatictics, moveActor, MoveDeclaration, spawnActor, SpawnDeclaration } from "../../features/action/actions";
import { IAction, IDealDamage, IModifyStats, IModifyPosition, ISpawnActor } from "../../features/action/actions.interface";
import { IBoardSelector, IBoardCoordinates } from "../../features/board/board.interface";
import { IEffect } from "../../features/effects/effects.interface";
import { IItem } from "../../features/items/items.interface";
import { DungeonState } from "../../game/dungeon-state";
import { IGameFeed } from "../../game/game.interface";
import { IUsable, IDisposable } from "../../game/interactions.interface";
import { IDispatcherDirective } from "../../utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { DungeonActivityName } from "../constants/activity-name";

interface UseActionPayload {
  action: IItem & IAction & (IUsable | IDisposable) & Partial<IEffect>
    & IBoardSelector & (IDealDamage | IModifyStats | IModifyPosition | ISpawnActor),
  target: IBoardCoordinates[] | SpawnDeclaration[] | MoveDeclaration[] 
}


export const useAction = (payload: UseActionPayload): IDispatcherDirective =>
  (state: DungeonState, feed: IGameFeed) => {
    
    const reducedStats = consumeResources(payload.action, hero);
    if (!reducedStats) {
      throw new Error("");
    }  

    payload.action.selectorOrigin = state.board.getActorPositionById(state.hero.id);

    if (payload.action.actionType === EffectType.DealDamage) {
      dealDamage(state.board, payload.action, payload.target as IBoardCoordinates[]);
    }
  
    if (payload.action.actionType === EffectType.SpawnActor) {
      spawnActor(state.board, payload.action, payload.target as SpawnDeclaration[]);
    }
  
    if (payload.action.actionType === EffectType.MoveActor) {
      moveActor(state.board, payload.action, payload.target as MoveDeclaration[]);
    }

    if (payload.action.actionType === EffectType.ModifyStats) {
      modifyStatictics(state.board, payload.action, payload.target as IBoardCoordinates[]);
    }
  
    if (isDungeon) {
      const objects = Object.values(state.board.objects)
        .filter()
      state.board.removeObjects(objects);
    }
    
    if (!!payload.action.durationInTurns && isDungeon) {
      state.effects.push(payload.action);
    } 
    
    return [{
      name: DungeonActivityName.UseActivity,
      payload: payload,
    }]
  }