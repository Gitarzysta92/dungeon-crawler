import { Observable } from "rxjs";

export interface IBuilderStepComponent {
  resolve(): Promise<void>;
  canBeResolved$: Observable<boolean>;
}