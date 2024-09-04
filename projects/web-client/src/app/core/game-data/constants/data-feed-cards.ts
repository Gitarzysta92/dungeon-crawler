import { IDataContainer } from "../interface/data-container.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IMakeActionStepDeclaration } from "@game-logic/lib/cross-cutting/action/action.interface";
import { DISCARD_ACTION } from "@game-logic/lib/modules/cards/aspects/actions/discard.action";
import { PLAY_CARD_ACTIVITY, DISCARD_CARD_ACTIVITY, TRASH_CARD_ACTIVITY } from "@game-logic/lib/modules/cards/cards.constants";
import { ICardDeclaration } from "@game-logic/lib/modules/cards/entities/card/card.interface";
import { MODIFY_STATISTIC_ACTION } from "@game-logic/lib/modules/statistics/aspects/actions/modify-statistic.action";
import { attackPowerStatistic, majorActionStatistic } from "./data-feed-statistics.data";
import { ProcedureStepTrigger } from "@game-logic/lib/base/procedure/procedure.constants";
import { IGatheringDataStepDeclaration } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { ACTOR_DATA_TYPE, SPAWN_ACTOR_ACTION_IDENTIFIER } from "@game-logic/lib/modules/actors/actors.constants";
import { ACTOR_SELECTOR } from "@game-logic/lib/modules/actors/aspects/selectors/actor.selector";
import { BOARD_SELECTOR } from "@game-logic/lib/modules/board/aspects/selectors/board.selector";
import { STATISTIC_RESOURCE_TYPE } from "@game-logic/lib/modules/statistics/statistics.constants";
import { IExecuteProcedureStepDeclaration } from "@game-logic/lib/base/procedure/step/execute-procedure.interface";
import { ITEM_SELECTOR } from "@game-logic/lib/modules/items/aspects/selectors/item.selector";
import { ITEM_DATA_TYPE } from "@game-logic/lib/modules/items/items.constants";
import { DRAW_CARDS_ACTION } from "@game-logic/lib/modules/cards/aspects/actions/draw-cards.action";
import { PATH_DATA_TYPE, ROTATION_DATA_TYPE, MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER, FIELD_DATA_TYPE, BOARD_SELECTOR_IDENTIFIER, PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER } from "@game-logic/lib/modules/board/board.constants";
import { RAT_ACTOR_ID } from "./common-identifiers.data";
import { DEAL_DAMAGE_ACTION, IDealDamageActionDeclaration } from "@game-logic/lib/modules/combat/aspects/actions/deal-damage.action";
import { AssetType } from "../../game-ui/constants/asset-type";
import { damageParameter, drawAmount, rangeParameter } from "./data-feed-parameters";
import { IModificableDeclaration } from "@game-logic/lib/cross-cutting/modifier/modifier.interface";
import { IParameterExposerDeclaration } from "@game-logic/lib/cross-cutting/parameter/parameter.interface";


export const emptyCard: IDataContainer<ICardDeclaration, INarrativeMedium, IUiMedium> = {
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
        } as IMakeActionStepDeclaration
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
      }
    }
  ],
  narrative: { name: "cards.FEA3D848-6D9C-4E7D-A285-D8B41989CE4C.name", description: "cards.FEA3D848-6D9C-4E7D-A285-D8B41989CE4C.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "605E23E0-6DB9-4B09-A84B-B4738E5D9E55-avatar", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const
};


export const fireball: IDataContainer<ICardDeclaration & IModificableDeclaration & IParameterExposerDeclaration, INarrativeMedium, IUiMedium> = {
  id: "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
  isCard: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  isModificable: true,
  isParameterExposer: true,
  parameters: {
    damage: Object.assign({ value: 50 }, damageParameter),
    range: Object.assign({ value: 3 }, rangeParameter)
  },
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "line", range: "{{$.subject.parameters.range}}" } },
            { delegateId: ACTOR_SELECTOR, payload: { notInGroupId: "{{$.performer.groupId}}", isCreature: true } },
          ],
          executionsNumber: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: DEAL_DAMAGE_ACTION,
          payload: {
            dealer: "{{$.performer}}",
            receiver: "{{$.procedureSteps.actor}}",
            damage: "{{$.subject.parameters.damage}}",
          },
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IMakeActionStepDeclaration<IDealDamageActionDeclaration>,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionStepDeclaration
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
      }
    }
  ],
  narrative: { name: "cards.A1F8217E-5C5B-4512-A6CE-6C553AC587F0.name", description: "cards.A1F8217E-5C5B-4512-A6CE-6C553AC587F0.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E-avatar", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};



export const basicAttack: IDataContainer<ICardDeclaration & IModificableDeclaration & IParameterExposerDeclaration, INarrativeMedium, IUiMedium> = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  isEntity: true,
  isCard: true,
  isModificable: true,
  isParameterExposer: true,
  parameters: {
    damage: Object.assign({ value: 10 }, rangeParameter),
    range: Object.assign({ value: 1 }, rangeParameter)
  },
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
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
        } as IGatheringDataStepDeclaration,
        procedure: {
          isExecuteProcedureStep: true,
          procedure: "{{$.procedureSteps.item}}",
          executionsNumber: "{{$.subject.parameters.repetitions}}",
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IExecuteProcedureStepDeclaration,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionStepDeclaration
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
      }
    },
  ],
  narrative: { name: "cards.A3ED3076-47E7-479B-86B4-147E07DA584C.name", description: "cards.A3ED3076-47E7-479B-86B4-147E07DA584C.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "A3ED3076-47E7-479B-86B4-147E07DA584C-avatar", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};




export const drawCards: IDataContainer<ICardDeclaration & IModificableDeclaration & IParameterExposerDeclaration, INarrativeMedium, IUiMedium> = {
  id: "CA94444D-9079-4F5A-90CA-7ABC2F60E170",
  isEntity: true,
  isCard: true,
  isActivitySubject: true,
  isMixin: true,
  isModificable: true,
  isParameterExposer: true,
  parameters: {
    drawAmount: Object.assign({ value: 2 }, drawAmount)
  },
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        drawCards: {
          isMakeActionStep: true,
          delegateId: DRAW_CARDS_ACTION,
          payload: { target: "{{$.performer}}", amount: "{{$.subject.parameters.drawAmount}}" },
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IMakeActionStepDeclaration,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionStepDeclaration
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
      }
    },
  ],
  narrative: { name: "cards.CA94444D-9079-4F5A-90CA-7ABC2F60E170.name", description: "cards.CA94444D-9079-4F5A-90CA-7ABC2F60E170.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E-avatar", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};




export const makeAttackCard: IDataContainer<ICardDeclaration, INarrativeMedium, IUiMedium> = {
  id: "575B810F-2BC5-4D60-A2BD-0C2C362A468F",
  isCard: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps:{ 
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          requireUniqueness: true,
          selectors: [{ delegateId: ACTOR_SELECTOR, payload: { inGroupId: "{{$.performer.groupId}}", isCreature: true } }],
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.executeProcedure}}"
        } as IGatheringDataStepDeclaration,
        executeProcedure: {
          isExecuteProcedureStep: true,
          procedure: "{{$.procedureSteps.actor}}",
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IExecuteProcedureStepDeclaration,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionStepDeclaration
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
      }
    },
  ],
  narrative: { name: "Make attack", description: "Some text" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "A3ED3076-47E7-479B-86B4-147E07DA584C-avatar", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
}




export const increaseEnemyAttackPowerCard: IDataContainer<ICardDeclaration, INarrativeMedium, IUiMedium> = {
  id: "023E2534-4B47-49E8-8D2E-DDC5E5255912",
  isCard: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          executionsNumber: 1,
          selectors: [{ delegateId: ACTOR_SELECTOR, payload: { inGroupId: "{{$.performer.groupId}}", isCreature: true } }],
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.executeProcedure}}"
        } as IGatheringDataStepDeclaration,
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
        } as IMakeActionStepDeclaration,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionStepDeclaration
      }
    }
  ],
  narrative: { name: "Increase enemy attack power", description: "Some text" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};




export const moveCreatureCard: IDataContainer<ICardDeclaration, INarrativeMedium, IUiMedium> = {
  id: "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
  isCard: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          executionsNumber: 1,
          selectors: [{ delegateId: ACTOR_SELECTOR, payload: { inGroupId: "{{$.performer.groupId}}", isCreature: true  } }],
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.path}}"
        } as IGatheringDataStepDeclaration,
        path: {
          isGatheringDataStep: true,
          dataType: PATH_DATA_TYPE,
          selectors: [{ delegateId: BOARD_SELECTOR, payload: { origin: "{{$.procedureSteps.actor}}", shape: "path", range: 1 } }],
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.rotation}}"
        } as IGatheringDataStepDeclaration,
        rotation: {
          isGatheringDataStep: true,
          dataType: ROTATION_DATA_TYPE,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER,
          payload: {
            path: "{{$.procedureSteps.path}}",
            rotation: "{{$.procedureSteps.rotation}}",
            target: "{{$.procedureSteps.actor}}"  
          },
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IMakeActionStepDeclaration,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionStepDeclaration
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
      }
    }
  ],
  narrative: { name: "Move enemy", description: "Some text" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};




export const spawnCreatureCard: IDataContainer<ICardDeclaration, INarrativeMedium, IUiMedium> = {
  id: "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
  isCard: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
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
        } as IGatheringDataStepDeclaration,
        rotation: {
          isGatheringDataStep: true,
          dataType: ROTATION_DATA_TYPE,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.createActor}}"
        } as IGatheringDataStepDeclaration,
        createActor: {
          isMakeActionStep: true,
          delegateId: SPAWN_ACTOR_ACTION_IDENTIFIER,
          payload: {
            sourceActorId: RAT_ACTOR_ID
          },
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.placeOnBoard}}"
        }as IMakeActionStepDeclaration,
        placeOnBoard: {
          isMakeActionStep: true,
          delegateId: PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER ,
          payload: {
            actorId: "{{$.procedureSteps.createActor.id}}",
            field: "{{$.procedureSteps.field}}",
            rotation: "{{$.procedureSteps.rotation}}"
          },
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IMakeActionStepDeclaration,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionStepDeclaration
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
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
      }
    }
  ],
  narrative: { name: "Spawn enemy", description: "Some text" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};