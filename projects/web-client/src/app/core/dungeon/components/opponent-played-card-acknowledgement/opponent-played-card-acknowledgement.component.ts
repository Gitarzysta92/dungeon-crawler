import { Component, Input, OnInit } from '@angular/core';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface';
import { Subject } from 'rxjs';
import { IConfirmationPanel } from 'src/app/core/game-ui/interfaces/confirmation-panel.interface';
import { IInteractableMedium } from 'src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { IDraggableCard } from '../../mixins/draggable-card/draggable-card.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'opponent-played-card-acknowledgement',
  templateUrl: './opponent-played-card-acknowledgement.component.html',
  styleUrls: ['./opponent-played-card-acknowledgement.component.scss'],
  animations: [
    trigger('cardEnter', [
      transition(':enter', [
        style({ transform: "translateX({{initialX}}px) translateY({{initialY}}px) rotate({{initialRotation}}deg) scale({{initialScale}})" }),
        animate('{{duration}}ms {{delay}}ms ease-in-out', style({ transform: "translateX({{targetX}}px) translateY({{targetY}}px) rotate({{targetRotation}}deg) scale({{targetScale}})" }))
      ], { params: { initialX: 0, initialY: 0, targetX: 0, targetY: 0, delay: 0, duration: 0, initialScale: 1, targetScale: 1, initialRotation: 0, targetRotation: 0 } }),
    ]),
    trigger('cardLeave', [
      transition(':leave', [
        style({ transform: "translateX({{initialX}}px) translateY({{initialY}}px) rotate({{initialRotation}}deg) scale({{initialScale}})" }),
        animate('{{duration}}ms {{delay}}ms ease-in-out', style({ transform: "translateX({{targetX}}px) translateY({{targetY}}px) rotate({{targetRotation}}deg) scale({{targetScale}})" }))
      ], { params: { initialX: 0, initialY: 0, targetX: 0, targetY: 0, delay: 0, duration: 0, initialScale: 1, targetScale: 1, initialRotation: 0, targetRotation: 0  } }),
    ]),
  ]
})
export class OpponentPlayedCardAcknowledgementComponent implements OnInit, IConfirmationPanel {

  @Input() card: ICardOnPile & IDraggableCard & INarrativeMedium & IInteractableMedium;

  public onSettlement$: Subject<boolean> = new Subject()

  constructor() { }
  

  ngOnInit(): void {
    console.log('opponent', this.card);
  }

  public acknowledge(): void {
    this.onSettlement$.next(true)
  }

}
