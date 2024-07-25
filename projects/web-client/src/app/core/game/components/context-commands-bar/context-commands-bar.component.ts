import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ICommand } from '../../interfaces/command.interface';
import { Observable } from 'rxjs';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { CommandMenuService } from '../../services/command-menu.service';

@Component({
  selector: 'context-commands-bar',
  templateUrl: './context-commands-bar.component.html',
  styleUrls: ['./context-commands-bar.component.scss'],
  providers: [ CommandMenuService ]
})
export class ContextCommandsBarComponent implements OnInit, OnDestroy {

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
