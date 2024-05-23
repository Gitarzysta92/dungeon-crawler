

// async function trainModels(deckModel: any, playerModel: any) {
//   const dataFeed = new GameHarnessDataFeed();
//   const dungeonGameplayFactory = initializeDungeonGameplayFactory(dataFeed);
//   const adventureGameplayFactory = initializeAdventureGameplayFactory(dataFeed)
//   const gameHarnessFactory = new GameHarnessFactory(adventureGameplayFactory, dungeonGameplayFactory, dataFeed)
//   console.log('Started');
//   const initialDungeonState = await gameHarnessFactory.prepareInitialDungeonState();
//   console.log(initialDungeonState);
//   const stateStorage = new StateSnapshotStorage<DungeonGameplay>()
//   const stateStore = gameHarnessFactory.createDungeonGameHarnessDataStore(initialDungeonState, stateStorage);
  
//   const dungeonAi = new DungeonDeckAi(stateStore, deckModel);
//   const playerAi = new DungeonPlayerAi(stateStore, playerModel);
//   const gameHarness= new DungeonGameHarness(stateStore, playerAi, dungeonAi);

//   await gameHarness.performGame();
//   console.log('Finished');
//   return stateStorage.getSnapshots();
// }

// trainModels({}, {});