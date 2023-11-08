import { basicAttack, curse, fireball, healing, meteorShower, move, teleport, vision, weakness } from "@game-logic/data/skills-and-spells.data";
import { ISpellOrAbilityDataFeedEntity } from "../interfaces/data-feed-effect-entity.interface";
import { DataFeedEntityType } from "./data-feed-entity-type";


export const basicAttackDataFeedEntity: ISpellOrAbilityDataFeedEntity = Object.assign(basicAttack, {
  entityType: DataFeedEntityType.Effect,
  informative: { name: "Make attack", description: "Some text" },
  visualUi: {
    icon: "string"
  }
});

export const moveDataFeedEntity: ISpellOrAbilityDataFeedEntity = Object.assign(move, {
  entityType: DataFeedEntityType.Effect,
  informative: { name: "Move", description: "Some text" },
  visualUi: {
    icon: "string"
  }
});

export const fireballDataFeedEntity: ISpellOrAbilityDataFeedEntity = Object.assign(fireball, {
  entityType: DataFeedEntityType.Effect,
  informative: { name: "Fireball", description: "Some text" },
  visualUi: {
    icon: "string"
  }
});

export const teleportDataFeedEntity: ISpellOrAbilityDataFeedEntity = Object.assign(teleport, {
  entityType: DataFeedEntityType.Effect,
  informative: { name: "Teleport", description: "Some text" },
  visualUi: {
    icon: "string"
  }
});

export const healingDataFeedEntity: ISpellOrAbilityDataFeedEntity = Object.assign(healing, {
  entityType: DataFeedEntityType.Effect,
  informative: { name: "Healing", description: "Some text" },
  visualUi: {
    icon: "string"
  }
});

export const visionDataFeedEntity: ISpellOrAbilityDataFeedEntity = Object.assign(vision, {
  entityType: DataFeedEntityType.Effect,
  informative: { name: "Vision", description: "Some text" },
  visualUi: {
    icon: "string"
  }
});

export const weaknessDataFeedEntity: ISpellOrAbilityDataFeedEntity = Object.assign(weakness, {
  entityType: DataFeedEntityType.Effect,
  informative: { name: "Weakness", description: "Some text" },
  visualUi: {
    icon: "string"
  }
});

export const curseDataFeedEntity: ISpellOrAbilityDataFeedEntity = Object.assign(curse, {
  entityType: DataFeedEntityType.Effect,
  informative: { name: "Curse", description: "Some text" },
  visualUi: {
    icon: "string"
  }
});

export const meteorDataFeedEntity: ISpellOrAbilityDataFeedEntity = Object.assign(meteorShower, {
  entityType: DataFeedEntityType.Effect,
  informative: { name: "MeteorShower", description: "Some text" },
  visualUi: {
    icon: "string"
  }
});