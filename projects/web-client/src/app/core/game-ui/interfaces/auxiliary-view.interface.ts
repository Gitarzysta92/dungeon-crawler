import { ComponentType } from "@angular/cdk/portal";
import { Subject } from "rxjs";

export interface IAuxiliaryView {
  component: ComponentType<any & IAuxiliaryViewComponent>;
  layerId: number;
}

export interface IAuxiliaryViewComponent {
  onClose$: Subject<void>
}