
export interface IHighlightable {
  isHighlightable: boolean;
  isHighlighted: boolean;
  highlight: () => void;
  unhighlight: () => void;
}
