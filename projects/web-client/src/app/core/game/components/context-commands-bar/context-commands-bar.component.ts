import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ICommand } from '../../interfaces/command.interface';
import { Observable, map } from 'rxjs';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { CommandExecutionProcess, CommandsService } from '../../services/commands.service';

@Component({
  selector: 'context-commands-bar',
  templateUrl: './context-commands-bar.component.html',
  styleUrls: ['./context-commands-bar.component.scss']
})
export class ContextCommandsBarComponent implements OnInit {

  public items: Array<IMenuItem & { commands: ICommand[] }> = [];
  
  @Input() commands$: Observable<ICommand[]>;
  @Output() commandsSelected: EventEmitter<ICommand[]> = new EventEmitter();

  constructor(
    private readonly _commandsService: CommandsService
  ) { }

  ngOnInit(): void {
    const items = new Map();
    this.commands$.subscribe(cs => {
      items.clear();
      for (let c of cs) {
        let item = items.get(c.id);
        if (item) {
          item.commands.push(c);
          continue;
        }
        
        item = {
          icon: "map",
          isActive: false,
          isDisabled: false,
          isHighlighted: false,
          label: "",
          commands: [c]
        }

        item = this._updateItem(item, this._commandsService.processing$.value)
        items.set(c.id, item)
      }
      this.items = Array.from(items.values());
    });

    this._commandsService.processing$.subscribe(pc => {
      this.items = this.items.map(i => this._updateItem(i, pc))
    })
  }

  public selectActivity(i: IMenuItem & { commands: ICommand[] }) {
    if (this._commandsService.processing$.value?.isExecuting) {
      return;
    }
    this.commandsSelected.next(i.commands);
  }

  private _updateItem(i: IMenuItem & { commands: ICommand[] }, process: CommandExecutionProcess | undefined): IMenuItem & { commands: ICommand[] } {
    const hasCommand = i.commands.some(c => process?.hasCommand(c));
    i.isActive = hasCommand
    i.isDisabled = !hasCommand && !!process || process?.isExecuting
    return i;
  }

}
