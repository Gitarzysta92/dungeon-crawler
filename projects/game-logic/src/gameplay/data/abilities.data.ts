import { ProcedureStepTrigger } from "../../lib/base/procedure/procedure.constants"
import { IMakeActionProcedureStepDeclaration } from "../../lib/cross-cutting/action/action.interface"
import { IGatheringDataProcedureStepDeclaration } from "../../lib/cross-cutting/gatherer/data-gatherer.interface"
import { USE_ABILITY_ACTIVITY } from "../../lib/modules/abilities/abilities.constants"
import { IAbilityDeclaration } from "../../lib/modules/abilities/entities/ability/ability.interface"
import { ACTOR_DATA_TYPE } from "../../lib/modules/actors/actors.constants"
import { ACTOR_SELECTOR } from "../../lib/modules/actors/aspects/selectors/actor.selector"
import { MODIFY_POSITION_BY_PATH_ACTION } from "../../lib/modules/board/aspects/actions/modify-position-by-path.action"
import { MODIFY_POSITION_ACTION } from "../../lib/modules/board/aspects/actions/modify-position.action"
import { BOARD_SELECTOR } from "../../lib/modules/board/aspects/selectors/board.selector"
import { FIELD_DATA_TYPE, MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER, PATH_DATA_TYPE, ROTATION_DATA_TYPE } from "../../lib/modules/board/board.constants"
import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "../../lib/modules/statistics/aspects/actions/modify-statistic-by-formula.action"
import { REGAIN_STATISTIC_ACTION } from "../../lib/modules/statistics/aspects/actions/regain-statistic.action"
import { STATISTIC_RESOURCE_TYPE } from "../../lib/modules/statistics/statistics.constants"
import { APPLY_STATUS_ACTION } from "../../lib/modules/statuses/aspects/actions/apply-status.action"
import { dealDamageFormula, healthStatistic, improvableMajorActionStatistic } from "./statistics.data"



export const move: IAbilityDeclaration = {
  id: "34FB322A-EAED-439F-865A-1BEEF206560D",
  isAbility: true,
  isEntity: true,
  parameters: {
    steps: { value: 2 },
    speed: { value: 2 }
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
          gathererParams: {
            length: "{{$.subject.parameters.steps.value}}",
            subject: "{{$.procedureSteps.actor}}"
          },
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.procedureSteps.actor}}", shape: "path", range: "{{$.subject.parameters.speed.value}}" } }
          ],
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.rotation}}"
        }  as IGatheringDataProcedureStepDeclaration,
        rotation: {
          isGatheringDataStep: true,
          dataType: ROTATION_DATA_TYPE,
          gathererParams: {
            initialRotation: "{{$.procedureSteps.path.destination.rotation}}",
            subject: "{{$.procedureSteps.actor}}"
          },
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



export const teleport: IAbilityDeclaration = {
  id: "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
  isAbility: true,
  isEntity: true,
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
    }
  ]
}


export const selfHealing: IAbilityDeclaration = {
  id: "4A75B866-3878-4D23-954E-9DC4E6663DAE",
  isAbility: true,
  isEntity: true,
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
  ]
}


export const vision: IAbilityDeclaration = {
  id: "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
  isAbility: true,
  isEntity: true,
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
}

export const weakness: IAbilityDeclaration = {
  id: "7A7B211B-92FB-4417-B1A9-853FB1564F0A",
  isAbility: true,
  isEntity: true,
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
  ]
}


export const curse: IAbilityDeclaration = {
  id: "636642BE-EA42-4482-B81C-48D8398D3BC5",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      procedureSteps: {
        actor: {
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          selectors: [{ delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "radius", range: 2 } }],
          amount: 3,
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          delegateId: APPLY_STATUS_ACTION,
          payload: {
            modifier: {
              statisticId: healthStatistic.id,
              target: "{{$.procedureSteps.actor}}",
              value: 5,
            },
            operator: "substract",
            exposer: "{{$.castingSchema.actor}}",
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
  ]
}


export const meteorShower: IAbilityDeclaration = {
  id: "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  parameters: {
    baseDamage: { value: 10, modifiers: [] }
  },
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      procedureSteps: {
        field: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: FIELD_DATA_TYPE,
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "radius", range: 2 } }
          ],
          amount: 1
        } as IGatheringDataProcedureStepDeclaration,
        actor: {
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          autogather: true,
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.castingSchema.field}}", shape: "radius", range: 2 } }
          ],
        } as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
          payload: {
            value: "{{$.abilityParameters.baseDamage}}",
            caster: "{{$.caster}}",
            target: "{{$.castingSchema.acotr}}",
            formula: dealDamageFormula
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
  ]
}


export const cleansingMove: IAbilityDeclaration = {
  id: "85745620-91E7-4BDB-BE6A-EBE7B207E4DD",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      procedureSteps: {
        // target: {
        //   isGatheringDataStep: true,
        //   dataType: ACTOR_DATA_TYPE,
        //   payload: "{{$.caster}}"
        // },
        // path: {
        //   predecessorRef: "{{$.castingSchema.target}}",
        //   isGatheringDataStep: true,
        //   dataType: "path",
        //   gathererParams: { length: "{{$.abilityParameters.steps}}" },
        //   selectors: [
        //     { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "line", range: "{{$.abilityParameters.speed}}" } }
        //   ],
        // },
        // rotation: {
        //   predecessorRef: "{{$.castingSchema.path}}",
        //   isGatheringDataStep: true,
        //   dataType: "rotation",
        // },
        // removeEffects: {
        //   predecessorRef: "{{$.castingSchema.rotation}}",
        //   stepType: CastingStepType.MakeAction,
        //   delegateId: "remove-effects",
        //   payload: { lifeTime: EffectLifetime.Lasting, target: "{{$.castingSteps.path}}" }
        // },
        // moveOverPath: {
        //   predecessorRef: "{{$.castingSchema.removeEffects}}",
        //   stepType: CastingStepType.MakeAction,
        //   delegateId: MODIFY_POSITION_BY_PATH_ACTION,
        //   payload: {
        //     path: "{{$.castingSteps.path}}",
        //     rotation: "{{$.castingSteps.rotation}}",
        //     target: "{{$.castingSteps.target}}"  
        //   }
        // }
      }
    },
  ],

}




export const domeOfProtection: IAbilityDeclaration = {
  id: "A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      procedureSteps: {
        // field: {
        //   isGatheringDataStep: true,
        //   dataType: FIELD_DATA_TYPE
        //   payload: "{{$.caster.associatedField}}"
        // },
        // makeAction: {
        //   predecessorRef: "{{$.castingSchema.field}}",
        //   stepType: CastingStepType.MakeAction,
        //   delegateId: APPLY_STATUS_ACTION,
        //   payload: {
        //     statusId: protectionStatus.id,
        //     value: 5,
        //     affectable: "{{$.castingSteps.field}}",
        //     affector: "{{$.caster}}"
        //   }
        // }
      }
    },
  ]
}



export const circleOfProtection: IAbilityDeclaration = {
  id: "9CF5DF9C-26BF-400C-9B72-D3D10E206485",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      procedureSteps: {
        // makeAction: {
        //   stepType: CastingStepType.MakeAction,
        //   delegateId: APPLY_STATUS_ACTION,
        //   payload: {
        //     statusId: protectionStatus.id,
        //     value: 5,
        //     target: "{{$.caster}}",
        //     applier: "{{$.caster}}"
        //   }
        // }
      }
    },
  ]
}




export const fear: IAbilityDeclaration = {
  id: "D6454F3A-9770-45E1-A13B-179CD9A099E7",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      procedureSteps: {
        // actor: {
        //   isGatheringDataStep: true,
        //   dataType: ACTOR_DATA_TYPE,
        //   selectors: [
        //     { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "radius", range: 1 } },
        //     { delegateId: "selector:actor", payload: { notInGroup: "{{caster.group}}", tags: ["creature"] } }
        //   ],
        //   amount: 3
        // },
        // makeAction: {
        //   predecessorRef: "{{$.castingSchema.actor}}",
        //   stepType: CastingStepType.MakeAction,
        //   delegateId: MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER,
        //   payload: {
        //     statisticId: defenceStatistic.id,
        //     target: "{{$.castingSchema.value}}",
        //     origin: "{{$.caster}}",
        //     towards: false
        //   }
        // }
      },
    },
  ],
}


export const mindControl: IAbilityDeclaration = {
  id: "A22805E4-BB88-4829-8651-D47C566F57AA",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      procedureSteps: {
        actor: {
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "radius", range: 1 } },
            { delegateId: ACTOR_SELECTOR, payload: { notInGroup: "{{$.performer.group}}", tags: ["creature"] } }
          ],
          executionsNumber: 3,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.path}}"
        } as IGatheringDataProcedureStepDeclaration,
        path: {
          isGatheringDataStep: true,
          dataType: PATH_DATA_TYPE,
          gathererParams: { length: "{{$.subject.parameters.steps}}" },
          selectors: [
            { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: 1 } }
          ],
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.rotation}}"
        } as IGatheringDataProcedureStepDeclaration,
        rotation: {
          isGatheringDataStep: true,
          dataType: ROTATION_DATA_TYPE,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.rotation}}"
        } as IGatheringDataProcedureStepDeclaration,
        moveAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_POSITION_BY_PATH_ACTION,
          payload: {
            path: "{{$.castingSchema.path}}",
            rotation: "{{$.castingSchema.rotation}}",
            target: "{{$.castingSchema.actor}}"  
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
  ],
  
}


export const burning: IAbilityDeclaration = {
  id: "0CD9349E-B8F9-4BE1-9A00-6B137AFF817A",
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      procedureSteps: {
        // actor: {
        //   stepType: CastingStepType.GatheringData,
        //   dataType: ACTOR_DATA_TYPE,
        //   requireUniqueness: true,
        //   amount: 1,
        //   selectors: [
        //     { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "radius", range: 1 } },
        //     { delegateId: "selector:actor", payload: { notInGroup: "{{caster.group}}", tags: ["creature"] } }
        //   ]
        // },
        // makeAction: {
        //   stepType: CastingStepType.MakeAction,
        //   delegateId: APPLY_STATUS_ACTION,
        //   payload: {
        //     statusId: burningStatus.id,
        //     value: 5,
        //     target: "{{$.castingSchema.actor}}",
        //     applier: "{{$.caster}}"
        //   }
        // }
      }
    },
  ],
}