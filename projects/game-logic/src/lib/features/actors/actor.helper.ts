import { IActor } from "./actors.interface";

export class ActorHelper {
  public static validateActor<T extends Object>(o: T): T & IActor | undefined {
    let isActor = true
    if (!(o as T & IActor)?.actorType) {
      isActor = false;
    }
    return isActor ? o as T & IActor : undefined;
  }
}