import { ActorType } from "../../actors/actors.constants";
import { IBoardSelector, IBoardSelectorOrigin } from "../../board/board.interface";
import { IEffectBase, IEffectCaster } from "./effect.interface";

export abstract class EffectBase {

  abstract effect: IEffectBase & Partial<IBoardSelector>;
  abstract caster: IEffectCaster

  constructor(
    private readonly _context: IEffectContext,
  ) { }
  

  protected calculateAmountOfTargets(): number {
    const { selectorTargets, amountOfTargets, targetingActors } = this.effect.effectTargetingSelector;
    if (selectorTargets === 'caster' || selectorTargets === 'single') {
      return 1;
    }
    if (selectorTargets === 'multiple') {
      // TODO : add proper validation
      // if () {
      //   throw new Error('Amount of targets not provided')
      // }
      return amountOfTargets!;
    }
    if (selectorTargets === 'all') {
      // TODO : add proper validation
      // Array.isArray(targetingActors)
      // targetingActors.reduce((acc, actorType) =>
      //   acc += this.getPossibleActorsToSelect(actorType).length, 0)
      return this._context.actorsManager.selectActors({ actorTypes: targetingActors }).length;
    }
    return 0;
  }
  
  protected getPossibleActorsToSelect(): IActor[] {
  
    if (!!this.caster.position) {
      this.effect.selectorOrigin = { ...caster } as IAassignedBoardObject;
    }
  
    const actors = board.getObjectsBySelector<IActor>(effect);
    const casterActor = validateActor(validateBoardObject(caster));
    if (!!casterActor) {
      actors.push(casterActor)
    }
  
    return actors.filter(a =>
        effect.effectTargetingSelector.targetingActors &&
        effect.effectTargetingSelector.targetingActors.some(t => t === a.actorType));
  }
  
  
  getPossibleOriginsToSelect(
    effect: IEffectBase & IBoardSelector,
    board: Board,
    caster: IEffectCaster & Partial<IAassignedBoardObject>    
  ): IBoardSelectorOrigin[] {
    if (!effect.selectorOriginDeterminant || effect.selectorOriginDeterminant.isCaster === true) {
      return [caster as IBoardSelectorOrigin]
    }
  
    effect.selectorOriginDeterminant.selectorOrigin = caster as IAassignedBoardObject;
    return board.determineValidOriginsForSelector(effect.selectorOriginDeterminant);
  }
}