import { ModifierType } from "./value.constants";

export interface IValue {
  readonly value: number;
  add(v: number): number;
  subtract(value: number): number; 
  multiply(value: number): number;
  divide(value: number): number;
}