import { IAffectable } from "../effects/effects.interface";
import { IInventory } from "../items/inventory.interface";
import { ActorType } from "./actors.constants";

export interface IActor {
  id: string;
  actorType: ActorType;
  groupId?: string;
}

export interface IBasicStats {
  defence: number;
  health: number;
  attackPower: number;
  spellPower: number;
  
}

export interface ISecondaryStats {
  source: number;
  speed: number;
  sight: number;
}

export interface ICharacter extends IActor {
  actorType: ActorType.Character;
  inventory: IInventory;
  assignedAreaId: string;
}

export interface ITreasure extends IActor {
  actorType: ActorType.Treasure;
  isOpened: boolean;
}

export interface IDungeonExit extends IActor {
  actorType: ActorType.DungeonExit;
  applyExitBonus: boolean;
}

export interface IEnemy extends IActor, IAffectable, IBasicStats {
  actorType: ActorType.Enemy;
}

export interface IObstacle extends IActor, IAffectable, IBasicStats {
  actorType: ActorType.Obstacle;
}