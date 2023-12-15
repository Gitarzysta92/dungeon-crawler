import { Outlet } from "@game-logic/lib/features/board/board.constants";
import { IBoardSelector, IBoardSelectorOrigin } from "@game-logic/lib/features/board/board.interface";

export const boardSelectorFormDefaultValues: Omit<Required<IBoardSelector>, 'selectorOrigin' | 'selectorOriginDeterminant'> = {
  selectorType: 'line',
  selectorRange: 1,
  traversableSize: 1
};

export const selectorOriginFormDefaultValues: Omit<Required<IBoardSelectorOrigin>, 'id'> = {
  outlets: [Outlet.Top],
  position: { r: 0, q: 0, s: 0 },
  rotation: 0,
  size: 1
}