export interface IInteractableMedium {
  isHighlighted: boolean;
  isSelected: boolean;
  isHovered: boolean;

  registerInteractionHandler(
    interactionName: 'highlight' | 'select' |'hover',
    d: (s: boolean) => void
  ): void
}