import { Injectable } from "@angular/core";
import { CommandExecutionProcess, CommandService } from "./command.service";
import { activitesMap } from "../../game-data/constants/data-feed-activities";
import { Observable, Subject, takeUntil } from "rxjs";
import { IMenuItem } from "src/app/aspects/navigation/interfaces/navigation.interface";
import { ICommand } from "../interfaces/command.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";

@Injectable()
export class CommandMenuService {

  public items: Array<IMenuItem & { commands: ICommand[] }> = [];

  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _commandsService: CommandService,
  ) { }
  
  public initialize(commands$: Observable<ICommand[]>): void {
    const items = new Map();
    commands$
      .pipe(takeUntil(this._destroyed))
      .subscribe(cs => {
        items.clear();
        for (let c of cs) {
          let item = items.get(c.id);
          if (item) {
            item.commands.push(c);
            continue;
          }
          item = {
            icon: activitesMap[c.id]?.icon?.glyph,
            isActive: false,
            isDisabled: false,
            isHighlighted: false,
            label: activitesMap[c.id]?.name ?? (c.subject as unknown as INarrativeMedium)?.narrative?.name ?? "",
            commands: [c]
          }
        this._updateItem(item, this._commandsService.process$.value)
          items.set(c.id, item)
        }
        this.items = Array.from(items.values());
      });
    this._commandsService.process$
      .pipe(takeUntil(this._destroyed))
      .subscribe(pc => {
        this.items = this.items.map(i => this._updateItem(i, pc))
      })
  }

  public destroy(): void {
    this._destroyed.next();
  }

  private _updateItem(i: IMenuItem & { commands: ICommand[] }, process: CommandExecutionProcess | undefined): IMenuItem & { commands: ICommand[] } {
    const hasCommand = i.commands.some(c => process?.isProcessing(c));
    i.isActive = hasCommand
    i.isDisabled = !hasCommand && !!process || process?.isExecuting
    return i;
  }
}