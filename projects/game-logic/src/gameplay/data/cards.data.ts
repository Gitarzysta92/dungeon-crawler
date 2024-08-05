import { ProcedureStepTrigger } from "../../lib/base/procedure/procedure.constants"
import { IMakeActionProcedureStepDeclaration } from "../../lib/cross-cutting/action/action.interface"
import { IGatheringDataProcedureStepDeclaration } from "../../lib/cross-cutting/gatherer/data-gatherer.interface"
import { ACTOR_DATA_TYPE, SPAWN_ACTOR_ACTION_IDENTIFIER } from "../../lib/modules/actors/actors.constants"
import { ACTOR_SELECTOR } from "../../lib/modules/actors/aspects/selectors/actor.selector"
import { BOARD_SELECTOR } from "../../lib/modules/board/aspects/selectors/board.selector"
import { BOARD_SELECTOR_IDENTIFIER, FIELD_DATA_TYPE, MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER, PATH_DATA_TYPE, PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER, ROTATION_DATA_TYPE } from "../../lib/modules/board/board.constants"
import { DISCARD_ACTION } from "../../lib/modules/cards/aspects/actions/discard.action"
import { DRAW_CARDS_ACTION } from "../../lib/modules/cards/aspects/actions/draw-cards.action"
import { DISCARD_CARD_ACTIVITY, PLAY_CARD_ACTIVITY, TRASH_CARD_ACTIVITY } from "../../lib/modules/cards/cards.constants"
import { ICardDeclaration } from "../../lib/modules/cards/entities/card/card.interface"
import { ITEM_SELECTOR } from "../../lib/modules/items/aspects/selectors/item.selector"
import { ITEM_DATA_TYPE } from "../../lib/modules/items/items.constants"
import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "../../lib/modules/statistics/aspects/actions/modify-statistic-by-formula.action"
import { IModifyStatisticActionDeclaration, IModifyStatisticActionPayload, MODIFY_STATISTIC_ACTION } from "../../lib/modules/statistics/aspects/actions/modify-statistic.action"
import { STATISTIC_RESOURCE_TYPE } from "../../lib/modules/statistics/statistics.constants"
import { RAT_ACTOR_ID } from "./common-identifiers.data"
import { attackPowerStatistic, dealDamageFormula, improvableMajorActionStatistic } from "./statistics.data"


export const emptyCard: ICardDeclaration = {
  id: "FEA3D848-6D9C-4E7D-A285-D8B41989CE4C",
  isCard: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
    {
      id: DISCARD_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    },
    {
      id: TRASH_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    }
  ]
}


export const fireball: ICardDeclaration = {
  id: "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
  isCard: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  parameters: {
    range: { value: 1 },
    baseDamage: { value: 10 }
  },
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
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
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "line", range: "{{$.subject.parameters.range.value}}" } },
            { delegateId: ACTOR_SELECTOR, payload: { notInGroupId: "{{$.performer.groupId}}", isCreature: true } },
          ],
          executionsNumber: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            bearer: "{{$.procedureSteps.actor}}",
            statistic: "{{$.procedureSteps.actor.statistic.health}}",
            value: "{{$.subject.parameters.baseDamage.value}}",
            operator: 'substract'
          },
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IMakeActionProcedureStepDeclaration<IModifyStatisticActionDeclaration>,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
    {
      id: TRASH_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    },
    {
      id: DISCARD_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    },
  ]
}


export const basicAttack: ICardDeclaration = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  isEntity: true,
  isCard: true,
  parameters: { repetitions: "{{$.deck.bearer}}" },
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        item: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ITEM_DATA_TYPE,
          dataSource: "{{$.performer}}",
          autogather: true,
          selectors: [{ delegateId: ITEM_SELECTOR, payload: { inventoryBearer: "{{$.performer}}", isEquiped: true, tags: ["weapon"] } }],
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.procedure}}"
        } as IGatheringDataProcedureStepDeclaration,
        procedure: {
          procedure: "{{$.procedureSteps.item}}",
          executionsNumber: "{{$.subject.parameters.repetitions}}",
          nextStep: "{{$.procedureSteps.discardCard}}"
        },
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
    {
      id: TRASH_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    },
    {
      id: DISCARD_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    },
  ]
}



export const drawCards: ICardDeclaration = {
  id: "CA94444D-9079-4F5A-90CA-7ABC2F60E170",
  isEntity: true,
  isCard: true,
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        drawCards: {
          isMakeActionStep: true,
          delegateId: DRAW_CARDS_ACTION,
          payload: { target: "{{$.performer.deck.bearer}}", amount: 2 },
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IMakeActionProcedureStepDeclaration,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
    {
      id: TRASH_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
    {
      id: DISCARD_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    },
  ]
}


export const makeAttack: ICardDeclaration = {
  id: "575B810F-2BC5-4D60-A2BD-0C2C362A468F",
  isCard: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          requireUniqueness: true,
          autogather: true,
          selectors: [{ delegateId: ACTOR_SELECTOR, payload: { group: "{{$.performer}}" } }],
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.executeProcedure}}"
        } as IGatheringDataProcedureStepDeclaration,
        executeProcedure: {
          procedure: "{{$.procedureSteps.actor}}",
          nextStep: "{{$.procedureSteps.discardCard}}"
        },
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
    {
      id: TRASH_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    },
    {
      id: DISCARD_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    },
  ]
}



export const increaseEnemyAttackPowerCard: ICardDeclaration = {
  id: "023E2534-4B47-49E8-8D2E-DDC5E5255912",
  isCard: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          executionsNumber: 1,
          selectors: [{ delegateId: ACTOR_SELECTOR, payload: { group: "{{$.performer}}" } }],
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.executeProcedure}}"
        } as IGatheringDataProcedureStepDeclaration,
        executeProcedure: {
          delegateId: MODIFY_STATISTIC_ACTION,
          isMakeActionStep: true,
          payload: {
            statisticId: attackPowerStatistic.id,
            bearer: "{{$.procedureSteps.actor}}",
            value: 5,
            operator: 'add' 
          },
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IMakeActionProcedureStepDeclaration,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionProcedureStepDeclaration
      }
    }
  ]
}


export const moveCreatureCard: ICardDeclaration = {
  id: "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
  isCard: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          executionsNumber: 1,
          selectors: [{ delegateId: ACTOR_SELECTOR, payload: { group: "{{$.performer}}" } }],
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.path}}"
        } as IGatheringDataProcedureStepDeclaration,
        path: {
          isGatheringDataStep: true,
          dataType: PATH_DATA_TYPE,
          gathererParams: { length: 2 },
          selectors: [{ delegateId: BOARD_SELECTOR_IDENTIFIER, payload: { origin: "{{$.procedureSteps.actor}}", shape: "line", range: 1 } }],
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.rotation}}"
        } as IGatheringDataProcedureStepDeclaration,
        rotation: {
          isGatheringDataStep: true,
          dataType: ROTATION_DATA_TYPE,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER,
          payload: {
            path: "{{$.procedureSteps.path}}",
            rotation: "{{$.procedureSteps.rotation}}",
            target: "{{$.procedureSteps.actor}}"  
          },
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IMakeActionProcedureStepDeclaration,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
    {
      id: TRASH_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    }
  ]
}


export const spawnCreatureCard: ICardDeclaration = {
  id: "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
  isCard: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        field: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: FIELD_DATA_TYPE,
          executionsNumber: 2,
          requireUniqueness: true,
          selectors: [{ delegateId: BOARD_SELECTOR_IDENTIFIER, payload: { isField: true, isOccupied: false } }],
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.rotation}}"
        } as IGatheringDataProcedureStepDeclaration,
        rotation: {
          isGatheringDataStep: true,
          dataType: ROTATION_DATA_TYPE,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.createActor}}"
        } as IGatheringDataProcedureStepDeclaration,
        createActor: {
          isMakeActionStep: true,
          delegateId: SPAWN_ACTOR_ACTION_IDENTIFIER,
          payload: {
            sourceActorId: RAT_ACTOR_ID
          },
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.placeOnBoard}}"
        }as IMakeActionProcedureStepDeclaration,
        placeOnBoard: {
          isMakeActionStep: true,
          delegateId: PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER ,
          payload: {
            actorId: "{{$.procedureSteps.createActor.id}}",
            field: "{{$.procedureSteps.field}}",
            rotation: "{{$.procedureSteps.rotation}}"
          },
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IMakeActionProcedureStepDeclaration,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
    {
      id: TRASH_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: improvableMajorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionProcedureStepDeclaration,
      }
    }
  ]
}