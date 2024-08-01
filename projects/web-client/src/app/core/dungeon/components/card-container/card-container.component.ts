import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { CommandService } from '../../../game/services/command.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { HumanPlayerService } from '../../services/human-player.service';
import { PLAY_CARD_ACTIVITY, TRASH_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
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
    private readonly _commandsService: CommandService,
    private readonly _dungeonStore: DungeonStateStore,
    private readonly _humanPlayerService: HumanPlayerService,
  ) { }

  ngOnInit(): void {
    this.cardRef = this.card.ref as ICard & INarrativeMedium;
    this.card.containerRef = new WeakRef(this);
  }

  public play(card: ICard): void {
    const command = card.activities.find(a => a.id === PLAY_CARD_ACTIVITY) as ICommand;
    this._commandsService.executeCommand(command, this._dungeonStore, this._humanPlayerService);
  }

  public trash(card: ICard): void {
    const command = card.activities.find(a => a.id === TRASH_CARD_ACTIVITY) as ICommand;
    this._commandsService.executeCommand(command, this._dungeonStore, this._humanPlayerService);
  }


}
