
import { IInteractionResource } from "../../../lib/cross-cutting/interaction/interaction.interface"
import { IDefeatIndicator } from "../../../lib/modules/actor/defeatable/defeatable.interface"
import { IMPROVE_INTERACTION_IDENTIFIER } from "../../../lib/modules/progression/interactions/improve.interaction"
import { IImprovable } from "../../../lib/modules/progression/progression.interface"
import { IStatisticModificationFormulaDefinition } from "../../../lib/modules/statistic/formula/modify-statistic-formula.interface"
import { StatisticType } from "../../../lib/modules/statistic/statistic.constants"
import { IStatistic } from "../../../lib/modules/statistic/statistic.interface"
import { IMPROVE_STATS_RESOURCE } from "./progression.data"

export const speedStatistic: IStatistic = {
  key: "speed",
  type: StatisticType.Static,
  value: 0,
  isStatistic: true
}



export const defenceStatistic: IStatistic = {
  key: "defence",
  type: StatisticType.Static,
  value: 0,
  isStatistic: true,
}

export const improvableDefenceStatistic: IStatistic & IImprovable = Object.assign({
  interaction: [{ id: IMPROVE_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE }] }],
  improvementActions: [ { actionId: "modify-statistic", settings: { operator: "add", value: 10 } } ],
  isImproveable: true as const,
}, defenceStatistic)


export const improvableMajorActionStatistic: IStatistic & IImprovable & IInteractionResource = {
  key: "majorAction",
  type: StatisticType.Dynamic,
  baseValue: 1,
  value: 1,
  interaction: [
    { id: IMPROVE_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE }] }
  ],
  improvementActions: [ { actionId: "modify-statistic", settings: { operator: "add", value: 1 } } ],
  isImproveable: true,
  isResource: true,
  isStatistic: true,
  regain: {
    value: 1,
    triggeringEvents: [{ name: "start-turn" }],
  }
}


export const healthStatistic: IStatistic & IDefeatIndicator = {
  key: "health",
  type: StatisticType.Dynamic,
  baseValue: 10,
  regain: { value: 0, triggeringEvents: []},
  isStatistic: true,
  defeatTreshold: 0
}

export const improveableHealthStatistic: IStatistic & IImprovable & IDefeatIndicator = Object.assign({
  interaction: [{ id: IMPROVE_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE }] }],
  improvementActions: [ { actionId: "modify-statistic", settings: { operator: "add", value: 10 } } ],
  isImproveable: true as const,
}, healthStatistic)


export const attackPowerStatistic: IStatistic = {
  key: "attackPower",
  type: StatisticType.Static,
  value: 10,
  isStatistic: true,
}

export const improvableAttackPowerStatistic: IStatistic & IImprovable = Object.assign({
  interaction: [{ id: IMPROVE_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE }] }],
  improvementActions: [ { actionId: "modify-statistic", settings: { operator: "add", value: 10 } } ],
  isImproveable: true as const,
}, healthStatistic)


// export type IBasicStats = {
//   defence: number;
//   health: number;
//   attackPower: number;
//   spellPower: number;
//   defenceUpperLimit: number;
//   healthUpperLimit: number;
//   attackPowerUpperLimit: number;
//   spellPowerUpperLimit: number;
//   hasBasicStats: true;
// };
// export interface ISecondaryStats {
//   source: number;
//   sourceUpperLimit: number;
//   speed: number;
//   speedUpperLimit: number;
//   sight: number;
//   sightUpperLimit: number;
// }

// export interface IUtilizationStats {
//   majorAction: number;
//   majorActionRegain: number;
//   minorAction: number;
//   minorActionRegain: number;
//   moveAction: number;
//   moveActionRegain: number;
// }


export const dealDamageFormula: IStatisticModificationFormulaDefinition = {
  outcomeRef: "{{$.target.health}}",
  outcomeOperator: "substract",
  formula: [
    ["{{$.initiator.attackPower}}", "add", "{{$.value}}"],
    "substract",
    "{{$.target.defence}}"
  ]
} 