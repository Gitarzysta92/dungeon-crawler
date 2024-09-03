import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { IAbilityDeclaration } from "@game-logic/lib/modules/abilities/entities/ability/ability.interface";
import { ProcedureStepTrigger } from "@game-logic/lib/base/procedure/procedure.constants";
import { MakeActionProcedureStepFactory } from "@game-logic/lib/cross-cutting/action/action-procedure-step.factory";
import { GatheringDataProcedureStepFactory } from "@game-logic/lib/cross-cutting/gatherer/gathering-data-procedure-step.factory";
import { USE_ABILITY_ACTIVITY } from "@game-logic/lib/modules/abilities/abilities.constants";
import { ACTOR_DATA_TYPE } from "@game-logic/lib/modules/actors/actors.constants";
import { BOARD_SELECTOR } from "@game-logic/lib/modules/board/aspects/selectors/board.selector";
import { FIELD_DATA_TYPE, PATH_DATA_TYPE, ROTATION_DATA_TYPE, MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER } from "@game-logic/lib/modules/board/board.constants";
import { STATISTIC_RESOURCE_TYPE } from "@game-logic/lib/modules/statistics/statistics.constants";
import { majorActionStatistic, moveActionStatistic } from "./data-feed-statistics.data";
import { ACTOR_SELECTOR } from "@game-logic/lib/modules/actors/aspects/selectors/actor.selector";
import { DECK_BEARER_SELECTOR } from "@game-logic/lib/modules/cards/aspects/selectors/deck-bearer.selector";
import { AssetType } from "../../game-ui/constants/asset-type";
import { IModificable, IModificableDeclaration } from "@game-logic/lib/cross-cutting/modifier/modifier.interface";
import { IParameterExposerDeclaration } from "@game-logic/lib/cross-cutting/parameter/parameter.interface";
import { rangeParameter } from "./data-feed-parameters";


export const moveAbility: IDataContainer<IAbilityDeclaration & IModificableDeclaration & IParameterExposerDeclaration, INarrativeMedium, IUiMedium> =  {
  id: "34FB322A-EAED-439F-865A-1BEEF206560D",
  narrative: { name: "abilities.34FB322A-EAED-439F-865A-1BEEF206560D.name", description: "abilities.34FB322A-EAED-439F-865A-1BEEF206560D.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "34FB322A-EAED-439F-865A-1BEEF206560D-avatar", ext: "png" }},
  isNarrationMedium: true,
  isUiMedium: true,
  isAbility: true,
  isEntity: true,
  isModificable: true,
  isParameterExposer: true,
  parameters: {
    range: Object.assign({ value: 2 }, rangeParameter),
  },
  isActivitySubject: true,
  isMixin: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: moveActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: GatheringDataProcedureStepFactory.validate({
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          result: "{{$.performer}}",
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.path}}"
        }),
        path: GatheringDataProcedureStepFactory.validate({
          isGatheringDataStep: true,
          dataProvider: {
            type: FIELD_DATA_TYPE,
            selectors: [{ delegateId: BOARD_SELECTOR, payload: { origin: "{{$.procedureSteps.actor}}", shape: "path", range: "{{$.subject.parameters.range}}" } }],
          },
          dataType: PATH_DATA_TYPE,
          gathererParams: {
            length: "{{$.subject.parameters.range}}",
            subject: "{{$.procedureSteps.actor}}"
          },
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.rotation}}"
        }),
        rotation: GatheringDataProcedureStepFactory.validate({
          isGatheringDataStep: true,
          dataType: ROTATION_DATA_TYPE,
          gathererParams: {
            initialRotation: "{{$.procedureSteps.path.destination.rotation}}",
            subject: "{{$.procedureSteps.actor}}"
          },
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        }),
        makeAction: MakeActionProcedureStepFactory.validate({
          isMakeActionStep: true,
          delegateId: MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER,
          payload: {
            path: "{{$.procedureSteps.path}}",
            rotation: "{{$.procedureSteps.rotation}}",
            target: "{{$.procedureSteps.actor}}"    
          }
        })
      }
    },
  ]
};


export const visionAbility: IDataContainer<IAbilityDeclaration & IModificableDeclaration, INarrativeMedium, IUiMedium> = {
  id: "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
  narrative: { name: "abilities.605E23E0-6DB9-4B09-A84B-B4738E5D9E55.name", description: "abilities.605E23E0-6DB9-4B09-A84B-B4738E5D9E55.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "605E23E0-6DB9-4B09-A84B-B4738E5D9E55-avatar", ext: "png" }},
  isNarrationMedium: true,
  isUiMedium: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  isModificable: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: GatheringDataProcedureStepFactory.validate({
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          dataProvider: {
            type: ACTOR_DATA_TYPE,
            selectors: [
              { delegateId: ACTOR_SELECTOR, payload: { notInGroup: "{{$.performer.groupId}}" } },
              { delegateId: DECK_BEARER_SELECTOR, payload: {} }
            ],
          },
          amount: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.makeAction}}"
        }),
        makeAction: MakeActionProcedureStepFactory.validate({
          isMakeActionStep: true,
          delegateId: "reaveal-dungeon-card",
          payload: {
            dungeonDeck: "{{$.procedureSteps.actor}}",
            amount: 1
          }
        })
      }
    },
  ],
};





export const stealthAbility: IDataContainer<IAbilityDeclaration & IModificableDeclaration, INarrativeMedium, IUiMedium> = {
  id: "7F0644A5-D5BD-47B4-B286-8F590B06FDA8",
  narrative: { name: "abilities.7F0644A5-D5BD-47B4-B286-8F590B06FDA8.name", description: "abilities.7F0644A5-D5BD-47B4-B286-8F590B06FDA8.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "0CD9349E-B8F9-4BE1-9A00-6B137AFF817A-avatar", ext: "png" }},
  isNarrationMedium: true,
  isUiMedium: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  isModificable: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: GatheringDataProcedureStepFactory.validate({
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          dataProvider: {
            type: ACTOR_DATA_TYPE,
            selectors: [
              { delegateId: ACTOR_SELECTOR, payload: { notInGroup: "{{$.performer.groupId}}" } },
              { delegateId: DECK_BEARER_SELECTOR, payload: {} }
            ],
          },
          amount: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.makeAction}}"
        }),
        makeAction: MakeActionProcedureStepFactory.validate({
          isMakeActionStep: true,
          delegateId: "reaveal-dungeon-card",
          payload: {
            dungeonDeck: "{{$.procedureSteps.actor}}",
            amount: 1
          }
        })
      }
    },
  ],
};



export const crushAbility: IDataContainer<IAbilityDeclaration & IModificableDeclaration, INarrativeMedium, IUiMedium> = {
  id: "6C39527A-6634-4CEE-B970-AB52BBE19DF0",
  narrative: { name: "abilities.6C39527A-6634-4CEE-B970-AB52BBE19DF0.name", description: "abilities.6C39527A-6634-4CEE-B970-AB52BBE19DF0.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "A7A7B211B-92FB-4417-B1A9-853FB1564F0A-avatar", ext: "png" }},
  isNarrationMedium: true,
  isUiMedium: true,
  isAbility: true,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  isModificable: true,
  activities: [
    {
      id: USE_ABILITY_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: GatheringDataProcedureStepFactory.validate({
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          dataProvider: {
            type: ACTOR_DATA_TYPE,
            selectors: [
              { delegateId: ACTOR_SELECTOR, payload: { notInGroup: "{{$.performer.groupId}}" } },
              { delegateId: DECK_BEARER_SELECTOR, payload: {} }
            ],
          },
          amount: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterAll,
          nextStep: "{{$.procedureSteps.makeAction}}"
        }),
        makeAction: MakeActionProcedureStepFactory.validate({
          isMakeActionStep: true,
          delegateId: "reaveal-dungeon-card",
          payload: {
            dungeonDeck: "{{$.procedureSteps.actor}}",
            amount: 1
          }
        })
      }
    },
  ],
};








// export const teleport: IDataContainer<typeof tele, INarrativeMedium, IUiMedium> = Object.assign(tele, {
//   narrative: { name: "abilities.C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E.name", description: "abilities.C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E-avatar", ext: "png" }},
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });

// export const healing: IDataContainer<typeof heal, INarrativeMedium, IUiMedium> = Object.assign(heal, {
//   narrative: { name: "abilities.4A75B866-3878-4D23-954E-9DC4E6663DAE.name", description: "abilities.4A75B866-3878-4D23-954E-9DC4E6663DAE.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "4A75B866-3878-4D23-954E-9DC4E6663DAE-avatar", ext: "png" }},
  
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });



// export const weakness: IDataContainer<typeof w, INarrativeMedium, IUiMedium> = Object.assign(w, {
//   narrative: { name: "abilities.A7A7B211B-92FB-4417-B1A9-853FB1564F0A.name", description: "abilities.A7A7B211B-92FB-4417-B1A9-853FB1564F0A.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "A7A7B211B-92FB-4417-B1A9-853FB1564F0A-avatar", ext: "png" }},
  
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });

// export const curse: IDataContainer<typeof c, INarrativeMedium, IUiMedium> = Object.assign(c, {
//   narrative: { name: "abilities.636642BE-EA42-4482-B81C-48D8398D3BC5.name", description: "abilities.636642BE-EA42-4482-B81C-48D8398D3BC5.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "636642BE-EA42-4482-B81C-48D8398D3BC5-avatar", ext: "png" }},
  
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });

// export const meteor: IDataContainer<typeof ms, INarrativeMedium, IUiMedium> = Object.assign(ms, {
//   narrative: { name: "abilities.B0D3E90C-E359-43C9-A42F-30D9B37B2E0E.name", description: "abilities.B0D3E90C-E359-43C9-A42F-30D9B37B2E0E.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E-avatar", ext: "png" }},
  
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });

// export const cleansingMove: IDataContainer<typeof cm, INarrativeMedium, IUiMedium> = Object.assign(cm, {
//   narrative: { name: "abilities.85745620-91E7-4BDB-BE6A-EBE7B207E4DD.name", description: "abilities.85745620-91E7-4BDB-BE6A-EBE7B207E4DD.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "85745620-91E7-4BDB-BE6A-EBE7B207E4DD-avatar", ext: "png" }},
  
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });

// export const domeOfProtection: IDataContainer<typeof dop, INarrativeMedium, IUiMedium> = Object.assign(dop, {
//   narrative: { name: "abilities.A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A.name", description: "abilities.A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A.description" },
  
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A-avatar", ext: "png" }},
  
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });

// export const circleOfProtection: IDataContainer<typeof dop, INarrativeMedium, IUiMedium> = Object.assign(cop, {
//   narrative: { name: "abilities.9CF5DF9C-26BF-400C-9B72-D3D10E206485.name", description: "abilities.9CF5DF9C-26BF-400C-9B72-D3D10E206485.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "9CF5DF9C-26BF-400C-9B72-D3D10E206485-avatar", ext: "png" }},
  
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });

// export const fear: IDataContainer<typeof f, INarrativeMedium, IUiMedium> = Object.assign(f, {
//   narrative: { name: "abilities.D6454F3A-9770-45E1-A13B-179CD9A099E7.name", description: "abilities.D6454F3A-9770-45E1-A13B-179CD9A099E7.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "D6454F3A-9770-45E1-A13B-179CD9A099E7-avatar", ext: "png" }},
  
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });

// export const mindControl: IDataContainer<typeof mc, INarrativeMedium, IUiMedium> = Object.assign(mc, {
//   narrative: { name: "abilities.A22805E4-BB88-4829-8651-D47C566F57AA.name", description: "abilities.A22805E4-BB88-4829-8651-D47C566F57AA.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "A22805E4-BB88-4829-8651-D47C566F57AA-avatar", ext: "png" }},
  
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });

// export const burning: IDataContainer<typeof bu, INarrativeMedium, IUiMedium> = Object.assign(bu, {
//   narrative: { name: "abilities.0CD9349E-B8F9-4BE1-9A00-6B137AFF817A.name", description: "abilities.0CD9349E-B8F9-4BE1-9A00-6B137AFF817A.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "0CD9349E-B8F9-4BE1-9A00-6B137AFF817A-avatar", ext: "png" }},
  
//   isNarrationMedium: true as const,
//   isUiMedium: true as const
// });