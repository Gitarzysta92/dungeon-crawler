import { Observable } from "rxjs";

export interface IAnimatableComponent {
  isAnimatableComponent: boolean;
  waitForAnimationFinish(): Observable<boolean>;
}