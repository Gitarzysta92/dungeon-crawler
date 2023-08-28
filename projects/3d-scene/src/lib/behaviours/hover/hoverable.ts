export interface Hoverable {
  isHovered: boolean;
  hovered: () => void;
  settled: () => void;
}
