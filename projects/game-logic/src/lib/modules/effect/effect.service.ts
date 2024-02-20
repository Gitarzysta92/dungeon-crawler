import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { Effect } from "./effect";
import { CastingStepType, EffectCastTime } from "./effect.constants";
import { IEffectCaster } from "./effect.interface";


export class EffectService {
  
  //lastingEffects: IEffect[];
  private readonly _defferedEffects: Array<{ e: Effect, c: IEffectCaster }> = [];

  constructor(
    private readonly _entityService: EntityService,
    private readonly _dataGatheringService: DataGatheringService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService
  ) {}

  dehydrate(state: {}) { };
  hydrate(data: {}) { };


  public async startCasting(e: Effect, c: IEffectCaster): Promise<Effect> {
    if (e.castTime === EffectCastTime.Deffered) {
      this._defferedEffects.push({ e, c })
      return;
    }
    return this._prepareData(e, c);
  }

  public finishCasting(e: Effect): void {
    const steps = e.resolve();

    for (let step of steps) {
      if (step.stepType === CastingStepType.MakeAction) {
        const action = step.createAction(e);
        this._actionService.exectue(action, e);
      }

      if (step.stepType === CastingStepType.ExposeModifier) {
        const { modifier, exposer } = step.createModifier(e);
        this._modifierService.apply(modifier, exposer);
      }

      if (step.stepType === CastingStepType.CastingEffect) {
        const effects = step.createEffects(e);
        effects.forEach(e => this._castInner(e));
      }
    }
  }

  public updateLastingEffects(turn: number): void {
    // for (let effect of effects) {
    //   if (effect.deploymentTurn != null && effect.deploymentTurn + effect.durationInTurns < turn) {
    //     effect.inactive = true;
    //   }
    // }
  }

  public getEffects(): Effect[] {
    return this._entityService.getEntities<Effect>(e => e.isEffect);
  }

  private _castInner(e: Effect): void {
    this.startCasting(e, e.caster);
    this.finishCasting(e);
  }

  private async _prepareData(e: Effect, c: IEffectCaster) {
    const ce = e.clone();
    ce.initializeCastingProcess(c);
    await this._dataGatheringService.gatherDataFor(ce);
    return ce;
  }

}