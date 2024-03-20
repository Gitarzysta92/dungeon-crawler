import { AdventureBuilder } from "../gameplay/modules/adventure/builder/adventure.builder";
import { HeroBuilder } from "../gameplay/modules/heroes/builder/hero.builder";
import { AdventureGameplayFactory } from "../gameplay/state/adventure/adventure-gameplay.factory";
import { DataFeed } from "../helpers/data-feed";
import { getEntityFactory } from "../helpers/entity-helper";
import { StateStore } from "../helpers/state-store";
import { IPlayer } from "../lib/base/player/players.interface";
import { StateDispatcher } from "../lib/base/state/state-dispatcher";

describe('adventure', () => {

  beforeEach(async () => {
    const dataFeed = new DataFeed()
    const stateDispatcher = new StateDispatcher({} as any);
    const stateStore = new StateStore(stateDispatcher);
    const adventureGameplay = await AdventureGameplayFactory.create(dataFeed as any, {});
    const adventureBuilder = new AdventureBuilder(dataFeed);
    const entityFactory = getEntityFactory(dataFeed);
    const heroBuilder = new HeroBuilder(dataFeed, entityFactory);
    const heroClass = (await dataFeed.getHeroClasses())[0];
    const heroRace = (await dataFeed.getHeroRaces())[0];
    const heroOrigin = (await dataFeed.getHeroOrigins())[0];
    const name = "test";
  
    await heroBuilder.selectClass(heroClass.id);
    await heroBuilder.selectRace(heroRace.id);
    await heroBuilder.selectOrigin(heroOrigin.id);
    await heroBuilder.selectName(name);
      
    const hero = await heroBuilder.build();
    const player = {} as IPlayer;
    const state = await adventureBuilder.build(player, hero);
    adventureGameplay.hydrate(state);
    stateStore.initializeStore(adventureGameplay);
  });

  it("initialize adventure", () => {
    expect(true).toBeTruthy();
  });


});















// describe('dungeon', () => {
//   const stateDispatcher = createStateDispatcher();
  
//   let dungeonState: DungeonGameplay;

//   beforeEach(() => {
//     const adventureState = createAdventureState();
//     dungeonState = StateFactory.createDungeonState(adventureState, dataFeed, dungeonTemplate);
//   });

//   it('should utilize all hero actions and finish turn successfully', () => {
//     // Arrange
//     Object.assign(dungeonState.hero, { rotation: 5 })
//     const meleeWeapon = dungeonState.heroInventory.getItem(heroSword)!;
//     const enemyField = { r: 0, q: 1, s: -1 };
//     const targetEnemy = Object.assign({ ...ratActor }, {
//       id: "4DCB089A-1F57-4B8E-BD4A-973EDBBA0DD6",
//       position: null,
//       rotation: 0 as IBoardObjectRotation
//     });
//     dungeonState.board.assignObject(targetEnemy, enemyField);
//     const moveTargetField = { r: 1, q: 0, s: -1 };
//     const ratInitialHealth = ratActor.health;
//     const emptyEffectCost = 2;
//     const emptyEffect: INoopEffect & IDisposable & IBoardSelector = {
//       id: "6759CDA2-2960-4C46-BF61-D5F72F1F4EF7",
//       effectName: EffectName.Noop,
//       effectLifeTime: EffectLifetime.Instantaneous,
//       interactionType: [InteractionType.Disposable],
//       effectTargetingSelector: {
//         resolveTime: EffectTargetingResolveTime.Immediate,
//         targetingActors: [ActorType.Creature],
//         selectorTargets: "single",
//       },
//       utilizationCost: [{ costType: 'minorAction', costValue: emptyEffectCost }],
//       selectorType: 'line'
//     }
//     dungeonState.heroPreparedSpellAndAbilityIds.push(emptyEffect.id)
//     const heroInitialMajorActions = dungeonState.hero.majorAction;
//     const heroInitialMinorActions = dungeonState.hero.minorAction;

//     // Act
//     dungeonState = stateDispatcher.next(makeMove({ setup: move, to: moveTargetField }), dungeonState);
//     dungeonState = stateDispatcher.next(makeAttack({ attack: basicAttack, weaponIds: meleeWeapon.id, targets: [targetEnemy] }), dungeonState);
//     dungeonState = stateDispatcher.next(castEffect({ effect: emptyEffect }), dungeonState);
    
//     // Assert
//     expect(dungeonState.board.getObjectById(dungeonState.hero.id)?.position).toStrictEqual(moveTargetField);
//     expect(targetEnemy.health).not.toEqual(ratInitialHealth);
//     expect(dungeonState.hero.majorAction).toEqual(heroInitialMajorActions - basicAttack.utilizationCost.find(u => u.costType === 'majorAction')?.costValue!);
//     expect(dungeonState.hero.minorAction).toEqual(heroInitialMinorActions - emptyEffectCost);

//     // Act
//     dungeonState = stateDispatcher.next(finishTurn(), dungeonState);

//     // Assert
//     expect(dungeonState.hero.majorAction).toEqual(heroInitialMajorActions);
//     expect(dungeonState.hero.minorAction).toEqual(heroInitialMinorActions);
//   });



//   it('should make dungeon turn sucessfully', () => {
//     // Arrange
//     const amountCardsToPlay = 4;
//     const params = dungeonScenario[0].dungeonCardEffects;
//     dungeonState.deck.cardsInDeck = dataFeed.dungeonCards;
//     dungeonState.deck.drawPerTurn = amountCardsToPlay;
//     const ratToEnhance = (params.find(p => p.effectData.effectName === EffectName.ModifyStats)?.effectData.payload[0] as any)
//     const ratInitialAttackPower = ratToEnhance.attackPower;

//     // Act
//     dungeonState = stateDispatcher.next(finishTurn(), dungeonState);
//     dungeonState = stateDispatcher.next(makeDungeonTurn({ params: params as any }), dungeonState);

//     //console.log(dungeonState.board)
    
//     // Assert
//     expect(dungeonState.deck.utilizedCards.length).toStrictEqual(amountCardsToPlay);
//     expect(dungeonState.deck.cardsInDeck.length).toStrictEqual(0);
//     expect(dungeonState.deck.cardsToUtilize.length).toStrictEqual(0);
//     {
//       const { coords } = (params.find(p => p.effectData.effectName === EffectName.ModifyPosition)?.effectData.payload[0] as any);
//       const actor = dungeonState.board.getObjectFromField(coords);
//       expect(actor).toBeTruthy();
//       expect((actor as any).attackPower).not.toEqual(ratInitialAttackPower);
//     }
//     {
//       const { coords } = (params.find(p => p.effectData.effectName === EffectName.SpawnActor)?.effectData.payload[0] as any);
//       expect(dungeonState.board.getObjectFromField(coords)).toBeTruthy();
//     }
//   });

// });