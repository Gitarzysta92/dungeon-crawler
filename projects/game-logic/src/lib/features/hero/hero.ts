import { IDictionary } from "../../extensions/types";
import { ActorType } from "../actors/actors.constants";
import { IEffectBase } from "../effects/effects.interface";
import { IHero } from "./hero.interface";

export class Hero implements IHero {
  id!: string;
  name!: string;

  level!: number;
  experiencePoints!: number;


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

  sourceUpperLimit!: number;
  speedUpperLimit!: number;
  sightUpperLimit!: number;
  defenceUpperLimit!: number;
  healthUpperLimit!: number;
  attackPowerUpperLimit!: number;
  spellPowerUpperLimit!: number;

  occupiedAreaId!: string;

  abilities!: IDictionary<string, IEffectBase>;

  constructor(data: IHero) {
    Object.assign(this, data);
  }


  public gainExperience(experience: number): void {
    this.experiencePoints += experience;
  }

  public regainActions(): void {
    this.majorActions = 1;
    this.minorActions = 1;
    this.moveActions = 1;
  }
  
}