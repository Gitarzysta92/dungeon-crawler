import { OverlayRef } from "@angular/cdk/overlay";
import { ComponentType } from "@angular/cdk/portal"
import { ComponentRef } from "@angular/core"
import { Subject } from "rxjs";

export interface IComponentOutletPanelRef {
  setOverlay: (component: ComponentType<unknown>) => void;
  setInputs: (inputs: { [key: string]: unknown }) => void;
  getOverlayRef: () => OverlayRef;
  getComponentRef: () => ComponentRef<unknown>;
  onDispose$: Subject<void>;
}