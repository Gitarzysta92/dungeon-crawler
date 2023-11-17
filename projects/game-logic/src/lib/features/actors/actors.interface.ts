import { IEffect } from "../effects/effects-commons.interface";
import { IAffectable } from "../effects/effects.interface";
import { IInventory } from "../items/inventory.interface";
import { ActorType, Outlet } from "./actors.constants";

export interface IActor {
  id: string;
  actorType: ActorType;
  groupId?: string;
}

export interface IBasicStats {
  defence: number;
  defenceUpperLimit: number;
  health: number;
  healthUpperLimit: number;
  attackPower: number;
  attackPowerUpperLimit: number;
  spellPower: number;
  spellPowerUpperLimit: number;
  outlets: Outlet[];
}

export interface ISecondaryStats {
  source: number;
  sourceUpperLimit: number;
  speed: number;
  speedUpperLimit: number;
  sight: number;
  sightUpperLimit: number;
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

export interface IEnemy extends IActor, IAffectable<IEffect>, IBasicStats {
  actorType: ActorType.Enemy;
}

export interface IObstacle extends IActor {
  actorType: ActorType.Obstacle;
}