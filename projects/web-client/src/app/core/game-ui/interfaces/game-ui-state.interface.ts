import { IMenuItem } from "src/app/aspects/navigation/interfaces/navigation.interface";
import { IAuxiliaryView } from "./auxiliary-view.interface";

export interface IGameUiState {
  auxiliaryViews: Array<IAuxiliaryView & IMenuItem>;
  contextBarItems: IMenuItem[];
}