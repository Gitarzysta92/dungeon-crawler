import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { IActivity } from '@game-logic/lib/base/activity/activity.interface';
import { CommandService } from 'src/app/core/game/services/command.service';
import { ENTER_DUNGEON_ACTIVITY } from '@game-logic/gameplay/modules/dungeon/dungeon.constants';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { HumanPlayerService } from '../../services/human-player.service';
import { IAuxiliaryViewComponent } from 'src/app/core/game-ui/interfaces/auxiliary-view.interface';
import { Subject } from 'rxjs';


@Component({
  selector: 'area-view',
  templateUrl: './area-view.component.html',
  styleUrls: ['./area-view.component.scss']
})
export class AreaViewComponent implements OnInit, OnChanges, IAuxiliaryViewComponent {

  onClose$: Subject<void>;

  @Input() area: IBoardArea & INarrativeMedium;
  public enterDungeonActivity: IActivity & ICommand;

  constructor(
    private readonly _adventureStore: AdventureStateStore,
    private readonly _commandsService: CommandService,
    private readonly _humanPlayerService: HumanPlayerService
  ) { }

  ngOnChanges(): void {
    this.enterDungeonActivity = this.area.activities.find(a => a.id === ENTER_DUNGEON_ACTIVITY) as ICommand;
    if (!this.enterDungeonActivity) {
      throw new Error("Cannot find enter dungeon activity in provided area");
    }
  }

  ngOnInit(): void {}

  public enterDungeon() {
    this._commandsService.executeCommand(this.enterDungeonActivity, this._adventureStore, this._humanPlayerService);
  }

}
