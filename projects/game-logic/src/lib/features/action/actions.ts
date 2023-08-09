import { IDisposable, IUsable } from "../../game/interactions.interface";
import { IActor, IBasicStats } from "../actors/actor";
import { IHero } from "../actors/hero";
import { Board } from "../board/board";
import { IBoardCoordinates, IBoardObject, IBoardSelector } from "../board/board.interface";
import { IModifyPosition, ISpawnActor, IModifyStats, IDealDamage } from "../effects/effects.interface";
import { IUtilizationCost } from "./actions.interface";

export interface MoveDeclaration {
  coords: IBoardCoordinates,
  actorId: string
}

export function moveActor(board: Board, action: IModifyPosition & (IDisposable | IUsable) & IBoardSelector, declarations: MoveDeclaration[]) {
  const actors = (board.getSelectedObjects(action) as unknown as Array<IActor & IBasicStats & IBoardObject>)
    .filter(a => a.actorType === action.targetType && !!(a as unknown as IBasicStats));

  if (!declarations.every(d => actors.some(a => a.position === d.coords))) {
    throw new Error('')
  }

  declarations.forEach(d => {
    board.moveObject(d.actorId, d.coords);
  });
}


export interface SpawnDeclaration {
  coords: IBoardCoordinates,
  actorId: string
}

export function spawnActor(board: Board, action: ISpawnActor & IBoardSelector, declarations: SpawnDeclaration[]) {
  const fields = board.getSelectedFields(action);
  
  if (fields.length <= 0) {
    throw new Error('There are no actors for given board selector')
  }

  if (!declarations.every(f => fields.some(d => d.position === f.coords))) {
    throw new Error('')
  }

  declarations.forEach(d => {
    board.createObject(d.actorId, d.coords);
  });
}


export function modifyStatictics(board: Board, action: IModifyStats<IBasicStats> & (IDisposable | IUsable) & IBoardSelector, coords?: IBoardCoordinates[]) {
  const actors = (board.getSelectedObjects(action, coords) as unknown as Array<IActor & IBasicStats & IBoardObject>)
    .filter(a => a.actorType === action.targetType && !!(a as unknown as IBasicStats));
  
  if (actors.length <= 0) {
    throw new Error('There are no actors for given board selector')
  }

  actors.forEach(a => {
    a.health -= (action as unknown as IDealDamage).damageValue;
  });  
}


export function dealDamage(board: Board, action: IDealDamage & (IDisposable | IUsable) & IBoardSelector, coords?: IBoardCoordinates[]) {
  const actors = (board.getSelectedObjects(action, coords) as unknown as Array<IActor & IBasicStats & IBoardObject>)
    .filter(a => a.actorType === action.targetType && !!(a as unknown as IBasicStats).health);
  
  if (actors.length <= 0) {
    throw new Error('There are no actors for given board selector')
  }

  actors.forEach(a => {
    a.health -= (action as unknown as IDealDamage).damageValue;
  });
}



export function consumeResources(utilizationCosts: IUtilizationCost[], hero: IHero): IHero | null {
  const heroCopy = Object.assign({}, hero);
  const costPaid = utilizationCosts.every(auc => {
    if (auc.costType === "source") {
      heroCopy.source -= auc.costValue;
      if (heroCopy.source < 0) {
        return false;
      }
    }
    if (auc.costType === "majorAction") {
      heroCopy.majorActions -= auc.costValue;
      if (heroCopy.source < 0) {
        return false;
      }
    }
    if (auc.costType === "minorAction") {
      heroCopy.majorActions -= auc.costValue;
      if (heroCopy.source < 0) {
        return false;
      }
    }
    return true;
  });

  return costPaid ? heroCopy : null;
}