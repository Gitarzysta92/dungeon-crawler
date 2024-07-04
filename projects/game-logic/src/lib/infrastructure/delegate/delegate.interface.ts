export interface IDelegateDeclaration {
  delegateId: string,
}


export interface IDelegateHandler {
  isApplicableTo: (d: IDelegateDeclaration) => boolean;
}