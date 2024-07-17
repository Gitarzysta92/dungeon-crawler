import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { CommandsService } from '../../../game/services/commands.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { HumanPlayerService } from '../../services/human-player.service';
import { PLAY_CARD_ACTIVITY, TRASH_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';

@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  @Input() card: ICard & INarrativeMedium

  constructor(
    private readonly _commandsService: CommandsService,
    private readonly _dungeonStore: DungeonStateStore,
    private readonly _humanPlayerService: HumanPlayerService
  ) { }

  ngOnInit(): void {
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
