import { ModifierType } from "./value.constants";

export interface IValueModifier {
  valueType: number;
  type: ModifierType;
  value: number
}