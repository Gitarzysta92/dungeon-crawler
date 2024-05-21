export interface IHoverable {
  isHoverable: boolean;
  isHovered: boolean;
  hover: (...args: string[]) => void;
  settle: (...args: string[]) => void;
}
