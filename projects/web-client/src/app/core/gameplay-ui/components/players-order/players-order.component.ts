import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPlayer } from 'src/app/core/dungeon/api';

@Component({
  selector: 'players-order',
  templateUrl: './players-order.component.html',
  styleUrls: ['./players-order.component.scss']
})
export class PlayersOrderComponent implements OnChanges {

  @Input() currentPlayer: IPlayer;
  @Input() players: IPlayer[];
  @Input() playersOrder: string[];

  public nextPlayers: any;

  constructor() { }

  ngOnChanges(): void {
    const actualOrder = this._calculatePlayersOrder(this.playersOrder, this.currentPlayer.id);
    const [_, ...nextPlayers] = actualOrder.map(id => this.players.find(p => p.id === id));
    this.nextPlayers = nextPlayers;
  }

  private _calculatePlayersOrder(order: string[], actualPlayerId: string): string[] {
    let pick = false;
    return [...order, ...order].filter(id => {
      if (id === actualPlayerId) {
        pick = !pick;
      }
      return pick;
    });
  }
}