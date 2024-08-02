import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { ICardContainer, IDraggableCard } from '../../mixins/draggable-card/draggable-card.interface';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface';

@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit, ICardContainer {

  @Input() card: ICardOnPile & IDraggableCard;

  @Input() active: boolean;

  public cardRef: ICard & INarrativeMedium

  constructor(
    public readonly elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.cardRef = this.card.ref as ICard & INarrativeMedium;
    this.card.containerRef = new WeakRef(this);
  }
 
  public async playCardAnimation(): Promise<void> {
    return new Promise(r => setTimeout(r, 500))
  }

}
