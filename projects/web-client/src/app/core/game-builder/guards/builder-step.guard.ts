import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { RoutingService } from "src/app/aspects/navigation/api";
import { GameBuilderStateStore } from "../stores/game-builder-state.store";

@Injectable()
export class BuilderStepGuard implements CanActivate {

  constructor(
    private readonly _gameBuilder: GameBuilderStateStore,
    private readonly _routingService: RoutingService,
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const prevStep = this._gameBuilder.currentState.prevStep;
    if (!prevStep) {
      return true;
    }

    return prevStep.isFulfilled;
  }

}
