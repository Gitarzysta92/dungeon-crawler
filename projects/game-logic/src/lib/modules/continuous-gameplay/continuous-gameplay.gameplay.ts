import { EntityService } from "../../base/entity/entity.service";
import { Game } from "../../base/game/game";
import { IContinuousGameplay, IContinuousGameplayDeclaration } from "./continuous-gameplay.interface";


export class ContinuousGameplay extends Game implements IContinuousGameplay {
  public currentDay: number;

  public get currentPlayer() {return this.players[0] }

  constructor(
    _entityService: EntityService
  ) {
    super(_entityService)
  }

  public async hydrate(data: IContinuousGameplayDeclaration) {
    await super.hydrate(data);
    this.currentDay = data.currentDay;
  }

}