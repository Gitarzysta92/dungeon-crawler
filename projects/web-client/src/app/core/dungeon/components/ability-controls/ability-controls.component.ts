import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { CommandMenuService } from 'src/app/core/game/services/command-menu.service';
import { SceneMediumFactory } from 'src/app/core/scene/mixins/scene-medium/scene-medium.factory';
import { IUseAbilityActivity } from '@game-logic/lib/modules/abilities/activities/use-ability.activity';

@Component({
  selector: 'ability-controls',
  templateUrl: './ability-controls.component.html',
  styleUrls: ['./ability-controls.component.scss'],
  providers: [ CommandMenuService ]
})
export class AbilityControlsComponent implements OnInit {

  public get items(): Array<IMenuItem & { commands: Array<ICommand> }> { return this._commandMenuService.items ?? [] }
  
  @Input() commands$: Observable<ICommand[]>;
  @Output() commandsSelected: EventEmitter<ICommand[]> = new EventEmitter();

  constructor(
    private readonly _commandMenuService: CommandMenuService
  ) { }
  
  ngOnInit(): void {
    this._commandMenuService.initialize(this.commands$);
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

  public selectActivity(i: IMenuItem & { commands: ICommand[] }) {
    this.commandsSelected.next(i.commands);
  }
}
