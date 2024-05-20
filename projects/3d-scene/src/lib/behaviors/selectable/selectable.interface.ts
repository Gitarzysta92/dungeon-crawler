
export interface ISelectable {
  isSelectable: boolean;
  isSelected: boolean;
  select: (...args: string[]) => void;
  deselect: (...args: string[]) => void;
}
