import { dungeonExitActor, ratActor, treasureActor } from "@game-logic/data/actors.data";
import { ICharacterDataFeedEntity, IDungeonExitDataFeedEntity, IEnemyDataFeedEntity, IObstacleDataFeedEntity, ITreasureDataFeedEntity } from "../interfaces/data-feed-actor-entity.interface";
import { DataFeedEntityType } from "./data-feed-entity-type";
import { vendorCharacter } from "@game-logic/data/characters.data";
import { obstacleActor } from "@game-logic/data/actors.data";
import { imagesPath } from "./data-feed-commons";
import { campFireDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/camp-fire/camp-fire.constants";
import { ICampFireDefinition } from "@3d-scene/lib/actors/game-objects/tokens/camp-fire/camp-fire.interface";
import { IMagicGateDefinition } from "@3d-scene/lib/actors/game-objects/tokens/magic-gate/magic-gate.interface";
import { magicGateComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/magic-gate/magic-gate.constants";
import { ITreasureChestDefinition } from "@3d-scene/lib/actors/game-objects/tokens/treasure-chest/treasure-chest.interface"
import { treasureChestDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/treasure-chest/treasure-chest.constants";
import { ICommonCharacterDefinition} from "@3d-scene/lib/actors/game-objects/tokens/common-character/common-character.interface";
import { commonCharacterDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/common-character/common-character.constants";
import { plainTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/plain-tile/plain-tile.constants";
import { IPlainTileDefinition } from "@3d-scene/lib/actors/game-objects/tokens/plain-tile/plain-tile.interface";
import { IBarrelWithCandlesDefinition } from "@3d-scene/lib/actors/game-objects/tokens/barrel-with-candles/barrel-with-candles.interfaces";
import { barrelWithCandlesDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/barrel-with-candles/barrel-with-candles.constants";


export const vendorCharacterDataFeedEntity: ICharacterDataFeedEntity<ICommonCharacterDefinition> = Object.assign(vendorCharacter, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "Vendor", description: "Character" },
  visualScene: {
    definitionName: commonCharacterDefinitionName
  },
  visualUi: {
    avatar: { url: `${imagesPath}/vendor.png` },
    color: 0x0002
  }
});


export const treasureActorDataFeedEntity: ITreasureDataFeedEntity<ITreasureChestDefinition> = Object.assign(treasureActor, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "treasure", description: "string" },
  visualScene: {
    definitionName: treasureChestDefinitionName,
    primaryColor: 0x4e3027,
    secondaryColor: 0x868686,
    tertiaryColor: 0xffc90c,
    lightColor: 0xff8400,
  },
  visualUi: {
    avatar: { url: `${imagesPath}/treasure.png` },
    color: 0x0002
  }
});


export const dungeonExitDataFeedEntity: IDungeonExitDataFeedEntity<IMagicGateDefinition> = Object.assign(dungeonExitActor, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "dungeon exit", description: "string" },
  visualScene: {
    definitionName: magicGateComposerDefinitionName,
    primaryColor: 0x797979,
    primaryTeleportColor: 0x124df4,
    secondaryTeleportColor: 0x83ecff,
    lightColor: 0x2769ff
  },
  visualUi: {
    avatar: { url: `${imagesPath}/exit.png` },
    color: 0x0002
  }
});


export const ratActorDataFeedEntity: IEnemyDataFeedEntity<IPlainTileDefinition> = Object.assign(ratActor, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "rat", description: "string" },
  visualScene: {
    definitionName: plainTileComposerDefinitionName,
    primaryColor: 0x297353,
    outlineColor: 0xff4800,
    texture: {
      assetName: "rat",
      extensionName: "png"
    },
    outlets: ratActor.outlets
  },
  visualUi: {
    avatar: { url: `${imagesPath}/rat.png` },
    color: 0x0002
  }
});


export const campFireObstacleActorDataFeedEntity: IObstacleDataFeedEntity<ICampFireDefinition> = Object.assign({...obstacleActor}, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "obstacle", description: "string" },
  visualScene: {
    definitionName: campFireDefinitionName,
    woodColor: 0x4b1010,
    flameColor: [0xff4800, 0xffee9d, 0xffecd2] as [number, number, number],
    flameBloomColor: 0xffea86,
    primaryLightColor: 0xffb400,
    secondaryLightColor: 0xff3c00
  },
  visualUi: {
    avatar: { url: `${imagesPath}/obstacle.png` },
    color: 0x0002
  }
});


export const barrelWithCandlesObstacleActorDataFeedEntity: IObstacleDataFeedEntity<IBarrelWithCandlesDefinition> = Object.assign({...obstacleActor}, {
  entityType: DataFeedEntityType.Actor,
  informative: { name: "obstacle", description: "string" },
  visualScene: {
    definitionName: barrelWithCandlesDefinitionName,
    primaryColor: 0x4e3027,
    secondaryColor: 0x868686,
    lightColor: 0xff8400,
  },
  visualUi: {
    avatar: { url: `${imagesPath}/obstacle.png` },
    color: 0x0002
  }
});