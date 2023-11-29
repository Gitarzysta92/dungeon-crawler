import { dungeonExitActor, ratActor, treasureActor } from "@game-logic/data/actors.data";
import { ICharacterDataFeedEntity, IDungeonExitDataFeedEntity, IEnemyDataFeedEntity, IObstacleDataFeedEntity, ITreasureDataFeedEntity } from "../interfaces/data-feed-actor-entity.interface";
import { DataFeedEntityType } from "./data-feed-entity-type";
import { vendorCharacter } from "@game-logic/data/characters.data";
import { obstacleActor } from "@game-logic/data/actors.data";
import { imagesPath } from "./data-feed-commons";

export const vendorCharacterDataFeedEntity: ICharacterDataFeedEntity = Object.assign(vendorCharacter, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "Vendor", description: "Character" },
  visualScene: {
    auxId: vendorCharacter.id,
    mapTexture: { url: `${imagesPath}/vendor.png` },
    color: 0x0002,
  },
  visualUi: {
    avatar: `${imagesPath}/vendor.png`,
    color: 0x0002
  }
});

export const treasureActorDataFeedEntity: ITreasureDataFeedEntity = Object.assign(treasureActor, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "treasure", description: "string" },
  visualScene: {
    auxId: treasureActor.id,
    mapTexture: { url: `${imagesPath}/treasure.png` },
    color: 0x0002,
  },
  visualUi: {
    avatar: `${imagesPath}/treasure.png`,
    color: 0x0002
  }
});

export const dungeonExitDataFeedEntity: IDungeonExitDataFeedEntity = Object.assign(dungeonExitActor, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "dungeon exit", description: "string" },
  visualScene: {
    auxId: dungeonExitActor.id,
    mapTexture: { url: `${imagesPath}/exit.png` },
    color: 0x0002,
  },
  visualUi: {
    avatar: `${imagesPath}/exit.png`,
    color: 0x0002
  }
});

export const ratActorDataFeedEntity: IEnemyDataFeedEntity = Object.assign(ratActor, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "rat", description: "string" },
  visualScene: {
    auxId: ratActor.id,
    mapTexture: { url: `${imagesPath}/rat.png` },
    color: 0x0002,
  },
  visualUi: {
    avatar: `${imagesPath}/rat.png`,
    color: 0x0002
  }
})

export const obstacleActorDataFeedEntity: IObstacleDataFeedEntity = Object.assign(obstacleActor, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "obstacle", description: "string" },
  visualScene: {
    auxId: obstacleActor.id,
    mapTexture: { url: `${imagesPath}/obstacle.png` },
    color: 0x0002,
  },
  visualUi: {
    avatar: `${imagesPath}/obstacle.png`,
    color: 0x0002
  }
})