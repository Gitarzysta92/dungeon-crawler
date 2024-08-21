import { IModifier } from "../../cross-cutting/modifier/modifier.interface";
import { ISerializable } from "../../infrastructure/extensions/json-serializer";


export class Value implements ISerializable<number> {
  public baseValue: number;
  

  constructor(
    value: number,
    public readonly valueType: number,
  ) {
    this.baseValue = value;
  }

  private _calculateActualValue(modifiers: any): number {
    let value = this.baseValue;
    for (let m of modifiers.add) {
      value += m.value
    }
    for (let m of modifiers.substract) {
      value -= m.value
    }
    let cmv: number = 0;
    for (let m of modifiers.multiply) {
      cmv += m.value;
    }
    if (cmv > 0) {
      value *= cmv;
    }
    cmv = 0;
    for (let m of modifiers.divide) {
      cmv += m.value;
    }
    if (cmv > 0 && value > 0) {
      value /= cmv;
    }
    return Math.round(value);
  }

  public add(n: number): number {
    return this.baseValue += n;
  }

  public subtract(value: number): number {
    return this.baseValue -= value;
  }
  
  public multiply(value: number): number {
    return this.baseValue *= value;
  }

  public divide(value: number): number {
    return this.baseValue /= value;
  }

  public toJSON() {
    return this.baseValue;
  }

}