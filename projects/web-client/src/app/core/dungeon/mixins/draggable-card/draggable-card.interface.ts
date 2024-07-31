import { ICardOnPile } from "@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface";

export interface IDraggableCard extends ICardOnPile {
  isDraggableCard: true;
  isDragging: boolean;
  currentDropList: string | undefined;
  previousDropList: string | undefined;
  params: { targetX: number; targetY: number; };
  registerDropListChange(name: string): void
  preserveBoundingBoxData(bb: DOMRect): void;
  getParameters(elem: HTMLElement): any
}