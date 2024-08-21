import { IDataContainer } from "../interface/data-container.interface";
import { emptyCard, basicAttack, drawCards, fireball } from "./data-feed-cards";
import { crush, stealth, vision } from "./data-feed-abilities";
import { IAbilityDeclaration } from "@game-logic/lib/modules/abilities/entities/ability/ability.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { ICardDeclaration } from "@game-logic/lib/modules/cards/entities/card/card.interface";
import { Guid } from "@game-logic/lib/infrastructure/extensions/types";
import { AssetType } from "../../game-ui/constants/asset-type";
import { IAssetDeclaration } from "src/app/infrastructure/asset-loader/api";

export interface IPickerDeclaration {
  id: Guid;
  name: string;
  shortDescription: string;
  description: string;
  portrait: IAssetDeclaration,
  heroAbility: IAbilityDeclaration & INarrativeMedium & IUiMedium,
  cards: Array<ICardDeclaration & INarrativeMedium & IUiMedium>,
  colorTheme: string
}


export const magePickerOption: IDataContainer<IPickerDeclaration> = {
  id: "816120F8-924D-4ECF-9166-833F284CB762",
  name: "hero.816120F8-924D-4ECF-9166-833F284CB762.name",
  shortDescription: "hero.816120F8-924D-4ECF-9166-833F284CB762.short-description",
  description: "hero.816120F8-924D-4ECF-9166-833F284CB762.description",
  portrait: {
    fileName: "816120F8-924D-4ECF-9166-833F284CB762-portrait",
    ext: "png",
    type: AssetType.Portrait
  },
  heroAbility: vision,
  cards: [emptyCard, basicAttack, drawCards, fireball],
  colorTheme: "theme-purple",
};


export const roguePickerOption: IDataContainer<IPickerDeclaration> = {
  id: "CBB2268A-DF6A-40A6-A049-27445F28643E",
  name: "hero.CBB2268A-DF6A-40A6-A049-27445F28643E.name",
  shortDescription: "hero.CBB2268A-DF6A-40A6-A049-27445F28643E.short-description",
  description: "hero.CBB2268A-DF6A-40A6-A049-27445F28643E.description",
  portrait: {
    fileName: "CBB2268A-DF6A-40A6-A049-27445F28643E-portrait",
    ext: "png",
    type: AssetType.Portrait
  },
  heroAbility: stealth,
  cards: [emptyCard, basicAttack, drawCards, fireball],
  colorTheme: "theme-beige",
};


export const warriorPickerOption: IDataContainer<IPickerDeclaration> = {
  id: "5587BDFC-15CA-4BB1-B13F-B90B365CFD2A",
  name: "hero.5587BDFC-15CA-4BB1-B13F-B90B365CFD2A.name",
  shortDescription: "hero.5587BDFC-15CA-4BB1-B13F-B90B365CFD2A.short-description",
  description: "hero.5587BDFC-15CA-4BB1-B13F-B90B365CFD2A.description",
  portrait: {
    fileName: "5587BDFC-15CA-4BB1-B13F-B90B365CFD2A-portrait",
    ext: "png",
    type: AssetType.Portrait
  },
  heroAbility: crush,
  cards: [emptyCard, basicAttack, drawCards, fireball],
  colorTheme: "theme-red",
};