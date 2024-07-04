import { Component, Input, OnInit } from '@angular/core';
import { IAbility } from '@game-logic/lib/modules/abilities/entities/ability/ability.interface';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { CommandsService } from 'src/app/core/game/services/commands.service';
import { DungeonStateStore } from '../../stores/dungeon-state.store';


@Component({
  selector: 'cards-outlet',
  templateUrl: './cards-outlet.component.html',
  styleUrls: ['./cards-outlet.component.scss']
})
export class CardsOutletComponent implements OnInit {

  @Input() cards: IAbility[] = []; 

  constructor(
    private readonly _commandsService: CommandsService,
    private readonly _dungeonStore: DungeonStateStore
  ) { }

  ngOnInit(): void {
    console.log(this.cards);
  }

  public selectCard(card: IAbility): void {
    // const command = card.activities.find(a => a.id === CAST_EFFECT_ACTIVITY) as ICommand;

    // this._commandsService.executeCommand(this._dungeonStore, command);
  }

}
