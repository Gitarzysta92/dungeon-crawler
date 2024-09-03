import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { CommandMenuService } from 'src/app/core/game/services/command-menu.service';
import { SceneMediumFactory } from 'src/app/core/scene/mixins/scene-medium/scene-medium.factory';
import { IUseAbilityActivity } from '@game-logic/lib/modules/abilities/activities/use-ability.activity';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { UiInteractionService } from 'src/app/core/game-ui/services/ui-interaction.service';

@Component({
  selector: 'ability-controls',
  templateUrl: './ability-controls.component.html',
  styleUrls: ['./ability-controls.component.scss'],
  providers: [ CommandMenuService ]
})
export class AbilityControlsComponent implements OnInit {

  public get items(): Array<IMenuItem & { commands: Array<ICommand> }> {
    for (let command of this._commandMenuService.items) {
      command.isDisabled = command.commands.every(c => !c.canBeDone(this._stateStore.currentState.getCurrentPlayerSelectedPawn()))
    }
    return this._commandMenuService.items ?? []
  }
  
  @Input() commands$: Observable<ICommand[]>;
  @Output() commandsSelected: EventEmitter<ICommand[]> = new EventEmitter();

  constructor(
    private readonly _commandMenuService: CommandMenuService,
    private readonly _stateStore: DungeonStateStore,
    private readonly _uiInteractionService: UiInteractionService
  ) { }
  
  ngOnInit(): void {
    this._commandMenuService.initialize(this.commands$, false);
  }

  ngOnDestroy(): void {
    this._commandMenuService.destroy();
  }

  public hover(e: MouseEvent, item: IMenuItem & { commands: Array<ICommand & IUseAbilityActivity> }): void {
    if (e.type === 'mouseenter' && !item.isDisabled && !item.isActive) {
      SceneMediumFactory.asSceneMedium(item.commands[0].subject.abilityPerformer.deref()).isHovered = true;
    } else {
      SceneMediumFactory.asSceneMedium(item.commands[0].subject.abilityPerformer.deref()).isHovered = false
    }
  }

  public selectActivity(i: IMenuItem & { commands: ICommand[] }, btn: HTMLElement): void {
    const bb = btn.getBoundingClientRect();
    this._uiInteractionService.setPointerOrigin(bb);
    this.commandsSelected.next(i.commands);
  }
}
