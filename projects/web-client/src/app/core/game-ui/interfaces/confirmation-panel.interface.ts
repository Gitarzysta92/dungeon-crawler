import { Observable } from "rxjs";

export interface IConfirmationPanel {
  onSettlement$: Observable<boolean>;
}