import { ElementRef } from "@angular/core";
import { Observable } from "rxjs";
import { IOriginState } from "./origin-state";

export interface IPanelOrigin {
  state: Observable<IOriginState>;
  elementRef: ElementRef;
  setState: (boolean) => void 
}