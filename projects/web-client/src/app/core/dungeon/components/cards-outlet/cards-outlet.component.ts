import { Component, Input, OnInit } from '@angular/core';
import { CommandsService } from 'src/app/core/game/services/commands.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { PLAY_CARD_ACTIVITY, TRASH_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { HumanPlayerService } from '../../services/human-player.service';


@Component({
  selector: 'cards-outlet',
  templateUrl: './cards-outlet.component.html',
  styleUrls: ['./cards-outlet.component.scss']
})
export class CardsOutletComponent implements OnInit {

  @Input() deck: IDeck;

  get cards(): ICard[] { return this.deck.hand.pile.map(c => this.deck.cards.find(card => card.id === c.id)) }

  constructor(
    private readonly _commandsService: CommandsService,
    private readonly _dungeonStore: DungeonStateStore,
    private readonly _humanPlayerService: HumanPlayerService
  ) { }

  ngOnInit(): void {
    console.log(this.deck);
  }

  public play(card: ICard): void {
    const command = card.activities.find(a => a.id === PLAY_CARD_ACTIVITY) as ICommand;
    this._commandsService.executeCommand(this._dungeonStore, command, { controller: this._humanPlayerService });
  }

  public trash(card: ICard): void {
    const command = card.activities.find(a => a.id === TRASH_CARD_ACTIVITY) as ICommand;
    this._commandsService.executeCommand(this._dungeonStore, command, { controller: this._humanPlayerService });
  }

}
