import { Component, Input, OnInit } from '@angular/core';
import { CommandsStackService } from 'src/app/aspects/commands/commands-stack/commands-stack.service';
import { IPlayer } from '../../../dungeon/models/player';
import { IPlayerControlAction } from '../../models/player-control-action';

@Component({
  selector: 'player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent implements OnInit {

  @Input() action: IPlayerControlAction;
  @Input() currentPlayer: IPlayer;

  public get avatarUrl(): string { return this.currentPlayer.avatarUrl };
  public get revertUnavailable(): boolean { return !this._commandsStack.isEmpty }

  constructor(
    private readonly _commandsStack: CommandsStackService
  ) { }

  ngOnInit(): void { }

  public makeAction(): void {
    this.action.callback();
  }

  public undoLastCommand(): void {
    this._commandsStack.revert();
  }

}
