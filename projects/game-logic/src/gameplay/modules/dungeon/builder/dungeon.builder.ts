import { IHeroDeclaration } from '../../heroes/mixins/hero/hero.interface';
import { IDungeonAreaDeclaration } from '../mixins/dungeon-area/dungeon-area.interface';
import { IBoardAssignment } from '../../../../lib/modules/board/entities/board-object/board-object.interface';
import { IDungeonGameplayDeclaration, IDungeonGameplayEntityDeclaration } from '../dungeon.interface';
import { DeckBuilder } from '../../../../lib/modules/cards/deck.builder';
import { IDeckBearer } from '../../../../lib/modules/cards/entities/deck-bearer/deck-bearer.interface';

export class DungeonBuilder {

  public static  async build(
    dungeonArea: IDungeonAreaDeclaration,
    dungeonDeclaration: IDungeonGameplayDeclaration,
    heroes: IHeroDeclaration[],
  ): Promise<IDungeonGameplayDeclaration> {
    const d =  {
      id: dungeonArea.id,
      isDungeonGameplay: true as const,
      spawnPoints: dungeonDeclaration.spawnPoints,
      entities: DungeonBuilder.initializeHeroes(heroes, dungeonArea.spawnPoints)
        .concat(dungeonDeclaration.entities) as IHeroDeclaration[],
    };

    for (let entity of d.entities) {
      if (entity.isDeckBearer) {
        entity = DeckBuilder.build(entity) as any;
      }
    }
    return d; 
  }

  public static initializeHeroes(
    heroes: Array<IHeroDeclaration>,
    spawnPoints: IBoardAssignment[]
  ): IDungeonGameplayEntityDeclaration[] {
    if (spawnPoints.length < heroes.length) {
      throw new Error("To many heroes selected for given dungeon'");
    }
    heroes.forEach((h, i) => Object.assign(h, spawnPoints[i]))
    return heroes 
  }
  
}



      // players: players.concat(dungeonArea.predefinedPlayers),
      // order: players.concat(dungeonArea.predefinedPlayers).map(p => p.id),
      // currentPlayerId: players[0].id,