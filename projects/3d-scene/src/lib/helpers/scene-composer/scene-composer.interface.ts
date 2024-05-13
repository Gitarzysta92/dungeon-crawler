export interface ISceneComposerDefinition<N> {
  definitionName: N;
  isHandled?: boolean;
}

export interface ISceneComposerHandler<N, D extends ISceneComposerDefinition<N>> {
  definitionName: N;
  compose: (def: D) => Promise<void>;
  create?: (def: D) => Promise<unknown>;
  validateComposer: (def: string) => boolean;
}