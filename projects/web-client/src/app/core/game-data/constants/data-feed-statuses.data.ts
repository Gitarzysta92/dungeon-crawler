import { IDataContainer } from "../interface/data-container.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { BOARD_SELECTOR } from "@game-logic/lib/modules/board/aspects/selectors/board.selector";
import { START_TURN_EVENT } from "@game-logic/lib/modules/turn-based-gameplay/aspects/events/start-turn.event";
import { defenceStatistic } from "./data-feed-statistics.data";
import { IStatusDeclaration } from "@game-logic/lib/modules/statuses/mixins/status/status.interface";
import { MakeActionProcedureStepFactory } from "@game-logic/lib/cross-cutting/action/action-procedure-step.factory";
import { IModifyStatisticActionDeclaration, MODIFY_STATISTIC_ACTION } from "@game-logic/lib/modules/statistics/aspects/actions/modify-statistic.action";
import { ModifierType } from "@game-logic/lib/misc/value/value.constants";
import { AssetType } from "../../game-ui/constants/asset-type";
import { IStatisticModifier, STATISTIC_MODIFIER } from "@game-logic/lib/modules/statistics/aspects/modifiers/statistic-modifier.mixin";


export const weaknessStatus: IDataContainer<IStatusDeclaration, INarrativeMedium, IUiMedium> = {
  id: "C7F13ED9-75CE-43AA-9BC4-BAFFCEC15280",
  isStatus: true,
  isEntity: true,
  isModifierExposer: true,
  selectors: [
    { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.exposer}}", shape: "radius", range: "1" } }
  ],
  modifiers: [],
  procedures: [
    {
      triggers: [{ delegateId: START_TURN_EVENT, payload: { defeatable: "{{$.affected.player}}" } }],
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        makeAction: MakeActionProcedureStepFactory.validate<IModifyStatisticActionDeclaration >({
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            bearer: "${{$.affected}}",
            statistic: "${{$.affected.health}}",
            value: "{{$.subject.parameters.baseDamage.value}}",
            operator: "substract"
          }
        }),
      }
    }
  ],
  duration: 2,
  isPerpetual: false,
  isStackable: false,
  narrative: { name: "Weakness status", description: "Some text" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};



export const protectionStatus: IDataContainer<IStatusDeclaration, INarrativeMedium, IUiMedium> = {
  id: "4ECFDE59-7FDA-4420-9304-525E3C214A05",
  isStatus: true,
  isEntity: true,
  isModifierExposer: true,
  selectors: [],
  modifiers: [
    { 
      delegateId: STATISTIC_MODIFIER,
      statisticId: defenceStatistic.id,
      type: ModifierType.add,
      value: 1,
      isMixin: true,
      isModifier: true
    } as IStatisticModifier,
  ],
  duration: 2,
  isPerpetual: false,
  isStackable: false,
  narrative: { name: "Protection status", description: "Some text" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};



export const provideCard: IDataContainer<IStatusDeclaration, INarrativeMedium, IUiMedium> = {
  id: "AFB22F53-59CE-408B-84C6-50C6F4781C37",
  isStatus: true,
  isEntity: true,
  isModifierExposer: true,
  selectors: [],
  modifiers: [
    { 
      delegateId: STATISTIC_MODIFIER,
      statisticId: defenceStatistic.id,
      type: ModifierType.add,
      value: 1,
      isMixin: true,
      isModifier: true
    } as IStatisticModifier,
  ],
  isPerpetual: true,
  isStackable: false,
  narrative: { name: "Provide card", description: "Some text" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};