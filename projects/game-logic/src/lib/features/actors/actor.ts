import { ActorType } from "./actor.constants";

export interface IActor {
  id: string;
  name: string;
  actorType: ActorType;
  groupId?: string;
}

export interface IBasicStats {
  health: number;
  attackPower: number;
  spellPower: number;
}

export interface ICharacter extends IActor {
  actorType: ActorType.Character;
}