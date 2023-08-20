import { IDictionary } from "../../extensions/types";
import { ActorType } from "../actors/actors.constants";
import { IEffect } from "../effects/effects.interface";
import { IHero } from "./hero.interface";

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

  occupiedAreaId!: string;

  abilities!: IDictionary<string, IEffect>;

  constructor(data: IHero) {
    Object.assign(this, data);
  }

  

}