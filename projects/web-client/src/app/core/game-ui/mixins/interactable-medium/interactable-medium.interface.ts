export interface IInteractableMedium {
  isInteractableMedium?: true;
  isHighlighted: boolean;
  isSelected: boolean;
  isHovered: boolean;
  isDisabled?: boolean;

  registerInteractionHandler(
    interactionName: 'highlight' | 'select' | 'hover' | 'disabled',
    d: (s: boolean) => void
  ): void
}