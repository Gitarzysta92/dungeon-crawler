import { IPlayer } from '../../../../lib/base/player/players.interface';
import { IHeroDeclaration } from '../../heroes/entities/hero/hero.interface';
import { IDungeonArea } from '../entities/dungeon-area/dungeon-area.interface';
import { IDungeonGameplayStateDto } from '../../../state/dungeon/dungeon-gameplay.interface';
import { IEntityDeclaration } from '../../../../lib/base/entity/entity.interface';
import { IBoardAssignment } from '../../../../lib/modules/board/entities/board-object/board-object.interface';

export class DungeonBuilder {

  public async build(
    dungeonTemplate: IDungeonArea,
    players: IPlayer[],
    heroes: IHeroDeclaration[],
  ): Promise<IDungeonGameplayStateDto> { 
    players = players.concat(dungeonTemplate.predefinedPlayers);
    return {
      id: dungeonTemplate.id,
      players: players,
      order: players.map(p => p.id),
      playersNumber: dungeonTemplate.playersNumber,
      currentPlayerId: players[0].id,
      turn: 1,
      round: 1,
      entities: this._initializeHeroes(heroes, players, dungeonTemplate.spawnPoints)
        .concat(dungeonTemplate.entities)
    };
  }

  private  _initializeHeroes(
    heroes: Array<IHeroDeclaration>,
    players: IPlayer[],
    spawnPoints: IBoardAssignment[]
  ): IEntityDeclaration[] {
    heroes = heroes.filter(h => players.some(p => p.groupId === h.groupId));
    if (spawnPoints.length < heroes.length) {
      throw new Error("To many heroes selected for given dungeon'");
    }
    heroes.forEach((h, i) => Object.assign(h, spawnPoints[i]))
    return heroes 
  }
  
}

