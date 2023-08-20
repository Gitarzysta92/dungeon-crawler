import { IDictionary } from "../../extensions/types";
import { IEffect } from "../effects/effects.interface";
import { IActor, IBasicStats } from "./actors.interface";


export interface IHeroStats extends IBasicStats {
  source: number;
  speed: number;
  sight: number;
}

export interface IHero extends IActor, IHeroStats {
  id: string;
  majorActions: number;
  minorActions: number;
  moveActions: number;
  abilities: IDictionary<string, IEffect>;
  occupiedAreaId: string;
}

