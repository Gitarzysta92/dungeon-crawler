import { IActor, IActorsState } from "./actors.interface";

export class ActorsService implements IActorsState {
  actors: IActor[];
  
  constructor(data: IActorsState) {

  }

  public getAllActors<T extends IActor>(): Array<T> {
    const actors = Object.values(this.board.objects)
      .map(o => {
        return o as unknown as T
      });
    actors.push(this.deck as unknown as T);
    actors.push(this.board as unknown as T);
    return actors;
  }


  public getAllInteractableActors<T extends IActor>(): Array<T> {
    return this.getAllActors().filter(a => validatePossibilityToInteractActor(this, { actorId: a.id })) as Array<T>  
  }


  public getAllAttackableActors<T extends IActor & IBasicStats>(): Array<T> {
    return this.getAllActors().filter(a => 'health' in a) as Array<T>;
  }


  public removeDefeatedActors(): void {
    const actorsToRemove = this.getAllActors<IBasicStats & IActor & IAassignedBoardObject>()
      .filter(a => 'health' in a && a.health < 0 && a.actorType !== ActorType.Hero);
    
    for (let actor of actorsToRemove) {
      this.board.unassignObject(actor);
    }
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