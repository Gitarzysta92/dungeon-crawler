import { Observable } from "rxjs";

export interface IFormPanel {
  onSettlement$: Observable<number>;
}