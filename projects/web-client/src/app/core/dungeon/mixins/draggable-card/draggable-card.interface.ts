import { ElementRef } from "@angular/core";
import { ICardOnPile } from "@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface";

export interface IDraggableCard extends ICardOnPile {
  isDraggableCard: true;
  isDropped: boolean;
  isDragging: boolean;
  isPlaying: boolean;
  containerRef: WeakRef<ICardContainer>
  getContainerBoundingBox(): DOMRect
}


export interface ICardContainer {
  elementRef: ElementRef;
  toggleActivity(): void
}