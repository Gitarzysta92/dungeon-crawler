import { IDelegateDeclaration, IDelegateHandler } from "./delegate.interface";

export abstract class DelegateService<T extends IDelegateHandler> {

  protected _handlers: T[] = []

  public register(handler: T): void {
    this._handlers.push(handler);
  }

  protected useDelegate(d: IDelegateDeclaration): T {
    const delegate = this._handlers.find(h => h.isApplicableTo(d));
    if (!delegate) {
      throw new Error("Delegate is not applicable")
    }
    return delegate;
  }
  
}