
import { IActivityResource, IActivitySubjectDeclaration } from "../../lib/base/activity/activity.interface"
import { IDefeatIndicator } from "../../lib/modules/actors/entities/defeatable/defeatable.interface"
import { IFormulaDefinition } from "../../lib/modules/statistics/formula/formula.interface"
import { IMPROVE_STATISTIC_ACTIVITY, STATISTIC_RESOURCE_TYPE, StatisticType } from "../../lib/modules/statistics/statistics.constants"
import { IStatisticDeclaration } from "../../lib/modules/statistics/entities/statistic/statistic.interface"
import { START_TURN_EVENT } from "../../lib/modules/turn-based-gameplay/aspects/events/start-turn.event"
import { IMPROVE_STATS_RESOURCE } from "./progression.data"
import { STATISTIC_MODIFIER } from "../../lib/modules/statistics/aspects/modifiers/statistic.modifier"
import { PERK_UNLOCKED_CONDITION } from "../../lib/modules/perks/aspects/conditions/perk-unlocked.condition"
import { dualWieldPerk } from "./perks.data"

//
// DEFENCE
//

export const defenceStatistic: IStatisticDeclaration = {
  id: "defence",
  type: StatisticType.Static,
  value: 0,
  isStatistic: true,
  modifiers: [],
  isEntity: true,
  isMixin: true
}

export const improvableDefenceStatistic: IStatisticDeclaration & IActivitySubjectDeclaration = Object.assign({
  activities: [{ id: IMPROVE_STATISTIC_ACTIVITY, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true as const, isMixin: true as const }],
  isActivitySubject: true as const
}, defenceStatistic)

//
// HEALTH
//

export const healthStatistic: IStatisticDeclaration & IDefeatIndicator = {
  id: "health",
  type: StatisticType.Dynamic,
  baseValue: 10,
  isStatistic: true,
  isDefeatIndicator: true,
  defeatTreshold: 0,
  modifiers: [],
  isEntity: true,
  isMixin: true
}

export const improvableHealthStatistic: IStatisticDeclaration & IActivitySubjectDeclaration & IDefeatIndicator = Object.assign({
  activities: [{ id: IMPROVE_STATISTIC_ACTIVITY, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true as const, isMixin: true as const }],
  isActivitySubject: true as const
}, healthStatistic)


//
// ATTACK POWER
//

export const attackPowerStatistic: IStatisticDeclaration = {
  id: "attackPower",
  type: StatisticType.Static,
  value: 10,
  isStatistic: true,
  modifiers: [],
  isMixin: true,
  isEntity: true
}

export const improvableAttackPowerStatistic: IStatisticDeclaration & IActivitySubjectDeclaration = Object.assign({
  activities: [{ id: IMPROVE_STATISTIC_ACTIVITY, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true as const, isMixin: true as const }],
  isActivitySubject: true as const
}, attackPowerStatistic)


//
// SPELL POWER
//

export const spellPowerStatistic: IStatisticDeclaration = {
  id: "spellPower",
  type: StatisticType.Static,
  value: 0,
  isStatistic: true,
  modifiers: [],
  isEntity: true,
  isMixin: true
}

export const improvableSpellPowerStatistic: IStatisticDeclaration = Object.assign({
  activities: [{ id: IMPROVE_STATISTIC_ACTIVITY, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true as const, isMixin: true as const }],
  isActivitySubject: true as const,
}, spellPowerStatistic);

//
// MOVEMENT
//

export const movementStatistic: IStatisticDeclaration = {
  id: "movement",
  type: StatisticType.Static,
  value: 0,
  isStatistic: true,
  modifiers: [],
  isEntity: true,
  isMixin: true
}

export const improvableMovementStatistic: IStatisticDeclaration = Object.assign({
  activities: [{ id: IMPROVE_STATISTIC_ACTIVITY, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true as const, isMixin: true as const }],
  isActivitySubject: true as const,
}, movementStatistic);


//
// MAJOR ACTION
//

export const improvableMajorActionStatistic: IStatisticDeclaration & IActivityResource & IActivitySubjectDeclaration = {
  id: "majorAction",
  type: StatisticType.Dynamic,
  baseValue: 2,
  regainValue: 2,
  regainWhen: [{ delegateId: START_TURN_EVENT, payload: { controllable: "{{$.bearer}}" } }],
  activities: [{ id: IMPROVE_STATISTIC_ACTIVITY, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true as const, isMixin: true as const }],
  isResource: true,
  isStatistic: true,
  modifiers: [],
  isActivitySubject: true as const,
  isEntity: true,
  isMixin: true
}

//
// MINOR ACTION
//

export const improvableMinorActionStatistic: IStatisticDeclaration & IActivityResource & IActivitySubjectDeclaration = {
  id: "minorAction",
  type: StatisticType.Dynamic,
  baseValue: 2,
  regainValue: 2,
  regainWhen: [{ delegateId: START_TURN_EVENT, payload: { controllable: "{{$.bearer}}" } }],
  activities: [{ id: IMPROVE_STATISTIC_ACTIVITY, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true as const, isMixin: true as const }],
  isResource: true,
  isStatistic: true,
  modifiers: [],
  isActivitySubject: true as const,
  isEntity: true,
  isMixin: true
}

//
// MOVE ACTION
//


export const improvableMoveActionStatistic: IStatisticDeclaration & IActivityResource & IActivitySubjectDeclaration = {
  id: "moveAction",
  type: StatisticType.Dynamic,
  baseValue: 1,
  regainValue: 1,
  regainWhen: [{ delegateId: START_TURN_EVENT, payload: { controllable: "{{$.bearer}}" } }],
  activities: [{ id: IMPROVE_STATISTIC_ACTIVITY, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true as const, isMixin: true as const }],
  isResource: true,
  isStatistic: true,
  modifiers: [],
  isActivitySubject: true as const,
  isEntity: true,
  isMixin: true
}

//
// MISC
//


export const damageModifier: IStatisticDeclaration = {
  id: "6654E324-E46E-42D4-8C5C-85B8229070E1",
  type: StatisticType.Static,
  baseValue: 0.5,
  isStatistic: true,
  modifiers: [
    {
      delegateId: STATISTIC_MODIFIER,
      payload: { baseValue: 1 },
      conditions: [{ delegateId: PERK_UNLOCKED_CONDITION, payload: { perkId: dualWieldPerk.id } }]
    }
  ],
  isEntity: true,
  isMixin: true
}


//
// FORMULAS
//

export const dealDamageFormula: IFormulaDefinition = {
  id: "D77CD820-CCE5-4A70-A3A3-9F075D9D7A9C",
  outcomeRef: "{{$.target.health}}",
  outcomeOperator: "substract",
  formula: [
    [
      ["{{$.initiator.attackPower}}", "add", "{{$.value}}"],
      "subtract",
      "{{$.target.defence}}"
    ],
    "multiply",
    "{{$.multiplier}}"
  ]
} 