
export interface ISelectable {
  isSelectable: boolean;
  isSelected: boolean;
  select: () => void;
  deselect: () => void;
}
