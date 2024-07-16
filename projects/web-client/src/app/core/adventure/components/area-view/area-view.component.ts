import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { IActivity } from '@game-logic/lib/base/activity/activity.interface';
import { CommandsService } from 'src/app/core/game/services/commands.service';
import { ENTER_DUNGEON_ACTIVITY } from '@game-logic/gameplay/modules/dungeon/dungeon.constants';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';


@Component({
  selector: 'area-view',
  templateUrl: './area-view.component.html',
  styleUrls: ['./area-view.component.scss']
})
export class AreaViewComponent implements OnInit, OnChanges {

  @Input() area: IBoardArea & INarrativeMedium;
  public enterDungeonActivity: IActivity & ICommand;

  constructor(
    private readonly _adventureStore: AdventureStateStore,
    private readonly _commandsService: CommandsService
  ) { }

  ngOnChanges(): void {
    this.enterDungeonActivity = this.area.activities.find(a => a.id === ENTER_DUNGEON_ACTIVITY) as ICommand;
    if (!this.enterDungeonActivity) {
      throw new Error("Cannot find enter dungeon activity in provided area");
    }
  }

  ngOnInit(): void {}

  public enterDungeon() {
    this._commandsService.executeCommand(this._adventureStore, this.enterDungeonActivity);
  }

}
