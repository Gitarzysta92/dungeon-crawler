import { IPlayerDeclaration } from '../../../../lib/base/player/players.interface';
import { IHeroDeclaration } from '../../heroes/mixins/hero/hero.interface';
import { IDungeonArea } from '../mixins/dungeon-area/dungeon-area.interface';
import { IBoardAssignment } from '../../../../lib/modules/board/entities/board-object/board-object.interface';
import { IDungeonGameplayDeclaration, IDungeonGameplayEntityDeclaration } from '../dungeon.interface';
import { DeckBuilder } from '../../../../lib/modules/cards/deck.builder';

export class DungeonBuilder {

  public static  async build(
    dungeonArea: IDungeonArea,
    dungeonDeclaration: IDungeonGameplayDeclaration,
    players: IPlayerDeclaration[],
    heroes: IHeroDeclaration[],
  ): Promise<IDungeonGameplayDeclaration> {
    const d =  {
      id: dungeonArea.id,
      isDungeonGameplay: true as const,
      players: players.concat(dungeonArea.predefinedPlayers),
      order: players.concat(dungeonArea.predefinedPlayers).map(p => p.id),
      currentPlayerId: players[0].id,
      spawnPoints: dungeonDeclaration.spawnPoints,
      turn: null,
      round: null,
      entities: DungeonBuilder.initializeHeroes(heroes, players, dungeonArea.spawnPoints)
        .concat(dungeonDeclaration.entities) as IHeroDeclaration[],
    };

    for (let entity of d.entities) {
      if (entity.isDeckBearer) {
        entity.deck = DeckBuilder.build(entity.deck);
      }
    }

    return d; 
  }

  public static initializeHeroes(
    heroes: Array<IHeroDeclaration>,
    players: IPlayerDeclaration[],
    spawnPoints: IBoardAssignment[]
  ): IDungeonGameplayEntityDeclaration[] {
    heroes = heroes.filter(h => players.some(p => p.groupId === h.groupId));
    if (spawnPoints.length < heroes.length) {
      throw new Error("To many heroes selected for given dungeon'");
    }
    heroes.forEach((h, i) => Object.assign(h, spawnPoints[i]))
    return heroes 
  }
  
}

