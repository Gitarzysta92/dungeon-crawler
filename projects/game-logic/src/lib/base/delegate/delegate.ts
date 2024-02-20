import { IDelegateDeclaration } from "./delegate.interface";

export class Delegate implements IDelegateDeclaration {
  delegateId: string;
  settings?: unknown;
  payload?: unknown;

  invoke(concreteContext: unknown): unknown {
    throw new Error("Method not implemented.");
  }
}