export interface ISceneComposerDefinition<N> {
  definitionName?: N;
  isHandled?: boolean;
  onHighlight?: (v: boolean) => void,
  onSelect?: (v: boolean) => void,
  onHover?: (v: boolean) => void,
  userData?: unknown;
}

export interface ISceneComposerHandler<N, D extends ISceneComposerDefinition<N>> {
  definitionName?: N;
  compose: (def: D) => Promise<void>;
  create?: (def: D) => Promise<unknown>;
  validateComposer: (def: string) => boolean;
}