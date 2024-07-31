import { AfterViewInit, Component, HostBinding, Input, OnInit } from '@angular/core';
import { PlayerType } from '@game-logic/lib/base/player/players.constants';
import { IDungeonPlayer } from '@game-logic/gameplay/modules/dungeon/mixins/dungeon-player/dungeon-player.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ILastingPanel } from 'src/app/core/game-ui/interfaces/lasting-panel.interface';

@Component({
  selector: 'turn-intermission',
  templateUrl: './turn-intermission.component.html',
  styleUrls: ['./turn-intermission.component.scss'],
  animations: [
    trigger('toggle', [
      state('visible', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('visible => hidden', [
        animate('0.3s')
      ]),
      transition('hidden => visible', [
        animate('0.3s')
      ]),
    ]),
  ],
})
export class TurnIntermissionComponent implements OnInit, AfterViewInit, ILastingPanel {

  @Input() player: IDungeonPlayer
  public isHuman: boolean;
  visible: boolean = false;

  constructor() { }


  ngOnInit(): void {
    this.isHuman = this.player.playerType === PlayerType.Human;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.visible = true, 0)
  }

  close(): Promise<void> {
    return new Promise(r => {
      this.visible = false;
      setTimeout(r, 300)
    })
  }

}
