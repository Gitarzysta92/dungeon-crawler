import { ContinuousGameplayService } from "./continuous/continuous-gameplay.service";
import { TurnBasedGameplayService } from "./turn-based/turn-based-gameplay.service";

export class PlaystyleModule {
  constructor() { }
  
  public initialize() {
    const turnBasedService = new TurnBasedGameplayService();
    const continuousService = new ContinuousGameplayService();

    return { 
      turnBasedService,
      continuousService
    }
  }
}