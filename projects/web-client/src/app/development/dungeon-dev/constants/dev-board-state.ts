import { IBoardSelector, IBoardSelectorOrigin } from "@game-logic/lib/modules/board/aspects/selectors/board.selector";
import { Side } from "@game-logic/lib/modules/board/entities/board-object/board-object.constants";


export const boardSelectorFormDefaultValues: Omit<Required<IBoardSelector>, 'selectorOrigin' | 'selectorOriginDeterminant'> = {
  selectorType: 'line',
  selectorRange: 1,
};

export const selectorOriginFormDefaultValues: Omit<Required<IBoardSelectorOrigin & any>, 'id'> = {
  outlets: [Side.Top],
  position: { r: 0, q: 0, s: 0 },
  rotation: 0,
  size: 1
}