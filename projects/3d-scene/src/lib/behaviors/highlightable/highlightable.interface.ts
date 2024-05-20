
export interface IHighlightable {
  isHighlightable: boolean;
  isHighlighted: boolean;
  highlight: (...args: string[]) => void;
  unhighlight: (...args: string[]) => void;
}
