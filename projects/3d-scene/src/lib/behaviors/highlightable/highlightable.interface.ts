
export interface IHighlightable {
  isHighlightable: boolean;
  isHighlighted: boolean;
  highlight: (...args: string[]) => void;
  unHighlight: (...args: string[]) => void;
}
