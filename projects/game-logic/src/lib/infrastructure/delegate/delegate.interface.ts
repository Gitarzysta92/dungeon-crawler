export interface IDelegateDeclaration {
  delegateId: string,
}


export interface IDelegateHandler {
  delegateId: string;
  isApplicableTo: (d: IDelegateDeclaration) => boolean;
}