
export interface IHighlightable {
  isHighlightable: boolean;
  isHighlighted: boolean;
  highlight: (...args: string[]) => void;
  settle: (...args: string[]) => void;
}
