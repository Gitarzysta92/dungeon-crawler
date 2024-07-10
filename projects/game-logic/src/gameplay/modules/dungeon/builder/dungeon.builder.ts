import { IPlayerDeclaration } from '../../../../lib/base/player/players.interface';
import { IHeroDeclaration } from '../../heroes/mixins/hero/hero.interface';
import { IDungeonArea } from '../mixins/dungeon-area/dungeon-area.interface';
import { IBoardAssignment } from '../../../../lib/modules/board/entities/board-object/board-object.interface';
import { IDungeonGameplayDeclaration, IGameplayEntityDeclaration } from '../dungeon.interface';

export class DungeonBuilder {

  public static  async build(
    dungeonArea: IDungeonArea,
    dungeonDeclaration: IDungeonGameplayDeclaration,
    players: IPlayerDeclaration[],
    heroes: IHeroDeclaration[],
  ): Promise<IDungeonGameplayDeclaration> {
    return {
      id: dungeonArea.id,
      isDungeonGameplay: true,
      players: players.concat(dungeonArea.predefinedPlayers),
      order: players.concat(dungeonArea.predefinedPlayers).map(p => p.id),
      currentPlayerId: players[0].id,
      spawnPoints: dungeonDeclaration.spawnPoints,
      turn: null,
      round: null,
      entities: DungeonBuilder.initializeHeroes(heroes, players, dungeonArea.spawnPoints)
        .concat(dungeonDeclaration.entities) ,
    };
  }

  public static initializeHeroes(
    heroes: Array<IHeroDeclaration>,
    players: IPlayerDeclaration[],
    spawnPoints: IBoardAssignment[]
  ): IGameplayEntityDeclaration[] {
    heroes = heroes.filter(h => players.some(p => p.groupId === h.groupId));
    if (spawnPoints.length < heroes.length) {
      throw new Error("To many heroes selected for given dungeon'");
    }
    heroes.forEach((h, i) => Object.assign(h, spawnPoints[i]))
    return heroes 
  }
  
}

