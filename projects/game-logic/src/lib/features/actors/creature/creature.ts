import { IEffect } from "../../effects/resolve-effect.interface";
import { ActorType } from "../actors.constants";
import { ICreature } from "./creature.interface";

export class CreatureActor implements ICreature {
  actorType: ActorType.Creature;
  id: string;
  groupId?: string;
  sourceActorId: string;
  lastingEffects: IEffect[];
  defence: number;
  defenceUpperLimit: number;
  health: number;
  healthUpperLimit: number;
  attackPower: number;
  attackPowerUpperLimit: number;
  spellPower: number;
  spellPowerUpperLimit: number;
}