import { IProgressable } from "./hero-progression.interface";
import { IBoardObject } from "../board/board.interface";
import { IAreaObject } from "../adventure/area.interface";
import { IAbilityPerformer } from "../abilities/abilities.inferface";
import { ActorType } from "../actors/actors.constants";
import { IBasicStats, ISecondaryStats, IUtilizationStats } from "../statistics/statistics.interface";

export type IHero =
  IBasicStats &
  ISecondaryStats &
  IUtilizationStats &
  IProgressable &
  IBoardObject &
  IAreaObject &
  IAbilityPerformer & { actorType: ActorType.Hero }