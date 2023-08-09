import { IActor, IBasicStats } from "./actor";
import { ActorType } from "./actor.constants";



export interface IHeroStats extends IBasicStats {
  defence: number;
  source: number;
  speed: number;
  sight: number;
}


export interface IHero extends IActor, IHeroStats {
  id: string;
  level: number;
  majorActions: number;
  minorActions: number;
  moveActions: number;
}


export class Hero implements IHero {
  id!: string;
  name!: string;
  level!: number;
  majorActions!: number;
  minorActions!: number;
  moveActions!: number;
  effects!: any[];
  groupId!: string;
  maxStack!: number;
  characterId!: string;
  maxItems!: number;

  defence!: number;
  source!: number;
  speed!: number;
  sight!: number;
  health!: number;
  attackPower!: number;
  spellPower!: number;
  actorType!: ActorType;

  constructor(data: IHero) {
    Object.assign(this, data);
  }

}