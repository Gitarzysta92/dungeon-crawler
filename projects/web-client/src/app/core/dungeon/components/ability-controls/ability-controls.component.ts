import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { CommandMenuService } from 'src/app/core/game/services/command-menu.service';

@Component({
  selector: 'ability-controls',
  templateUrl: './ability-controls.component.html',
  styleUrls: ['./ability-controls.component.scss'],
  providers: [ CommandMenuService ]
})
export class AbilityControlsComponent implements OnInit {

  public get items(): Array<IMenuItem & { commands: ICommand[] }> { return this._commandMenuService.items ?? [] }
  
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

  public selectActivity(i: IMenuItem & { commands: ICommand[] }) {
    this.commandsSelected.next(i.commands);
  }
}
