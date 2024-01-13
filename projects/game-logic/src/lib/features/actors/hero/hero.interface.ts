import { IAbilityPerformer } from "../../abilities/abilities.inferface";
import { IAreaObject } from "../../adventure/area.interface";
import { IBoardObject } from "../../board/board.interface";
import { IBasicStats, ISecondaryStats, IUtilizationStats } from "../../statistics/statistics.interface";
import { ActorType } from "../actors.constants";
import { IProgressable } from "./hero-progression.interface";

export type IHero =
  IBasicStats &
  ISecondaryStats &
  IUtilizationStats &
  IProgressable &
  IBoardObject &
  IAreaObject &
  IAbilityPerformer & { actorType: ActorType.Hero }