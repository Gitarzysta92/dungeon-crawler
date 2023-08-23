import { IDictionary } from "../../extensions/types";
import { IEffectBase } from "../effects/effects.interface";
import { IActor, IBasicStats, ISecondaryStats } from "../actors/actors.interface";
import { IProgressable } from "./hero-progression.interface";

export interface IHero extends IActor, ISecondaryStats, IBasicStats, IProgressable {
  id: string;
  majorActions: number;
  minorActions: number;
  moveActions: number;
  abilities: IDictionary<string, IEffectBase>;
  occupiedAreaId: string;
}

