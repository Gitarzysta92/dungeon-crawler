import { IDictionary } from "../../extensions/types";
import { IEffectBase } from "../effects/commons/effects-commons.interface";
import { IActor, IBasicStats, ISecondaryStats } from "../actors/actors.interface";
import { IProgressable } from "./hero-progression.interface";
import { Outlet } from "../actors/actors.constants";

export interface IHero extends IActor, ISecondaryStats, IBasicStats, IProgressable {
  id: string;
  majorAction: number;
  majorActionRegain: number;
  minorAction: number;
  minorActionRegain: number;
  moveAction: number;
  moveActionRegain: number;
  abilities: IDictionary<string, IEffectBase>;
  occupiedAreaId: string;
}

