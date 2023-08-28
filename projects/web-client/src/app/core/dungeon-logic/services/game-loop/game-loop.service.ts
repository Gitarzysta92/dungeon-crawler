import { Injectable } from '@angular/core';
import { GameLogicService } from '../game-logic/game-logic.service';


@Injectable()
export class GamepLoopService {

  constructor(
    private readonly _gameLogicService: GameLogicService
  ) { }

}
