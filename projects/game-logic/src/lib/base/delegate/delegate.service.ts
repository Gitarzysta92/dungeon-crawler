import { IDelegateDeclaration, IDelegateHandler } from "./delegate.interface";

export abstract class DelegateService<T extends IDelegateHandler<IDelegateDeclaration<unknown>, unknown>> {

  protected _delegates: Map<string, T>;

  public register(handler: T): void {
    this._delegates.set(handler.delegateId, handler);
  }

  protected useDelegate(d: IDelegateDeclaration<unknown>): T {
    const delegate = this._delegates.get(d.delegateId);
    if (!delegate.isApplicableTo(d)) {
      throw new Error("Delegate is not applicable")
    }
    return delegate;
  }
  
}