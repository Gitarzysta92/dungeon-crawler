import { EntityService } from "../../base/entity/entity.service";
import { Gameplay } from "../../base/gameplay/gameplay";
import { IPlayer } from "../../base/player/players.interface";
import { ActionService } from "../../cross-cutting/action/action.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { IContinuousGameplay, IContinuousGameplayDeclaration } from "./continuous-gameplay.interface";


export class ContinuousGameplay extends Gameplay implements IContinuousGameplay {
  public currentDay: number;

  public get currentPlayer() { return this._entityService.getEntity<IPlayer>(d => d.isEntity && d.isPlayer) }

  constructor(
    _entityService: EntityService,
    _actionService: ActionService,
    _eventService: EventService
  ) {
    super(_entityService, _actionService, _eventService)
  }

  public async hydrate(data: IContinuousGameplayDeclaration & any) {
    await super.hydrate(data);
    this.currentDay = data.currentDay;
  }

}