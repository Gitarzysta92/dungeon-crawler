import { IDictionary } from "../../extensions/types";
import { ActorType } from "../actors/actors.constants";
import { IEffectBase } from "../effects/effects.interface";
import { IHero } from "./hero.interface";

export class Hero implements IHero {
  id!: string;
  name!: string;
  actorType!: ActorType;

  level!: number;
  experiencePoints!: number;

  majorAction!: number;
  majorActionRegain!: number;
  minorAction!: number;
  minorActionRegain!: number;
  moveAction!: number;
  moveActionRegain!: number;

  source!: number;
  sourceUpperLimit!: number;

  effects!: any[];
  groupId!: string;
  maxStack!: number;
  characterId!: string;
  maxItems!: number;

  defence!: number;
  defenceUpperLimit!: number;
  speed!: number;
  speedUpperLimit!: number;
  sight!: number;
  sightUpperLimit!: number;
  health!: number;
  healthUpperLimit!: number;
  attackPower!: number;
  attackPowerUpperLimit!: number;
  spellPower!: number;
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
    this.majorAction = this.majorAction += this.majorActionRegain;
    this.minorAction = this.minorAction += this.minorActionRegain;
    this.moveAction = this.moveAction += this.moveActionRegain;
  }
  
}