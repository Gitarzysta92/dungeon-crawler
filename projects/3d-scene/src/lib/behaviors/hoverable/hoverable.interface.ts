export interface IHoverable {
  isHoverable: boolean;
  isHovered: boolean;
  hover: () => void;
  settle: () => void;
}
