import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IHero } from '@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface';
import { ITurnGameplayPlayer } from '@game-logic/lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface';
import { InteractionService } from 'src/app/core/game/services/interaction.service';
import { Subscription, combineLatest } from 'rxjs';

interface ITurnControlComponentStrategy {
  label: string;
  validate: () => void;
  realize: () => void;
}

@Component({
  selector: 'turn-controls',
  templateUrl: './turn-controls.component.html',
  styleUrls: ['./turn-controls.component.scss']
})
export class TurnControlsComponent implements OnInit, OnDestroy {

  @Input() pawn: IHero;
  @Input() player: ITurnGameplayPlayer;

  public selectedStrategies: ITurnControlComponentStrategy[] = [];

  private _s: Subscription;
  private _strategies: { [key: string]: ITurnControlComponentStrategy }

  constructor(
    private readonly _stateStore: DungeonStateStore,
    private readonly _interactionService: InteractionService,
  ) { }

  ngOnInit(): void {
    this._createStrategies();
    this._s = combineLatest([
      this._stateStore.state$,
      this._interactionService.process$
    ]).subscribe(([s, p]) => {
      if (p !== null) {
        this.selectedStrategies = [this._strategies.acceptInteraction, this._strategies.cancelInteraction];
      } else {
        this.selectedStrategies = [this._strategies.finishTurn]
      }
    })
  }

  ngOnDestroy(): void {
   this._s?.unsubscribe()
  }

  private _createStrategies() {
    this._strategies = {
      finishTurn: {
        label: "Finish Turn",
        realize: () => this._stateStore.currentState.nextTurn(),
        validate: () => this._stateStore.currentState.isAbleToFinishTurn(this.player),
      },
      acceptInteraction: {
        label: "Accept",
        validate: () => this._interactionService.currentProcess.canBeConfirmed,
        realize: () => this._interactionService.currentProcess.confirm()
      },
      cancelInteraction: {
        label: "Cancel",
        realize: () => this._interactionService.currentProcess.cancel(),
        validate: () => this._interactionService.currentProcess.canBeCanceled
      }
    }
  }
}


