import { Component, Input, OnInit } from '@angular/core';
import { IDungeonArea } from '@game-logic/gameplay/modules/dungeon/mixins/dungeon-area/dungeon-area.interface';
import { CommandsService } from 'src/app/core/game/services/commands.service';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { ENTER_DUNGEON_ACTIVITY } from '@game-logic/gameplay/modules/dungeon/dungeon.constants';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';

@Component({
  selector: 'dungeon-view',
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
})
export class DungeonViewComponent implements OnInit {

  @Input() dungeonArea: IDungeonArea

  constructor(
    private readonly _commandService: CommandsService,
    private readonly _stateStore: AdventureStateStore,
  ) { }

  ngOnInit(): void {
  }

  public async enterDungeon(): Promise<void> {
    const command = this.dungeonArea.activities.find(a => a.id === ENTER_DUNGEON_ACTIVITY) as ICommand;
    await this._commandService.executeCommand(this._stateStore, command)
  }

}
