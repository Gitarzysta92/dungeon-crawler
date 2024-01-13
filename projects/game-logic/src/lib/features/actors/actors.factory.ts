import { IActorsState } from "./actors.interface";
import { ActorsService } from "./actors.service";

export class ActorsFactory {
  static initializeActorsState(state: IActorsState): ActorsService {
    return {} as ActorsService;
  }

  private _initializeActors<T extends IActor>(actors: Dictionary<string, T>): Dictionary<string, T> {
    return Object.fromEntries(Object.entries(actors).map(a => {
      let [id, actor] = a as any;

      if (actor.actorType === ActorType.Hero) {
        actor = new Hero(actor);
      }

      return [id, actor]
    }))
  }

}