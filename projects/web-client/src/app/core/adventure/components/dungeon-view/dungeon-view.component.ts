import { Component, Input, OnInit } from '@angular/core';
import { IDungeonArea } from '@game-logic/gameplay/modules/dungeon/mixins/dungeon-area/dungeon-area.interface';
import { CommandService } from 'src/app/core/game/services/command.service';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { ENTER_DUNGEON_ACTIVITY } from '@game-logic/gameplay/modules/dungeon/dungeon.constants';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { HumanPlayerService } from '../../services/human-player.service';
import { IAuxiliaryViewComponent } from 'src/app/core/game-ui/interfaces/auxiliary-view.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'dungeon-view',
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
})
export class DungeonViewComponent implements OnInit, IAuxiliaryViewComponent  {

  onClose$: Subject<void>;

  @Input() dungeonArea: IDungeonArea

  constructor(
    private readonly _commandService: CommandService,
    private readonly _stateStore: AdventureStateStore,
    private readonly _humanPlayerService: HumanPlayerService
  ) { }

  ngOnInit(): void {
  }

  public async enterDungeon(): Promise<void> {
    const command = this.dungeonArea.activities.find(a => a.id === ENTER_DUNGEON_ACTIVITY) as ICommand;
    await this._commandService.executeCommand(command, this._stateStore, this._humanPlayerService);
  }

}
