import { Injectable } from "@angular/core";

@Injectable()
export class GameLogicService {

  constructor() {}

  initialize() {
  }

  getCurrentPlayerId(): string {
    throw new Error("Method not implemented.");
  }

  startTurn(): void {
    throw new Error("Method not implemented.");
  }

  finishTurn() {
    throw new Error("Method not implemented.");
  }

}