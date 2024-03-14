import { BOARD_SELECTOR } from "../../lib/modules/board/aspects/selectors/board.selector";
import { STATISTIC_MODIFIER } from "../../lib/modules/statistics/aspects/modifiers/statistic.modifier";
import { IStatusDeclaration } from "../../lib/modules/statuses/statuses.interface";
import { START_TURN_EVENT } from "../../lib/modules/turn-based-gameplay/aspects/events/start-turn.event";
import { healthStatistic } from "./statistics.data";

export const weaknessStatus: IStatusDeclaration = {
  id: "C7F13ED9-75CE-43AA-9BC4-BAFFCEC15280",
  spread: [
    { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.applier}}", shape: "radius", range: "1" } }
  ],
  exposeModifiers: [
    {
      delegateId: STATISTIC_MODIFIER,
      payload: {
        statisticId: healthStatistic.id,
        value: 10,
        operator: "substract",
      }
    }
  ],
  duration: 2,
  isPerpetual: false,
  isStackable: false
};



export const protectionStatus: IStatusDeclaration = {
  id: "4ECFDE59-7FDA-4420-9304-525E3C214A05",
  spread: [
    { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.applier}}", shape: "radius", range: "1" } }
  ],
  exposeModifiers: [
    {
      delegateId: STATISTIC_MODIFIER,
      payload: {
        statisticId: healthStatistic.id,
        value: 10,
        operator: "substract",
      }
    }
  ],
  duration: 2,
  isPerpetual: false,
  isStackable: false
}


export const burningStatus: IStatusDeclaration = {
  id: "AFB22F53-59CE-408B-84C6-50C6F4781C37",
  exposeModifiers: [],
  makeActions: [
    {
      delegateId: STATISTIC_MODIFIER,
      trigger: [{ delegateId: START_TURN_EVENT, payload: { defeatable: "{{$.affected}}" } }],
      payload: {
        statisticId: healthStatistic.id,
        value: 10,
        operator: "substract",
      }
    }
  ],
  duration: 2,
  isPerpetual: false,
  isStackable: false
}