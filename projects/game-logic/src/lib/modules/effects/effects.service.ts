import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { CastingStepType, EffectCastTime } from "./entities/effect.constants";
import { IEffect, IEffectCaster } from "./entities/effect.interface";


export class EffectService {
  
  private readonly _defferedEffects: Array<{ e: IEffect, c: IEffectCaster }> = [];

  constructor(
    private readonly _entityService: EntityService,
    private readonly _dataGatheringService: DataGatheringService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService
  ) {}

  public hydrate(data: {}) { };

  public dehydrate(state: {}) { };

  public async startCasting(e: IEffect, c: IEffectCaster): Promise<IEffect> {
    if (e.castTime === EffectCastTime.Deffered) {
      this._defferedEffects.push({ e, c })
      return;
    }
    return this._prepareData(e, c);
  }

  public finishCasting(e: IEffect): void {
    const steps = e.resolve();

    for (let step of steps) {
      if (step.stepType === CastingStepType.MakeAction) {
        const action = step.createAction(e);
        this._actionService.exectue(action);
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

  public getEffects(): IEffect[] {
    return this._entityService.getEntities<IEffect>(e => e.isEffect);
  }

  private _castInner(e: IEffect): void {
    this.startCasting(e, e.caster);
    this.finishCasting(e);
  }

  private async _prepareData(e: IEffect, c: IEffectCaster) {
    const ce = e.clone();
    ce.initializeCastingProcess(c);
    await this._dataGatheringService.gatherDataFor(ce);
    return ce;
  }

}