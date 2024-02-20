export interface IDelegateDeclaration<P> {
  delegateId: string,
  payload?: P;
}


export interface IDelegateHandler<
  D extends IDelegateDeclaration<P>, P> {
  delegateId: string;
  isApplicableTo: (d: D) => boolean;
  prepare: (ctx: unknown, d: P) => P
}