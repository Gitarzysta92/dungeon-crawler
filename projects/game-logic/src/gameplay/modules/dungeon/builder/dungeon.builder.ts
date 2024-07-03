import { IPlayer } from '../../../../lib/base/player/players.interface';
import { IHeroDeclaration } from '../../heroes/mixins/hero/hero.interface';
import { IDungeonArea } from '../mixins/dungeon-area/dungeon-area.interface';
import { IBoardAssignment } from '../../../../lib/modules/board/entities/board-object/board-object.interface';
import { IDungeonStateDeclaration } from '../mixins/dungeon-state/dungeon-state.interface';
import { IEntityDeclaration } from '../../../../lib/base/entity/entity.interface';
import { IDungeonTemplate } from '../dungeon.interface';

export class DungeonBuilder {

  public static  async build(
    dungeonArea: IDungeonArea,
    dungeonTemplate: IDungeonTemplate,
    players: IPlayer[],
    heroes: IHeroDeclaration[],
  ): Promise<IDungeonStateDeclaration> {
    players = players.concat(dungeonArea.predefinedPlayers);
    return {
      id: dungeonArea.id,
      isDungeonState: true,
      players: players,
      order: players.map(p => p.id),
      playersNumber: dungeonArea.playersNumber,
      currentPlayerId: players[0].id,
      turn: 1,
      round: 1,
      entities: DungeonBuilder.initializeHeroes(heroes, players, dungeonArea.spawnPoints)
        .concat(dungeonTemplate.entities),
      isMixin: true
    };
  }

  public static initializeHeroes(
    heroes: Array<IHeroDeclaration>,
    players: IPlayer[],
    spawnPoints: IBoardAssignment[]
  ): IEntityDeclaration[] {
    console.log(heroes, players)
    heroes = heroes.filter(h => players.some(p => p.groupId === h.groupId));
    if (spawnPoints.length < heroes.length) {
      throw new Error("To many heroes selected for given dungeon'");
    }
    heroes.forEach((h, i) => Object.assign(h, spawnPoints[i]))
    return heroes 
  }
  
}

