import { ContinuousGameplayService } from "./continuous-gameplay.service";

export class ContinuousGameplayModule {
  constructor() { }
  
  public initialize() {
    const continuousService = new ContinuousGameplayService();

    return {
      continuousService
    }
  }
}