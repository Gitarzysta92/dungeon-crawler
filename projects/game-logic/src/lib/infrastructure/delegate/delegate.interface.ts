export interface IDelegateDeclaration {
  delegateId: string,
  payload: unknown
}


export interface IDelegateHandler {
  isApplicableTo: (d: IDelegateDeclaration) => boolean;
}