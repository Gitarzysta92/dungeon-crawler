import { ISerializable } from "../../infrastructure/extensions/json-serializer";
import { IValue } from "./value.interface";


export class Value implements ISerializable<number>, IValue {
  public value: number;
  
  constructor(value: number) {
    this.value = value;
  }

  public add(n: number): number {
    return this.value += n;
  }

  public subtract(value: number): number {
    return this.value -= value;
  }
  
  public multiply(value: number): number {
    return this.value *= value;
  }

  public divide(value: number): number {
    return this.value /= value;
  }

  public toJSON() {
    return this.value;
  }

}


// private _calculateActualValue(modifiers: any): number {
//   let value = this.baseValue;
//   for (let m of modifiers.add) {
//     value += m.value
//   }
//   for (let m of modifiers.substract) {
//     value -= m.value
//   }
//   let cmv: number = 0;
//   for (let m of modifiers.multiply) {
//     cmv += m.value;
//   }
//   if (cmv > 0) {
//     value *= cmv;
//   }
//   cmv = 0;
//   for (let m of modifiers.divide) {
//     cmv += m.value;
//   }
//   if (cmv > 0 && value > 0) {
//     value /= cmv;
//   }
//   return Math.round(value);
// }