
import { IAffectable } from "../effects/commons/effects-commons.interface";
import { IEffect } from "../effects/resolve-effect.interface";
import { IInventory } from "../items/inventory.interface";
import { ActorType } from "./actors.constants";

export interface IActor {
  id: string;
  actorType: ActorType;
  groupId?: string;
  sourceActorId: string;
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