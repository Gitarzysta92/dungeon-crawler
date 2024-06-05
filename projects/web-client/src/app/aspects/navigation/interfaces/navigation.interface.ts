import { Icons } from "src/app/shared/icons/api";

export interface INavigationStateProvider {
  getStore(gamesState: symbol): any;
}

export interface IMenuItem {
  label: string;
  icon: keyof Icons;
  isActive: boolean;
  isDisabled: boolean;
  isHighlighted: boolean;
}