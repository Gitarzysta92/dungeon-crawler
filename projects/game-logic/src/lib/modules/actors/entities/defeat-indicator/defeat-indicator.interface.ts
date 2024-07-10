export interface IDefeatIndicator extends IDefeatIndicatorDeclaration {
  
}


export interface IDefeatIndicatorDeclaration {
  value?: number;
  defeatTreshold: number;
  isDefeatIndicator: boolean;
}