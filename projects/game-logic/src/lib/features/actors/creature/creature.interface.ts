import { IAffectable } from "../../effects/commons/effect.interface";
import { IEffect } from "../../effects/resolve-effect.interface";
import { IBasicStats } from "../../statistics/statistics.interface";
import { ActorType } from "../actors.constants";
import { IActor } from "../actors.interface";

export interface ICreature extends IActor, IAffectable<IEffect>, IBasicStats {
  actorType: ActorType.Creature;
}