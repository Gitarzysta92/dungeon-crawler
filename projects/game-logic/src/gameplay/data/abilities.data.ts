import { ProcedureStepTrigger } from "../../lib/base/procedure/procedure.constants"
import { IPerformProcedureProcedureStepDeclaration } from "../../lib/base/procedure/procedure.interface"
import { IMakeActionProcedureStepDeclaration } from "../../lib/cross-cutting/action/action.interface"
import { IGatheringDataProcedureStepDeclaration } from "../../lib/cross-cutting/gatherer/data-gatherer.interface"
import { AutoGatherMode } from "../../lib/cross-cutting/gatherer/data-gathering.constants"
import { USE_ABILITY_ACTIVITY } from "../../lib/modules/abilities/abilities.constants"
import { IAbilityDeclaration } from "../../lib/modules/abilities/entities/ability/ability.interface"
import { ACTOR_DATA_TYPE } from "../../lib/modules/actors/actors.constants"
import { MODIFY_POSITION_BY_PATH_ACTION } from "../../lib/modules/board/aspects/actions/modify-position-by-path.action"
import { MODIFY_POSITION_ACTION } from "../../lib/modules/board/aspects/actions/modify-position.action"
import { BOARD_SELECTOR } from "../../lib/modules/board/aspects/selectors/board.selector"
import { FIELD_DATA_TYPE, MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER, MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER, PATH_DATA_TYPE, ROTATION_DATA_TYPE } from "../../lib/modules/board/board.constants"
import { CAST_EFFECT_ACTIVITY } from "../../lib/modules/effects/effects.constantst"
import { CastingStepType, EffectCastTime, EffectLifetime } from "../../lib/modules/effects/entities/effect.constants"
import { IEffectDeclaration } from "../../lib/modules/effects/entities/effect.interface"
import { ITEM_SELECTOR } from "../../lib/modules/items/aspects/selectors/item.selector"
import { ITEM_DATA_TYPE } from "../../lib/modules/items/items.constants"
import { PERK_UNLOCKED_CONDITION } from "../../lib/modules/perks/aspects/conditions/perk-unlocked.condition"
import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "../../lib/modules/statistics/aspects/actions/modify-statistic-by-formula.action"
import { REGAIN_STATISTIC_ACTION } from "../../lib/modules/statistics/aspects/actions/regain-statistic.action"
import { STATISTIC_MODIFIER as ABILITY_MODIFIER } from "../../lib/modules/statistics/aspects/modifiers/statistic.modifier"
import { STATISTIC_RESOURCE_TYPE } from "../../lib/modules/statistics/statistics.constants"
import { APPLY_STATUS_ACTION } from "../../lib/modules/statuses/aspects/actions/apply-status.action"
import { additionalAtackPerk } from "./perks.data"
import { dealDamageFormula, defenceStatistic, healthStatistic, improvableMajorActionStatistic } from "./statistics.data"
import { burningStatus, protectionStatus } from "./statuses.data"



export const basicAttack: IAbilityDeclaration = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  isEntity: true,
  isAbility: true,
  abilityParameters: { repetitions: { value: 1, modifiers: [] }},
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        item: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ITEM_DATA_TYPE,
          autogather: { mode: AutoGatherMode.AllSelected },
          selectors: [
            { delegateId: ITEM_SELECTOR, payload: { inventoryBearer: "{{$.performer}}", isEquiped: true, tags: ["weapon"] } },
          ],
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.procedure}}"
        } as IGatheringDataProcedureStepDeclaration,
        procedure: {
          isExecuteProcedureStep: true,
          procedureRef: "{{$.procedureSteps.item}}",
          executionsNumber: "{{$.subject.abilityParameters.repetitions.value}}",
        } as IPerformProcedureProcedureStepDeclaration
      }
    }
  ],
  modifiers: [
    {
      delegateId: ABILITY_MODIFIER,
      payload: { baseValue: 0 },
      conditions: [{ delegateId: PERK_UNLOCKED_CONDITION, payload: { perkId: additionalAtackPerk.id } }]
    }
  ]
}



export const move: IAbilityDeclaration = {
  id: "34FB322A-EAED-439F-865A-1BEEF206560D",
  isAbility: true,
  isEntity: true,
  abilityParameters: {
    steps: { value: 1, modifiers: [] },
    speed: { value: 1, modifiers: [] }
  },
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          payload: "{{$.performer}}",
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.path}}"
        } as IGatheringDataProcedureStepDeclaration,
        path: {
          isGatheringDataStep: true,
          dataType: PATH_DATA_TYPE,
          gathererParams: { length: "{{$.subject.abilityParameters.steps}}" },
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.procedureSteps.actor}}", shape: "line", range: "{{$.subject.abilityParameters.speed}}" } }
          ],
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.rotation}}"
        }  as IGatheringDataProcedureStepDeclaration,
        rotation: {
          isGatheringDataStep: true,
          dataType: ROTATION_DATA_TYPE,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        }  as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER,
          payload: {
            path: "{{$.procedureSteps.path}}",
            rotation: "{{$.procedureSteps.rotation}}",
            target: "{{$.procedureSteps.actor}}"    
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
  ]
}


export const fireball: IAbilityDeclaration = {
  id: "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: CAST_EFFECT_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "line", range: "{{$.abilityParameters.range}}" } }
          ],
          amount: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER,
          payload: {
            value: "{{$.subject.abilityParameters.baseDamage}}",
            caster: "{{$.performer}}",
            target: "{{$.procedureSteps.actor}}",
            formula: dealDamageFormula
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
  ],
  abilityParameters: {
    range: { value: 1, modifiers: [] },
    baseDamage: { value: 10, modifiers: [] }
  }
}


export const teleport: IAbilityDeclaration = {
  id: "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: CAST_EFFECT_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          payload: "{{$.performer}}",
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataProcedureStepDeclaration,
        field: {
          isGatheringDataStep: true,
          dataType: FIELD_DATA_TYPE,
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.procedureSteps.actor}}", shape: "line", range: 5 } }
          ],
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.rotation}}"
        } as IGatheringDataProcedureStepDeclaration,
        rotation: {
          isGatheringDataStep: true,
          dataType: ROTATION_DATA_TYPE,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        }  as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_POSITION_ACTION,
          payload: {
            field: "{{$.procedureSteps.field}}",
            rotation: "{{$.procedureSteps.rotation}}",
            target: "{{$.procedureSteps.actor}}"  
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
  ],
  abilityParameters: {},
}


export const selfHealing: IAbilityDeclaration = {
  id: "4A75B866-3878-4D23-954E-9DC4E6663DAE",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: CAST_EFFECT_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        makeAction: {
          isMakeActionStep: true,
          isInitialStep: true,
          delegateId: REGAIN_STATISTIC_ACTION,
          payload: {
            statisticId: healthStatistic.id,
            target: "{{$.performer}}",
            value: 10,
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
  ],
  abilityParameters: {}
}


export const vision: IAbilityDeclaration = {
  id: "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: CAST_EFFECT_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          selectors: [
            { delegateId: "selector:cards-deck", payload: { isCardsDeck: true } }
          ],
          amount: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: "reaveal-dungeon-card",
          payload: {
            dungeonDeck: "{{$.castingSchema.actor}}",
            amount: 1
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
  ],
  abilityParameters: {},
}

export const weakness: IAbilityDeclaration = {
  id: "7A7B211B-92FB-4417-B1A9-853FB1564F0A",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: CAST_EFFECT_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          selectors: [{ delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "line", range: 2 } }],
          amount: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: APPLY_STATUS_ACTION,
          statusId: "5E3CE9F9-788E-4D52-9463-99412DE43456",
          exposer: "{{$.performer}}",
          payload: {
            value: 10,
            duration: 2,
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    },
  ],
  abilityParameters: {},
}


export const curse: IAbilityDeclaration & IEffectDeclaration = {
  id: "636642BE-EA42-4482-B81C-48D8398D3BC5",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Lasting,
  duration: 2,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    { id: CAST_EFFECT_ACTIVITY, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true, isMixin: true },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      selectors: [
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "radius", range: 2 } }
      ],
      amount: 3
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      exposer: "{{$.castingSchema.actor}}",
      delegateId: "statistic-modifier",
      payload: {
        statisticId: healthStatistic.id,
        target: "{{$.castingSchema.actor}}",
        value: 5,
        operator: "substract"
      }
    }
  }
}


export const meteorShower: IAbilityDeclaration & IEffectDeclaration = {
  id: "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    { id: CAST_EFFECT_ACTIVITY, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true, isMixin: true },
  ],
  abilityParameters: {
    baseDamage: { value: 10, modifiers: [] }
  },
  castingSchema: {
    field: {
      stepType: CastingStepType.GatheringData,
      dataType: "field",
      selectors: [
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "radius", range: 2 } }
      ],
      amount: 1
    },
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      autogather: { mode: AutoGatherMode.AllSelected },
      selectors: [
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.castingSchema.field}}", shape: "radius", range: 2 } }
      ],
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
      payload: {
        value: "{{$.abilityParameters.baseDamage}}",
        caster: "{{$.caster}}",
        target: "{{$.castingSchema.acotr}}",
        formula: dealDamageFormula
      }
    }
  }
}


export const cleansingMove: IAbilityDeclaration & IEffectDeclaration = {
  id: "85745620-91E7-4BDB-BE6A-EBE7B207E4DD",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    { id: CAST_EFFECT_ACTIVITY, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true, isMixin: true },
  ],
  abilityParameters: {},
  castingSchema: {
    target: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      payload: "{{$.caster}}"
    },
    path: {
      predecessorRef: "{{$.castingSchema.target}}",
      stepType: CastingStepType.GatheringData,
      dataType: "path",
      gathererParams: { length: "{{$.abilityParameters.steps}}" },
      selectors: [
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "line", range: "{{$.abilityParameters.speed}}" } }
      ],
    },
    rotation: {
      predecessorRef: "{{$.castingSchema.path}}",
      stepType: CastingStepType.GatheringData,
      dataType: "rotation",
    },
    removeEffects: {
      predecessorRef: "{{$.castingSchema.rotation}}",
      stepType: CastingStepType.MakeAction,
      delegateId: "remove-effects",
      payload: { lifeTime: EffectLifetime.Lasting, target: "{{$.castingSteps.path}}" }
    },
    moveOverPath: {
      predecessorRef: "{{$.castingSchema.removeEffects}}",
      stepType: CastingStepType.MakeAction,
      delegateId: MODIFY_POSITION_BY_PATH_ACTION,
      payload: {
        path: "{{$.castingSteps.path}}",
        rotation: "{{$.castingSteps.rotation}}",
        target: "{{$.castingSteps.target}}"  
      }
    }
  }
}




export const domeOfProtection: IAbilityDeclaration & IEffectDeclaration = {
  id: "A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Lasting,
  duration: 2,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    { id: CAST_EFFECT_ACTIVITY, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true, isMixin: true },
  ],
  abilityParameters: {},
  castingSchema: {
    field: {
      stepType: CastingStepType.GatheringData,
      dataType: "field",
      payload: "{{$.caster.associatedField}}"
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.field}}",
      stepType: CastingStepType.MakeAction,
      delegateId: APPLY_STATUS_ACTION,
      payload: {
        statusId: protectionStatus.id,
        value: 5,
        affectable: "{{$.castingSteps.field}}",
        affector: "{{$.caster}}"
      }
    }
  }
}



export const circleOfProtection: IAbilityDeclaration & IEffectDeclaration = {
  id: "9CF5DF9C-26BF-400C-9B72-D3D10E206485",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    { id: CAST_EFFECT_ACTIVITY, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true, isMixin: true },
  ],
  abilityParameters: {},
  castingSchema: {
    makeAction: {
      stepType: CastingStepType.MakeAction,
      delegateId: APPLY_STATUS_ACTION,
      payload: {
        statusId: protectionStatus.id,
        value: 5,
        target: "{{$.caster}}",
        applier: "{{$.caster}}"
      }
    }
  }
}




export const fear: IAbilityDeclaration & IEffectDeclaration = {
  id: "D6454F3A-9770-45E1-A13B-179CD9A099E7",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    { id: CAST_EFFECT_ACTIVITY, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true, isMixin: true },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      selectors: [
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "radius", range: 1 } },
        { delegateId: "selector:actor", payload: { notInGroup: "{{caster.group}}", tags: ["creature"] } }
      ],
      amount: 3
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER,
      payload: {
        statisticId: defenceStatistic.id,
        target: "{{$.castingSchema.value}}",
        origin: "{{$.caster}}",
        towards: false
      }
    }
  },
}


export const mindControl: IAbilityDeclaration & IEffectDeclaration = {
  id: "A22805E4-BB88-4829-8651-D47C566F57AA",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    { id: CAST_EFFECT_ACTIVITY, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true, isMixin: true },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      selectors: [
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "radius", range: 1 } },
        { delegateId: "selector:actor", payload: { notInGroup: "{{caster.group}}", tags: ["creature"] } }
      ],
      amount: 3
    },
    path: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.GatheringData,
      dataType: "path",
      gathererParams: { length: "{{$.abilityParameters.steps}}" },
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: 1 } }
      ],
    },
    rotation: {
      predecessorRef: "{{$.castingSchema.path}}",
      stepType: CastingStepType.GatheringData,
      dataType: "rotation",
    },
    moveAction: {
      predecessorRef: "{{$.castingSchema.rotation}}",
      stepType: CastingStepType.MakeAction,
      delegateId: MODIFY_POSITION_BY_PATH_ACTION,
      payload: {
        path: "{{$.castingSchema.path}}",
        rotation: "{{$.castingSchema.rotation}}",
        target: "{{$.castingSchema.actor}}"  
      }
    }
  }
}


export const burning: IAbilityDeclaration & IEffectDeclaration = {
  id: "0CD9349E-B8F9-4BE1-9A00-6B137AFF817A",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    { id: CAST_EFFECT_ACTIVITY, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true, isMixin: true },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      requireUniqueness: true,
      amount: 1,
      selectors: [
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "radius", range: 1 } },
        { delegateId: "selector:actor", payload: { notInGroup: "{{caster.group}}", tags: ["creature"] } }
      ]
    },
    makeAction: {
      stepType: CastingStepType.MakeAction,
      delegateId: APPLY_STATUS_ACTION,
      payload: {
        statusId: burningStatus.id,
        value: 5,
        target: "{{$.castingSchema.actor}}",
        applier: "{{$.caster}}"
      }
    }
  }
}