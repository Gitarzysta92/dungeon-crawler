export type IAuxiliaryContainer<B, N = null, V = null> = {
  narration?: N;
  visual?: V
} & B;

export interface INarrationData {
  name: string;
  description: string;
}

export interface IVisualData<U = null, S = null> {
  ui?: U
  scene?: S;
}

export interface IVisualUiData {
  icon: string;
  avatar: { url: string };
};



// export type IDungeonDataFeedEntity =
//   IDataFeedEntityBase &
//   IDungeonGameplayTemplate &
//   {
//     entityType: DataFeedEntityType.Dungeon,
//     fields: { visualScene: ISceneComposerDefinition<unknown> }[],
//     actors: { visualScene: ISceneComposerDefinition<unknown> }[]
//     visualScene: ISceneInitialData
//   };