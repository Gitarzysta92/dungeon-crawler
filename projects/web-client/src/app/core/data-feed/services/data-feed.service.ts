import { Injectable } from '@angular/core';
import { IGameFeed } from '@game-logic/lib/states/game.interface';
import { IBoardActorDataFeedEntity, ICharacterDataFeedEntity, IDungeonExitDataFeedEntity, IEnemyDataFeedEntity, IObstacleDataFeedEntity, ITreasureDataFeedEntity } from '../interfaces/data-feed-actor-entity.interface';
import { ISpellOrAbilityDataFeedEntity } from '../interfaces/data-feed-effect-entity.interface';
import { IndexedDbService } from 'src/app/infrastructure/data-store/api';
import { firstValueFrom, forkJoin, from, map, tap } from 'rxjs';
import { IQuestDataFeedEntity } from '../interfaces/data-feed-quest-entity.interface';
import { IAreaDataFeedEntity } from '../interfaces/data-feed-area-entity.interface';
import { IDungeonCardDataFeedEntity } from '../interfaces/data-feed-dungeon-card-entity.interface';
import { IItemDataFeedEntity } from '../interfaces/data-feed-item-entity.interface';
import { IHeroDataFeedEntity } from '../interfaces/data-feed-hero-entity.interface';
import { gatherItemQuestDataFeedEntity, slayEnemiesItemQuestDataFeedEntity } from '../constants/data-feed-quests';
import { dungeonExitDataFeedEntity, obstacleActorDataFeedEntity, ratActorDataFeedEntity, treasureActorDataFeedEntity, vendorCharacterDataFeedEntity } from '../constants/data-feed-actors';
import { dungeonDataFeedEntity } from '../constants/data-feed-dungeons';
import { IDungeonDataFeedEntity } from '../interfaces/data-feed-dungeon-entity.interface';
import { firstAreaDataFeedEntity, firstAreaDungeonDataFeedEntity, firstAreaTavernDataFeedEntity, secondAreaDataFeedEntity } from '../constants/data-feed-areas';
import { emptyCardDataFeedEntity, makeAttackCardDataFeedEntity, increaseEnemyAttackPowerCardDataFeedEntity, moveEnemyCardDataFeedEntity, spawnEnemyCardDataFeedEntity } from '../constants/data-feed-dungeon-cards';
import { bootsDataFeedEntity, goldDataFeedEntity, magicPooDataFeedEntity, meleeWeapoonDataFeedEntity, pooDataFeedEntity, potionDataFeedEntity, staffDataFeedEntity } from '../constants/data-feed-items';
import { heroFirstDataFeedEntity, heroSecondDataFeedEntity } from '../constants/data-feed-hero';
import { basicAttackDataFeedEntity, curseDataFeedEntity, fireballDataFeedEntity, healingDataFeedEntity, meteorDataFeedEntity, moveDataFeedEntity, teleportDataFeedEntity, visionDataFeedEntity, weaknessDataFeedEntity } from '../constants/data-feed-effects';

@Injectable({
  providedIn: 'root'
})
export class DataFeedService implements IGameFeed {

  private _questsKey: string = "quests";
  private _charactersKey: string = "characters";
  private _treasuresKey: string = "treasures";
  private _dungeonExitsKey: string = "dungeonExits";
  private _enemiesKey: string = "enemies";
  private _obstaclesKey: string = "obstacles";
  //private _boardsKey: string = "board";

  private _effectsKey: string = "effects";
  private _areasKey: string = "areas";
  private _dungeonsKey: string = "dungeons";
  private _dungeonCardsKey: string = "dungeonCards";
  private _itemsKey: string = "items";
  private _heroesKey: string = "heroes";

  constructor(
    private readonly _indexedDbService: IndexedDbService
  ) { }


  public loadData(): void {
    console.log("data loaded");
    this._indexedDbService.clearStorage();

    this._indexedDbService.createTable<IQuestDataFeedEntity>(this._questsKey);
    this._indexedDbService.insert<IQuestDataFeedEntity>(this._questsKey, [gatherItemQuestDataFeedEntity, slayEnemiesItemQuestDataFeedEntity]);

    this._indexedDbService.createTable<ICharacterDataFeedEntity>(this._charactersKey);
    this._indexedDbService.insert<ICharacterDataFeedEntity>(this._charactersKey, [vendorCharacterDataFeedEntity]);

    this._indexedDbService.createTable<ITreasureDataFeedEntity>(this._treasuresKey);
    this._indexedDbService.insert<ITreasureDataFeedEntity>(this._treasuresKey, [treasureActorDataFeedEntity]);

    this._indexedDbService.createTable<IDungeonExitDataFeedEntity>(this._dungeonExitsKey);
    this._indexedDbService.insert<IDungeonExitDataFeedEntity>(this._dungeonExitsKey, [dungeonExitDataFeedEntity]);

    this._indexedDbService.createTable<IEnemyDataFeedEntity>(this._enemiesKey);
    this._indexedDbService.insert<IEnemyDataFeedEntity>(this._enemiesKey, [ratActorDataFeedEntity]);

    this._indexedDbService.createTable<IObstacleDataFeedEntity>(this._obstaclesKey);
    this._indexedDbService.insert<IObstacleDataFeedEntity>(this._obstaclesKey, [obstacleActorDataFeedEntity]);

    // this._indexedDbService.createTable<IBoardDataFeedEntity>(this._boardsKey);
    // this._indexedDbService.insert<IBoardDataFeedEntity>(this._boardsKey, []);

    this._indexedDbService.createTable<ISpellOrAbilityDataFeedEntity>(this._effectsKey);
    this._indexedDbService.insert<ISpellOrAbilityDataFeedEntity>(this._effectsKey, [
      basicAttackDataFeedEntity,
      moveDataFeedEntity,
      fireballDataFeedEntity,
      teleportDataFeedEntity,
      healingDataFeedEntity,
      visionDataFeedEntity,
      weaknessDataFeedEntity,
      curseDataFeedEntity,
      meteorDataFeedEntity
    ]);

    this._indexedDbService.createTable<IAreaDataFeedEntity>(this._areasKey);
    this._indexedDbService.insert<IAreaDataFeedEntity>(this._areasKey, [
      firstAreaDataFeedEntity,
      secondAreaDataFeedEntity,
      firstAreaDungeonDataFeedEntity,
      firstAreaTavernDataFeedEntity
    ]);

    this._indexedDbService.createTable<IDungeonDataFeedEntity>(this._dungeonsKey);
    this._indexedDbService.insert<IDungeonDataFeedEntity>(this._dungeonsKey, [dungeonDataFeedEntity])

    this._indexedDbService.createTable<IDungeonCardDataFeedEntity>(this._dungeonCardsKey);
    this._indexedDbService.insert<IDungeonCardDataFeedEntity>(this._dungeonCardsKey, [
      emptyCardDataFeedEntity,
      makeAttackCardDataFeedEntity,
      increaseEnemyAttackPowerCardDataFeedEntity,
      moveEnemyCardDataFeedEntity,
      spawnEnemyCardDataFeedEntity
    ]);

    this._indexedDbService.createTable<IItemDataFeedEntity>(this._itemsKey);
    this._indexedDbService.insert<IItemDataFeedEntity>(this._itemsKey, [
      staffDataFeedEntity,
      potionDataFeedEntity,
      pooDataFeedEntity,
      magicPooDataFeedEntity,
      goldDataFeedEntity,
      meleeWeapoonDataFeedEntity,
      bootsDataFeedEntity
    ]);

    this._indexedDbService.createTable<IHeroDataFeedEntity>(this._heroesKey);
    this._indexedDbService.insert<IHeroDataFeedEntity>(this._heroesKey, [heroFirstDataFeedEntity, heroSecondDataFeedEntity]);
  }

  public getQuests(ids?: string[]): Promise<IQuestDataFeedEntity[]> {
    return this._getListData(this._questsKey, ids)
  }

  public getQuest(id: string): Promise<IQuestDataFeedEntity> {
    return this._indexedDbService.read(id, this._questsKey);
  }

  public getCharacters(ids: string[]): Promise<ICharacterDataFeedEntity[]> {
    return this._getListData(this._charactersKey, ids);
  }

  public getCharacter(id: string): Promise<ICharacterDataFeedEntity> {
    return this._indexedDbService.read(id, this._questsKey);
  }

  public getTreasures(ids: string[]): Promise<ITreasureDataFeedEntity[]> {
    return this._getListData(this._treasuresKey, ids);
  }

  public getTreasure(id: string): Promise<ITreasureDataFeedEntity> {
    return this._indexedDbService.read(id, this._treasuresKey);
  }

  public getDungeonExits(ids: string[]): Promise<IDungeonExitDataFeedEntity[]> {
    return this._getListData(this._dungeonExitsKey, ids);
  }

  public getDungeonExit(id: string): Promise<IDungeonExitDataFeedEntity> {
    return this._indexedDbService.read(id, this._dungeonExitsKey);
  }

  public getAreas(ids?: string[]): Promise<IAreaDataFeedEntity[]> {
    return this._getListData(this._areasKey, ids);
  }

  public getArea(id: string): Promise<IAreaDataFeedEntity> {
    return this._indexedDbService.read(id, this._areasKey);
  }

  public getDungeons(ids?: string[]): Promise<IDungeonDataFeedEntity[]> {
    return this._getListData(this._dungeonsKey, ids);
  }
  
  public getDungeon(id: string): Promise<IDungeonDataFeedEntity> {
    return this._indexedDbService.read(id, this._dungeonsKey);
  }

  public getDungeonCards(ids?: string[]): Promise<IDungeonCardDataFeedEntity[]> {
    return this._getListData(this._dungeonCardsKey, ids);
  }

  public getDungeonCard(id): Promise<IDungeonCardDataFeedEntity> {
    return this._indexedDbService.read(id, this._dungeonCardsKey);
  }

  public getEnemies(ids?: string[]): Promise<IEnemyDataFeedEntity[]> {
    return this._getListData(this._enemiesKey, ids);
  }

  public getObstacles(ids?: string[]): Promise<IObstacleDataFeedEntity[]> {
    return this._getListData(this._obstaclesKey, ids);
  }

  public getItems(ids?: string[]): Promise<IItemDataFeedEntity[]> {
    return this._getListData(this._itemsKey, ids);
  }

  public getItem(id: string): Promise<IItemDataFeedEntity> {
    return this._indexedDbService.read(id, this._itemsKey);
  }

  public getSpellsAndAbilities(ids?: string[]): Promise<ISpellOrAbilityDataFeedEntity[]> {
    return this._getListData(this._effectsKey, ids);
  }

  public getActors(ids?: string[]): Promise<IBoardActorDataFeedEntity[]> {
    return firstValueFrom(forkJoin([
      from(this._getListData(this._charactersKey, ids)).pipe(map(r => r.filter(e => !!e))),
      from(this._getListData(this._treasuresKey, ids)).pipe(map(r => r.filter(e => !!e))),
      from(this._getListData(this._dungeonExitsKey, ids)).pipe(map(r => r.filter(e => !!e))),
      from(this._getListData(this._enemiesKey, ids)).pipe(map(r => r.filter(e => !!e))),
      from(this._getListData(this._obstaclesKey, ids)).pipe(map(r => r.filter(e => !!e))),
      from(this._getListData(this._dungeonExitsKey, ids)).pipe(map(r => r.filter(e => !!e)))
    ]).pipe(map(i => i.flatMap(i => i)))) as Promise<IBoardActorDataFeedEntity[]>
  }

  public getActor(id: string): Promise<IBoardActorDataFeedEntity> {
    return firstValueFrom(forkJoin([
      this._indexedDbService.read(id, this._charactersKey),
      this._indexedDbService.read(id, this._treasuresKey),
      this._indexedDbService.read(id, this._dungeonCardsKey),
      this._indexedDbService.read(id, this._enemiesKey),
      this._indexedDbService.read(id, this._obstaclesKey),
      this._indexedDbService.read(id, this._dungeonExitsKey)
    ]).pipe(map(i => i.find(i => !!i))))  as Promise<IBoardActorDataFeedEntity>
  }

  public getHeroTemplate(id: string): Promise<IHeroDataFeedEntity> {
    return this._indexedDbService.read(id, this._heroesKey)
  }

  public getHeroTemplates(ids?: string[]): Promise<IHeroDataFeedEntity[]> {
    return this._getListData(this._heroesKey, ids);
  }

  public getVersion(): any {
    return this._indexedDbService.read('version', this._heroesKey)
  }

  private async _getListData<T extends object>(tableKey: string, ids?: string[]): Promise<T[]> {
    if (Array.isArray(ids)) {
      return await Promise.all(ids.map(id => this._indexedDbService.read<T>(id, tableKey)))
    } else {
      return await this._indexedDbService.readAll(tableKey)
    }
  }
}
