import { ComponentType } from "@angular/cdk/portal";
import { IMenuItem } from "src/app/aspects/navigation/interfaces/navigation.interface";

export interface IAuxiliaryView {
  component: ComponentType<unknown>;
  layerId: number;
}