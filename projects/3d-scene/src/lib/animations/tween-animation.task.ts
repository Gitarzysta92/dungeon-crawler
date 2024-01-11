import * as TWEEN from '@tweenjs/tween.js'
import { AnimationTask } from './animation.task';
import { IAnimatable, ITweenAnimationDefinition } from './animations.interface';


export class TweenAnimation<S extends IAnimatable, D extends object> extends AnimationTask<S> {
  private _tween: TWEEN.Tween<{}> | undefined;

  constructor(
    _subjectHolder: S,
    private readonly _definition: ITweenAnimationDefinition<D>,
    private readonly _easing:(amount: number) => number,
    private readonly _cb: (p: D) => void, 
    public readonly isBlocking: boolean
  ) {
    super(_subjectHolder);
  }

  public initialize(): void {
    this._tween = new TWEEN.Tween(this._definition.from, false)
      .to(this._definition.to, this._definition.animationTime)
      .easing(this._easing)
      .onUpdate(() => this._cb(this._definition.from))
    
    if (this._definition.delay) {
      this._tween = this._tween.delay(this._definition.delay);
    }
  }

  public perform(sysTime: number): void {
    if (!this._tween?.isPlaying()) {
      this._tween?.start();
    }

    if (!this._tween?.update(sysTime)) {
      this.finish();
    }
  }

}